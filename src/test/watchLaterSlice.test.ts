import watchLaterReducer, { addToWatchLater, removeFromWatchLater, removeAllWatchLater } from '../data/watchLaterSlice';
import { Movie } from '../types/movie';

describe('watchLaterSlice', () => {
  const initialState = {
    watchLaterMovies: [],
  };

  it('should handle initial state', () => {
    expect(watchLaterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToWatchLater', () => {
    const movie: Movie = {
      id: 1, title: 'Test Movie',
      overview: 'Overview',
      poster_path: 'path',
      release_date: '2021-01-01',
    };
    const action = addToWatchLater(movie);
    const state = watchLaterReducer(initialState, action);
    expect(state.watchLaterMovies).toEqual([movie]);
  });

  it('should handle removeFromWatchLater', () => {
    const movie: Movie = {
      id: 1, title: 'Test Movie',
      overview: 'Overview',
      poster_path: 'path',
      release_date: '2021-01-01',
    };
    const stateWithMovie = {
      watchLaterMovies: [movie],
    };
    const action = removeFromWatchLater(movie);
    const state = watchLaterReducer(stateWithMovie, action);
    expect(state.watchLaterMovies).toEqual([]);
  });

  it('should handle removeAllWatchLater', () => {
    const stateWithMovies: { watchLaterMovies: Movie[] } = {
      watchLaterMovies: [{
        id: 1, title: 'Movie 1',
        overview: 'Overview',
        poster_path: 'path',
        release_date: '2021-01-01'
      }, {
        id: 2, title: 'Movie 2',
        overview: 'Overview',
        poster_path: 'path',
        release_date: '2021-01-01'
      }],
    };
    const action = removeAllWatchLater();
    const state = watchLaterReducer(stateWithMovies, action);
    expect(state.watchLaterMovies).toEqual([]);
  });
});