import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

interface StarredState {
    starredMovies: Movie[];
}

const initialState: StarredState = {
    starredMovies: []
};

const starredSlice = createSlice({
    name: 'starred',
    initialState,
    reducers: {
        starMovie: (state, action: PayloadAction<Movie>) => {
            state.starredMovies = [action.payload, ...state.starredMovies];
        },
        unstarMovie: (state, action: PayloadAction<Movie>) => {
            state.starredMovies = state.starredMovies.filter(movie => movie.id !== action.payload.id);
        },
        clearAllStarred: (state) => {
            state.starredMovies = [];
        },
    },
});

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;

export default starredSlice.reducer;