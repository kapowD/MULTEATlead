// src/pages/Archive/Archive.tsx
import { ArrowLeft, Download, ExternalLink, FileText, Filter } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { pdfArchive } from '../../data/archive';
import styles from './Archive.module.scss';

const Archive: React.FC = () => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  // Список годов строим один раз (pdfArchive статичен)
  const years = useMemo(() => {
    const ys = Array.from(new Set(pdfArchive.map(d => d.year).filter(Boolean))) as number[];
    return ys.sort((a, b) => b - a);
  }, []);

  // Фильтр по запросу/году
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pdfArchive.filter((d) => {
      const okYear = year === 'all' || d.year === year;
      const okQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        (d.category?.toLowerCase().includes(q) ?? false);
      return okYear && okQuery;
    });
  }, [query, year]);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/main');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Кнопка "Назад" */}
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

          <div className={styles.controls}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Поиск по названию или категории…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Поиск по PDF"
              />
            </div>

            <div className={styles.filter}>
              <Filter size={18} className={styles.filterIcon} />
              <select
                className={styles.select}
                value={year}
                onChange={(e) =>
                  setYear(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                aria-label="Фильтр по году"
              >
                <option value="all">Все годы</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className={styles.grid}>
          {filtered.map((doc) => (
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

        {filtered.length === 0 && (
          <div className={styles.empty}>
            Ничего не найдено. Попробуйте изменить запрос или фильтр по году.
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
