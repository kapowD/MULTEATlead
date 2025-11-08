import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '@shared/ui/PageMeta/PageMeta'; // 👈 добавь импорт

import { pdfArchive } from '../../data/archive';
import styles from './Archive.module.scss';

// ассеты
import eggVideo from '../../assets/images/I left my heart in Hyperborea.mp4';
import eggAudio from '../../assets/images/Black_Magick_SS_-_My_Love_Remastered_77384233.mp3';
import orbitImg from '../../assets/images/photo_2025-02-14_12-59-34.jpg';
import centerImg from '../../assets/images/pngwing.com.png';

const Archive: React.FC = () => {
  const navigate = useNavigate();

  const [eggOn, setEggOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleEgg = () => {
    setEggOn(prev => {
      const next = !prev;

      const v = videoRef.current;
      if (v) {
        if (next) {
          v.currentTime = 0;
          void v.play().catch(() => {});
        } else {
          v.pause();
          v.currentTime = 0;
        }
      }

      const a = audioRef.current;
      if (a) {
        if (next) {
          a.currentTime = 0;
          void a.play().catch(() => {});
        } else {
          a.pause();
          a.currentTime = 0;
        }
      }

      return next;
    });
  };

  const scatterById = useMemo(() => {
    const map = new Map<number, { tx: number; ty: number; rot: number; delay: number }>();
    pdfArchive.forEach((doc, i) => {
      const seed = i + 1;
      const sign = seed % 2 ? 1 : -1;
      const tx = sign * (140 + (seed % 7) * 50);
      const ty = 320 + (seed % 9) * 40;
      const rot = sign * (10 + (seed % 5) * 9);
      const delay = (seed % 10) * 0.06;
      map.set(doc.id, { tx, ty, rot, delay });
    });
    return map;
  }, []);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/');
  };

  return (
    <div className={`${styles.page} ${eggOn ? styles.scatterOn : ''}`}>
      {/* 👇 Мета-теги */}
      <PageMeta
        title="MULTEAT — Архив"
        description="Архив c PDF"
      />

      {/* Фон-видео */}
      <div className={`${styles.videoBackdrop} ${eggOn ? styles.show : ''}`} aria-hidden>
        <video
          ref={videoRef}
          className={styles.video}
          src={eggVideo}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Орбитальная картинка */}
      <img
        src={orbitImg}
        className={`${styles.orbitImg} ${eggOn ? styles.show : ''}`}
        alt=""
        aria-hidden="true"
      />

      {/* Картинка-«восьмёрка» по центру */}
      <img
        src={centerImg}
        className={`${styles.eightImg} ${eggOn ? styles.show : ''}`}
        alt=""
        aria-hidden="true"
      />

      {/* Аудио-плеер (скрытый) */}
      <audio ref={audioRef} src={eggAudio} preload="auto" loop aria-hidden="true" />

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
          <h1 className={`${styles.title} ${eggOn ? styles.titleEgg : ''}`}>
            {eggOn ? 'THE SUN SETS AT DAWN' : 'Архив документов (PDF)'}
          </h1>
        </header>

        <button
          type="button"
          className={styles.eggBtn}
          onClick={toggleEgg}
          aria-pressed={eggOn}
          aria-label="Включить пасхалку"
          title="Пасхалка"
        >
          🪄
        </button>

        <div className={styles.grid}>
          {pdfArchive.map((doc) => {
            const vars = scatterById.get(doc.id)!;
            return (
              <article
                key={doc.id}
                className={styles.card}
                style={
                  {
                    ['--tx' as any]: `${vars.tx}px`,
                    ['--ty' as any]: `${vars.ty}px`,
                    ['--rot' as any]: `${vars.rot}deg`,
                    ['--delay' as any]: `${vars.delay}s`,
                  } as React.CSSProperties
                }
              >
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
            );
          })}
        </div>

        {pdfArchive.length === 0 && <div className={styles.empty}>Архив пуст.</div>}
      </div>
    </div>
  );
};

export default Archive;
