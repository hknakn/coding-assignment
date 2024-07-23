import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../components/Header";

const mockStore = configureStore([]);

describe("Header Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      starred: { starredMovies: [] },
    });
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header searchMovies={jest.fn()} searchQuery="" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Movieland")).toBeInTheDocument();
    expect(screen.getByText("Starred")).toBeInTheDocument();
    expect(screen.getByText("Watch Later")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
  });

  it("calls searchMovies when search form is submitted", () => {
    const mockSearchMovies = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header searchMovies={mockSearchMovies} searchQuery="" />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(searchInput, { target: { value: "Inception" } });
    fireEvent.submit(searchInput);

    expect(mockSearchMovies).toHaveBeenCalledWith("Inception");
  });
});
