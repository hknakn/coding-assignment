import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import YouTubePlayer from "./YoutubePlayer";
import Modal from "./Modal";

const Movies = React.lazy(() => import("./Movies"));
const Starred = React.lazy(() => import("./Starred"));
const WatchLater = React.lazy(() => import("./WatchLater"));

interface MainContentProps {
  movies: any[];
  fetchStatus: string;
  error: string | null;
  videoKey: string | null;
  trailerLoading: boolean;
  trailerError: Error | null;
  viewTrailer: (movieId: number) => void;
  hasMore: boolean;
  loadMoreMovies: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  movies,
  fetchStatus,
  error,
  videoKey,
  trailerLoading,
  trailerError,
  viewTrailer,
  hasMore,
  loadMoreMovies,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTrailer = (movieId: number) => {
    viewTrailer(movieId);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      {error && <p>Error: {error}</p>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {trailerLoading && <p>Loading trailer...</p>}
        {trailerError && <p>Error loading trailer: {trailerError.message}</p>}
        {videoKey && <YouTubePlayer videoKey={videoKey} />}
      </Modal>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={handleViewTrailer}
                hasMore={hasMore}
                loadMore={loadMoreMovies}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={handleViewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={handleViewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainContent;
