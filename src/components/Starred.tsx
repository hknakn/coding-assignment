import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { clearAllStarred } from "../data/starredSlice";
import Movie from "./Movie";
import Button from "./Button";
import "../styles/starred.scss";

interface StarredProps {
  viewTrailer: (movieId: number) => void;
}

const Starred: React.FC<StarredProps> = ({ viewTrailer }) => {
  const dispatch = useAppDispatch();
  const starredMovies = useAppSelector((state) => state.starred.starredMovies);

  const handleClearAll = () => {
    dispatch(clearAllStarred());
  };

  return (
    <div className="starred" data-testid="starred">
      {starredMovies.length > 0 ? (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="row">
            {starredMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <Button
              className="btn btn-primary"
              onClick={handleClearAll}
              testId="clear-starred"
            >
              Remove all starred
            </Button>
          </footer>
        </div>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link> to star some movies.
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Starred);
