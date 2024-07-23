import starredReducer, { starMovie, unstarMovie, clearAllStarred } from '../data/starredSlice';

describe('starredSlice', () => {
  const initialState = {
    starredMovies: [],
  };

  it('should handle initial state', () => {
    expect(starredReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle starMovie', () => {
    const movie = { id: 1, title: 'Test Movie' };
    const action = starMovie(movie);
    const state = starredReducer(initialState, action);
    expect(state.starredMovies).toEqual([movie]);
  });

  it('should handle unstarMovie', () => {
    const movie = { id: 1, title: 'Test Movie' };
    const stateWithMovie = {
      starredMovies: [movie],
    };
    const action = unstarMovie(movie);
    const state = starredReducer(stateWithMovie, action);
    expect(state.starredMovies).toEqual([]);
  });

  it('should handle clearAllStarred', () => {
    const stateWithMovies = {
      starredMovies: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
    };
    const action = clearAllStarred();
    const state = starredReducer(stateWithMovies, action);
    expect(state.starredMovies).toEqual([]);
  });
});