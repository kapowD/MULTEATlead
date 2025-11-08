import React from "react"
import { videoData } from "@components/VideoSection/data"
import VideoSectionBox from "@components/VideoSection/VideoSectionBox"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" 

const VideoSection = () => {
    return (
        <div>
            {/* ✅ Мета-теги */}
            <PageMeta
                title="MULTEAT — Видео"
                description="Видеообзоры и инструкции по продукции MULTEAT. Узнайте больше о наших фильтрах, системах и технологиях из официальных видеоматериалов."
            />

            <VideoSectionBox
                title="Видеораздел"
                introText="Этот раздел содержит обучающие и обзорные видео о продукции MULTEAT."
                videos={videoData}
            />
        </div>
    )
}

export default VideoSection
