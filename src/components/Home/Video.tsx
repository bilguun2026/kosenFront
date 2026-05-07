import React from "react";
import ReactPlayer from "react-player";

type VideoProps = {
  title?: string;
  videoSource: string;
  url?: string;
  video_file?: string;
};

const isFacebookUrl = (url: string) => {
  return /facebook\.com|fb\.watch|fb\.com/i.test(url);
};

const isExternalVideo = (url: string) => {
  return ReactPlayer.canPlay(url);
};

const VideoSection: React.FC<VideoProps> = ({ videoSource }) => {
  return (
    <div className="mb-8">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
        {isFacebookUrl(videoSource) ? (
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoSource)}&show_text=false`}
            width="100%"
            height="100%"
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: "none" }}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        ) : isExternalVideo(videoSource) ? (
          <ReactPlayer
            url={videoSource}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
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
