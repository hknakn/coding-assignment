import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { starMovie, unstarMovie } from "../data/starredSlice";
import { addToWatchLater, removeFromWatchLater } from "../data/watchLaterSlice";
import Button from "./Button";
import { Movie as MovieType } from "../types/movie";
import "../styles/movie.scss";

const placeholder = require("../assets/not-found-500X750.jpeg");

interface MovieProps {
  movie: MovieType;
  viewTrailer: (movieId: number) => void;
}

const Movie: React.FC<MovieProps> = ({ movie, viewTrailer }) => {
  const dispatch = useAppDispatch();
  const starred = useAppSelector((state) => state.starred.starredMovies);
  const watchLater = useAppSelector(
    (state) => state.watchLater.watchLaterMovies
  );

  const isStarred = useMemo(
    () => starred.some((m) => m.id === movie.id),
    [starred, movie.id]
  );
  const isWatchLater = useMemo(
    () => watchLater.some((m) => m.id === movie.id),
    [watchLater, movie.id]
  );

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("opened");
  };

  return (
    <div className="movie-wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div
        className="movie-card"
        onClick={handleCardClick}
        data-testid="movie-card"
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            <div className="overview">{movie.overview}</div>
            <div className="action-buttons">
              <Button
                onClick={() =>
                  dispatch(isStarred ? unstarMovie(movie) : starMovie(movie))
                }
                className="btn-star"
                testId={isStarred ? "unstar-link" : "starred-link"}
              >
                <i
                  className={`bi bi-heart${isStarred ? "-fill" : ""}`}
                  data-testid={isStarred ? "star-fill" : ""}
                />
              </Button>
              <Button
                onClick={() =>
                  dispatch(
                    isWatchLater
                      ? removeFromWatchLater(movie)
                      : addToWatchLater(movie)
                  )
                }
                className={`btn-watch-later ${isWatchLater ? "active" : ""}`}
                testId={isWatchLater ? "remove-watch-later" : "watch-later"}
              >
                {isWatchLater ? "Remove" : "Watch Later"}
              </Button>
              <Button
                onClick={() => viewTrailer(movie.id)}
                className="btn-trailer"
                aria-label={`View trailer for ${movie.title}`}
              >
                View Trailer
              </Button>
            </div>
          </div>
          <img
            className="movie-poster"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt={`${movie.title} poster`}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Movie);
