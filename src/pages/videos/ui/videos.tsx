import React from "react";
import VideoSectionBox from "../../../components/VideoSection/VideoSectionBox";
import { videoData } from "../../../components/VideoSection/data";
const VideoSection = () => {
  return (
    <div>
      <h1>VIDEO</h1>
      <p>Здесь будет информация о продукции.</p>
      <VideoSectionBox
        title="Видеораздел"
        introText="Этот раздел содержит видео, люди, вас обманут и ограбят"
        videos={videoData}
      />
    </div>
  );
};

export default VideoSection;
