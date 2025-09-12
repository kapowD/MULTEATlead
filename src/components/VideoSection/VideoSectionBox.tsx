import React from 'react';

import styles from './styles.module.scss';
import { VideoSectionProps } from './types';
import VideoBlock from './VideoBlock';

const VideoSectionBox: React.FC<VideoSectionProps> = ({ title, introText, videos }) => {
  return (
    <section className={styles['video-section']}>
      <h1 className={styles['section-title']}>{title}</h1>
      <p className={styles['intro-text']}>{introText}</p>
      <div className={styles['video-blocks']}>
        {videos.map((video, index) => (
          <VideoBlock key={index} {...video} />
        ))}
      </div>
    </section>
  );
};

export default VideoSectionBox