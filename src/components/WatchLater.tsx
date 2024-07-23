import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { removeAllWatchLater } from "../data/watchLaterSlice";
import Movie from "./Movie";
import Button from "./Button";
import "../styles/watchLater.scss";

interface WatchLaterProps {
  viewTrailer: (movieId: number) => void;
}

const WatchLater: React.FC<WatchLaterProps> = ({ viewTrailer }) => {
  const dispatch = useAppDispatch();
  const watchLaterMovies = useAppSelector(
    (state) => state.watchLater.watchLaterMovies
  );

  const handleClearAll = () => {
    dispatch(removeAllWatchLater());
  };

  return (
    <div className="watch-later" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 ? (
        <div data-testid="watch-later-movies" className="watch-later-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row">
            {watchLaterMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <Button
              className="btn btn-primary"
              onClick={handleClearAll}
              testId="clear-watch-later"
            >
              Clear list
            </Button>
          </footer>
        </div>
      ) : (
        <div className="text-center empty-list">
          <i className="bi bi-clock" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link> to add some movies to your watch
            later list.
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(WatchLater);
