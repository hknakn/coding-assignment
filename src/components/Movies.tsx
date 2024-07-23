import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Movie from "./Movie";
import "../styles/movies.scss";

interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface MoviesProps {
  movies: MovieType[];
  viewTrailer: (movieId: number) => void;
  hasMore: boolean;
  loadMore: () => void;
}

const Movies: React.FC<MoviesProps> = ({
  movies,
  viewTrailer,
  hasMore,
  loadMore,
}) => {
  if (!movies || movies.length === 0) {
    return <div className="no-movies">No movies found</div>;
  }

  return (
    <div data-testid="movies">
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
        <div className="row g-0">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} viewTrailer={viewTrailer} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const EndMessage: React.FC = () => {
  return (
    <p style={{ textAlign: "center" }}>
      <b>You have seen all the movies</b>
    </p>
  );
};

const Loader: React.FC = () => {
  return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
};

export default React.memo(Movies);
