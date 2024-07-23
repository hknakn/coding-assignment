import { useState, useEffect } from 'react';
import { API_KEY, ENDPOINT } from '../constants';

interface MovieVideo {
  type: string;
  key: string;
}

interface MovieData {
  videos?: {
    results: MovieVideo[];
  };
}

interface MovieDataHookResult {
  videoKey: string | null;
  loading: boolean;
  error: Error | null;
}

export const useMovieData = (movieId: number | null): MovieDataHookResult => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${ENDPOINT}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data: MovieData = await response.json();

        if (data.videos && data.videos.results.length) {
          const trailer = data.videos.results.find(vid => vid.type === 'Trailer');
          setVideoKey(trailer ? trailer.key : data.videos.results[0].key);
        } else {
          setVideoKey(null);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else if (typeof err === 'string') {
          setError(new Error(err));
        } else {
          setError(new Error('An unknown error occurred'));
        }
        console.error('Error fetching movie data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return { videoKey, loading, error };
};