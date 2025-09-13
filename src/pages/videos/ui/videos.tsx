import React from "react";

import { videoData } from "../../../components/VideoSection/data";
import VideoSectionBox from "../../../components/VideoSection/VideoSectionBox";
const VideoSection = () => {
  return (
    <div>
      <VideoSectionBox
        title="Видеораздел"
        introText="Этот раздел содержит видео, люди, вас обманут и ограбят"
        videos={videoData}
      />
    </div>
  );
};

export default VideoSection;
