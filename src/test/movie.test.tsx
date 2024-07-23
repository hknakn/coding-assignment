import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Movie from "../components/Movie";

const mockStore = configureStore([]);

const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "Test Overview",
  release_date: "2021-01-01",
  poster_path: "/testpath.jpg",
};

describe("Movie Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      starred: { starredMovies: [] },
      watchLater: { watchLaterMovies: [] },
    });
  });

  it("renders movie information correctly", () => {
    render(
      <Provider store={store}>
        <Movie movie={mockMovie} viewTrailer={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test Overview")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
  });

  it('calls viewTrailer when "View Trailer" button is clicked', () => {
    const mockViewTrailer = jest.fn();
    render(
      <Provider store={store}>
        <Movie movie={mockMovie} viewTrailer={mockViewTrailer} />
      </Provider>
    );

    fireEvent.click(screen.getByText("View Trailer"));
    expect(mockViewTrailer).toHaveBeenCalledWith(1);
  });
});
