import starredReducer, { starMovie, unstarMovie, clearAllStarred } from '../data/starredSlice';
import { Movie } from '../types/movie';

describe('starredSlice', () => {
  const initialState = {
    starredMovies: [],
  };

  it('should handle initial state', () => {
    expect(starredReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle starMovie', () => {
    const movie: Movie = {
      id: 1, title: 'Test Movie',
      overview: 'Overview',
      release_date: '2021-01-01',
      poster_path: 'path'
    };
    const action = starMovie(movie);
    const state = starredReducer(initialState, action);
    expect(state.starredMovies).toEqual([movie]);
  });

  it('should handle unstarMovie', () => {
    const movie: Movie = {
      id: 1, title: 'Test Movie',
      overview: 'Overview',
      release_date: '2021-01-01',
      poster_path: 'path'
    };
    const stateWithMovie = {
      starredMovies: [movie],
    };
    const action = unstarMovie(movie);
    const state = starredReducer(stateWithMovie, action);
    expect(state.starredMovies).toEqual([]);
  });

  it('should handle clearAllStarred', () => {
    const stateWithMovies: { starredMovies: Movie[] }
      = {
      starredMovies: [{
        id: 1, title: 'Movie 1',
        overview: 'Overview',
        release_date: '2021-01-01',
        poster_path: 'path'
      }, {
        id: 2, title: 'Movie 2',
        overview: 'Overview',
        release_date: '2021-01-01',
        poster_path: 'path'
      }],
    };
    const action = clearAllStarred();
    const state = starredReducer(stateWithMovies, action);
    expect(state.starredMovies).toEqual([]);
  });
});