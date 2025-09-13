import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pdfArchive } from '../../data/archive';
import styles from './Archive.module.scss';

const Archive: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/'); // запасной вариант — на главную
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Назад */}
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

        <div className={styles.grid}>
          {pdfArchive.map((doc) => (
            <article key={doc.id} className={styles.card}>
              <div className={styles.iconWrap}>
                <FileText size={28} />
              </div>

              <div className={styles.meta}>
                <h3 className={styles.docTitle} title={doc.title}>
                  {doc.title}
                </h3>
                <div className={styles.badges}>
                  {doc.category && <span className={styles.badge}>{doc.category}</span>}
                  {doc.year && <span className={styles.badge}>{doc.year}</span>}
                  {doc.size && <span className={styles.badge}>{doc.size}</span>}
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.buttonPrimary}
                  aria-label={`Открыть ${doc.title} в новой вкладке`}
                  title="Открыть в новой вкладке"
                >
                  <ExternalLink size={18} />
                  Открыть
                </a>
                <a
                  href={doc.file}
                  download
                  className={styles.buttonGhost}
                  aria-label={`Скачать ${doc.title}`}
                  title="Скачать PDF"
                >
                  <Download size={18} />
                  Скачать
                </a>
              </div>
            </article>
          ))}
        </div>

        {pdfArchive.length === 0 && (
          <div className={styles.empty}>Архив пока пуст.</div>
        )}
      </div>
    </div>
  );
};

export default Archive;
