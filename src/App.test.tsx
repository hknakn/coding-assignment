import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test/utils";
import App from "./App";
jest.mock("./__mocks__/api");

jest.mock("./components/YoutubePlayer", () => {
  return function MockYoutubePlayer() {
    return <div data-testid="youtube-player">Mocked YouTube Player</div>;
  };
});

describe("App Component", () => {
  it("renders header and main content", async () => {
    await renderWithProviders(<App />);
    expect(screen.getByText(/Movieland/i)).toBeInTheDocument();
    expect(screen.getByText(/Starred/i)).toBeInTheDocument();
    expect(screen.getByText(/Watch Later/i)).toBeInTheDocument();
  });

  it("allows searching for movies", async () => {
    await renderWithProviders(<App />);
    const searchInput = screen.getByPlaceholderText(/Search movies.../i);
    await userEvent.type(searchInput, "Inception");
    await waitFor(() => {
      // Look for the specific movie title
      expect(
        screen.getByRole("heading", { name: /^Inception$/ })
      ).toBeInTheDocument();
      // Check if at least one movie card is rendered
      expect(screen.getAllByTestId("movie-card").length).toBeGreaterThan(0);
    });
  });

  it("navigates to starred movies page", async () => {
    await renderWithProviders(<App />);
    const starredLink = screen.getByText(/Starred/i);
    await userEvent.click(starredLink);
    expect(
      screen.getByText(/There are no starred movies/i)
    ).toBeInTheDocument();
  });

  it("navigates to watch later page", async () => {
    await renderWithProviders(<App />);
    const watchLaterLink = screen.getByText(/Watch Later/i);
    await userEvent.click(watchLaterLink);
    expect(
      screen.getByText(/You have no movies saved to watch later/i)
    ).toBeInTheDocument();
  });
});
