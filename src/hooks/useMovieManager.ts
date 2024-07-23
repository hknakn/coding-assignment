import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { fetchMovies, appendMovies } from '../data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';
import { useMovieData } from './useMovieData';

export const useMovieManager = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const { videoKey, loading: trailerLoading, error: trailerError } = useMovieData(selectedMovieId);
  const { movies, fetchStatus, error } = useAppSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchQuery = searchParams.get("search") || "";

  const loadMoreMovies = useCallback(() => {
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page + 1}`
      : `${ENDPOINT_DISCOVER}&page=${page + 1}`;
    dispatch(appendMovies(endpoint));
    setPage(prevPage => prevPage + 1);
  }, [searchQuery, page, dispatch]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}`
      : ENDPOINT_DISCOVER;
    dispatch(fetchMovies(endpoint));
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (fetchStatus === 'succeeded' && movies.length === 0) {
      setHasMore(false);
    }
  }, [fetchStatus, movies]);

  const searchMovies = useCallback((query: string) => {
    setSearchParams(query ? { search: query } : {});
  }, [setSearchParams]);

  const viewTrailer = useCallback((movieId: number) => {
    setSelectedMovieId(movieId);
  }, []);

  return {
    movies,
    fetchStatus,
    error,
    videoKey,
    trailerLoading,
    trailerError,
    searchMovies,
    viewTrailer,
    searchQuery,
    hasMore,
    loadMoreMovies
  };
};