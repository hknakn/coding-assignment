import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie";

export interface MoviesState {
    movies: Movie[];
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    fetchStatus: 'idle',
    error: null,
};

export const fetchMovies = createAsyncThunk<Movie[], string>(
    'movies/fetchMovies',
    async (apiUrl: string) => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    }
);

export const appendMovies = createAsyncThunk<Movie[], string>(
    'movies/appendMovies',
    async (apiUrl: string) => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.fetchStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.fetchStatus = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(appendMovies.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(appendMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.fetchStatus = 'succeeded';
                state.movies = [...state.movies, ...action.payload];
            })
            .addCase(appendMovies.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default moviesSlice.reducer;