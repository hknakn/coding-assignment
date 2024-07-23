import React from "react";
import ReactPlayer from "react-player";
import "../styles/youtubePlayer.scss";

interface YouTubePlayerProps {
  videoKey: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoKey }) => {
  return (
    <div className="youtube-player-container">
      <div className="youtube-player-wrapper">
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          width="100%"
          height="100%"
          controls={true}
          playing={true}
          data-testid="youtube-player"
        />
      </div>
    </div>
  );
};

export default React.memo(YouTubePlayer);
