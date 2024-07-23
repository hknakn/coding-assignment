import moviesReducer, { fetchMovies, appendMovies } from '../data/moviesSlice';

describe('moviesSlice', () => {
    const initialState = {
        movies: [],
        fetchStatus: 'idle',
        error: null,
    };

    it('should handle initial state', () => {
        expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle fetchMovies.pending', () => {
        const action = { type: fetchMovies.pending.type };
        const state = moviesReducer(initialState, action);
        expect(state.fetchStatus).toEqual('loading');
    });

    it('should handle fetchMovies.fulfilled', () => {
        const payload = [{ id: 1, title: 'Test Movie' }];
        const action = { type: fetchMovies.fulfilled.type, payload };
        const state = moviesReducer(initialState, action);
        expect(state.fetchStatus).toEqual('succeeded');
        expect(state.movies).toEqual(payload);
    });

    it('should handle fetchMovies.rejected', () => {
        const action = { type: fetchMovies.rejected.type, error: { message: 'Error' } };
        const state = moviesReducer(initialState, action);
        expect(state.fetchStatus).toEqual('failed');
        expect(state.error).toEqual('Error');
    });

    it('should handle appendMovies.fulfilled', () => {
        const initialStateWithMovies = {
            ...initialState,
            movies: [{ id: 1, title: 'Existing Movie' }],
        };
        const payload = [{ id: 2, title: 'New Movie' }];
        const action = { type: appendMovies.fulfilled.type, payload };
        const state = moviesReducer(initialStateWithMovies, action);
        expect(state.movies).toEqual([
            { id: 1, title: 'Existing Movie' },
            { id: 2, title: 'New Movie' },
        ]);
    });
});