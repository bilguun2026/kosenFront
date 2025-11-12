import React from "react";
import ReactPlayer from "react-player";

type VideoProps = {
  title?: string;
  videoSource: string;
  url?: string; // Optional URL for external video sources
  video_file?: string; // Optional video file for local sources
};

const isExternalVideo = (url: string) => {
  // Detect if URL is external (YouTube, Facebook, Vimeo, etc.)
  return ReactPlayer.canPlay(url);
};

const VideoSection: React.FC<VideoProps> = ({ videoSource }) => {
  return (
    <div className="mb-8">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
        {isExternalVideo(videoSource) ? (
          <ReactPlayer
            url={videoSource}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            config={{
              facebook: {
                attributes: {
                  height: "350px",
                  padding: "0",
                  backgroundColor: "#000",
                },
              },
            }}
          />
        ) : (
          <video
            controls
            src={videoSource}
            className="w-full h-full object-contain rounded-2xl"
          />
        )}
      </div>
    </div>
  );
};

export default VideoSection;
