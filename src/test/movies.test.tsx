// src/test/movies.test.tsx

import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./utils";
import Movies from "../components/Movies";

// Import the mocked hooks
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

const mockMovies = [
  {
    id: 1,
    title: "Test Movie 1",
    overview: "Overview 1",
    poster_path: "/path1.jpg",
    release_date: "2021-01-01",
  },
  {
    id: 2,
    title: "Test Movie 2",
    overview: "Overview 2",
    poster_path: "/path2.jpg",
    release_date: "2021-02-02",
  },
];

// Mock the Redux hooks
jest.mock("../hooks/reduxHooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

describe("Movies Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the Redux state
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        starred: { starredMovies: [] },
        watchLater: { watchLaterMovies: [] },
      })
    );
  });

  it("renders movies correctly", async () => {
    await renderWithProviders(
      <Movies
        movies={mockMovies}
        viewTrailer={jest.fn()}
        hasMore={true}
        loadMore={jest.fn()}
      />
    );
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("displays no movies found message when there are no movies", async () => {
    await renderWithProviders(
      <Movies
        movies={[]}
        viewTrailer={jest.fn()}
        hasMore={false}
        loadMore={jest.fn()}
      />
    );
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });
});
