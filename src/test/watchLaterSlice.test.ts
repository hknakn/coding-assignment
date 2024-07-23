import watchLaterReducer, { addToWatchLater, removeFromWatchLater, removeAllWatchLater } from '../data/watchLaterSlice';

describe('watchLaterSlice', () => {
  const initialState = {
    watchLaterMovies: [],
  };

  it('should handle initial state', () => {
    expect(watchLaterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToWatchLater', () => {
    const movie = { id: 1, title: 'Test Movie' };
    const action = addToWatchLater(movie);
    const state = watchLaterReducer(initialState, action);
    expect(state.watchLaterMovies).toEqual([movie]);
  });

  it('should handle removeFromWatchLater', () => {
    const movie = { id: 1, title: 'Test Movie' };
    const stateWithMovie = {
      watchLaterMovies: [movie],
    };
    const action = removeFromWatchLater(movie);
    const state = watchLaterReducer(stateWithMovie, action);
    expect(state.watchLaterMovies).toEqual([]);
  });

  it('should handle removeAllWatchLater', () => {
    const stateWithMovies = {
      watchLaterMovies: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
    };
    const action = removeAllWatchLater();
    const state = watchLaterReducer(stateWithMovies, action);
    expect(state.watchLaterMovies).toEqual([]);
  });
});