import styles from "./styles.module.scss"
import { VideoSectionProps } from "./types"
import VideoBlock from "./VideoBlock"

const VideoSectionBox = ({ title, introText, videos }: VideoSectionProps) => (
    <section className={styles.videoSection}>
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{title}</h1>
                <p>{introText}</p>
            </header>
            <div className={styles.videoBlocks}>
                {videos.map((video) => <VideoBlock key={video.videoUrl} {...video} />)}
            </div>
        </div>
    </section>
)

export default VideoSectionBox
