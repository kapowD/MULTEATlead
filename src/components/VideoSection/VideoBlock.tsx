import React from 'react';
import styles from './styles.module.scss';
import { VideoBlockProps } from './types';

const VideoBlock: React.FC<VideoBlockProps> = ({ videoUrl, title, description }) => {
  return (
    <div className={styles['video-block']}>
      <div className={styles.divider} />
      <div className={styles['video-container']}>
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles['block-title']}>{title}</h3>
        <p className={styles['block-description']}>{description}</p>
      </div>
      <div className={styles.divider} />
    </div>
  );
};
export default VideoBlock;


// import styles from "./styles.module.scss";
// import { VideoBlockProps } from "./types";

// import React, { useEffect, useRef } from "react";

// const VideoBlock: React.FC<VideoBlockProps> = ({ videoUrl, title, description }) => {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
//   const isRutube = videoUrl.includes('rutube.ru');

//   // Преобразование URL в embed-формат
//   const getEmbedUrl = (url: string) => {
//     if (isYouTube) {
//       const videoId = url.includes('embed/') 
//         ? url.split('embed/')[1].split('?')[0]
//         : url.includes('watch?v=') 
//           ? url.split('watch?v=')[1].split('&')[0]
//           : url.split('/').pop() || '';
//       return `https://www.youtube.com/embed/${videoId}`;
//     }
//     if (isRutube) {
//       const videoId = url.includes('video/') 
//         ? url.split('video/')[1].replace('/', '')
//         : url.split('/').pop() || '';
//       return `https://rutube.ru/play/embed/${videoId}`;
//     }
//     return url;
//   };

//   const embedUrl = getEmbedUrl(videoUrl);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       iframe.onerror = () => {
//         iframe.style.display = 'none';
//         const errorMsg = document.createElement('div');
//         errorMsg.textContent = 'Не удалось загрузить видео. Проверьте URL или настройки встраивания.';
//         errorMsg.className = styles['error-message'];
//         iframe.parentElement?.appendChild(errorMsg);
//       };
//     }
//   }, [embedUrl]);

//   return (
//     <div className={styles['video-block']}>
//       <div className={styles.divider} />
//       <div className={styles['video-container']}>
//         <iframe
//           ref={iframeRef}
//           src={embedUrl}
//           title={title}
//           frameBorder="0"
//           allow={isYouTube ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" : "clipboard-write; autoplay"}
//           webkitAllowFullScreen
//           mozallowfullscreen
//           allowFullScreen
//         />
//       </div>
//       <div className={styles.content}>
//         <h3 className={styles['block-title']}>{title}</h3>
//         <p className={styles['block-description']}>{description}</p>
//       </div>
//       <div className={styles.divider} />
//     </div>
//   );
// };

// export default VideoBlock;