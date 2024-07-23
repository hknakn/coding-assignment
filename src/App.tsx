import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { useMovieManager } from "./hooks/useMovieManager";
import "./app.scss";

const App: React.FC = () => {
  const {
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
    loadMoreMovies,
  } = useMovieManager();

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchQuery={searchQuery} />
      <MainContent
        movies={movies}
        fetchStatus={fetchStatus}
        error={error}
        videoKey={videoKey}
        trailerLoading={trailerLoading}
        trailerError={trailerError}
        viewTrailer={viewTrailer}
        hasMore={hasMore}
        loadMoreMovies={loadMoreMovies}
      />
    </div>
  );
};

export default App;
