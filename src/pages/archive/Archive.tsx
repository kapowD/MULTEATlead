import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { pdfArchive } from "../../data/archive"
import { PageMeta } from "../../shared/ui/PageMeta/PageMeta"
import styles from "./Archive.module.scss"

const Archive: React.FC = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        if (window.history.length > 2) navigate(-1)
        else navigate("/")
    }

    return (
        <div className={styles.page}>
            <PageMeta title="MULTEAT — Архив" description="Архив документов MULTEAT в формате PDF." />

            <div className={styles.container}>
                <div className={styles.backRow}>
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={handleBack}
                        aria-label="Назад"
                        title="Назад"
                    >
                        <ArrowLeft size={18} />
                        <span>Назад</span>
                    </button>
                </div>

                <header className={styles.header}>
                    <h1 className={styles.title}>Архив документов (PDF)</h1>
                </header>

                <div className={styles.list}>
                    {pdfArchive.map((doc) => (
                        <article key={doc.id} className={styles.row}>
                            <div className={styles.iconWrap} aria-hidden="true">
                                <FileText size={22} />
                            </div>

                            <div className={styles.meta}>
                                <h2 className={styles.docTitle}>{doc.title}</h2>
                                {(doc.year || doc.size) && (
                                    <p className={styles.docInfo}>
                                        {[doc.year, doc.size].filter(Boolean).join(" · ")}
                                    </p>
                                )}
                            </div>

                            <div className={styles.actions}>
                                {doc.file ? (
                                    <>
                                        <a
                                            href={doc.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.buttonPrimary}
                                            aria-label={`Открыть ${doc.title} в новой вкладке`}
                                            title="Открыть в новой вкладке"
                                        >
                                            <ExternalLink size={16} />
                                            <span>Открыть</span>
                                        </a>
                                        <a
                                            href={doc.file}
                                            download
                                            className={styles.buttonGhost}
                                            aria-label={`Скачать ${doc.title}`}
                                            title="Скачать PDF"
                                        >
                                            <Download size={16} />
                                            <span>Скачать</span>
                                        </a>
                                    </>
                                ) : (
                                    <span className={styles.unavailable}>PDF не загружен</span>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                {pdfArchive.length === 0 && <div className={styles.empty}>Архив пуст.</div>}
            </div>
        </div>
    )
}

export default Archive
