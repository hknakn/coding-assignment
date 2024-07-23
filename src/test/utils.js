import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../data/moviesSlice";
import starredReducer from "../data/starredSlice";
import watchLaterReducer from "../data/watchLaterSlice";

export async function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        movies: moviesReducer,
        starred: starredReducer,
        watchLater: watchLaterReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  let result;
  await act(async () => {
    result = render(ui, { wrapper: Wrapper, ...renderOptions });
  });

  return { store, ...result };
}
