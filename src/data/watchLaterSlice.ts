import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

interface WatchLaterState {
    watchLaterMovies: Movie[];
}

const initialState: WatchLaterState = {
    watchLaterMovies: []
};

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState,
    reducers: {
        addToWatchLater: (state, action: PayloadAction<Movie>) => {
            state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
        },
        removeFromWatchLater: (state, action: PayloadAction<Movie>) => {
            state.watchLaterMovies = state.watchLaterMovies.filter(movie => movie.id !== action.payload.id);
        },
        removeAllWatchLater: (state) => {
            state.watchLaterMovies = [];
        },
    },
});

export const { addToWatchLater, removeFromWatchLater, removeAllWatchLater } = watchLaterSlice.actions;

export default watchLaterSlice.reducer;