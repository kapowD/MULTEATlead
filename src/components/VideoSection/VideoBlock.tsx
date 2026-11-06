import { VideoBlockProps } from "./types"
import styles from "./styles.module.scss"

const VideoBlock = ({ videoUrl, title, description }: VideoBlockProps) => (
    <article className={styles.videoBlock}>
        <div className={styles.videoContainer}>
            <iframe
                src={videoUrl}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
        <div className={styles.content}>
            <div>
                <h2 className={styles.blockTitle}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}
            </div>
        </div>
    </article>
)

export default VideoBlock
