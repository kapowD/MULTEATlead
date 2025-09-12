// src/data/archive.ts
export type PdfDoc = {
  id: string;
  title: string;
  file: string; // путь к файлу в /public (например: /pdfs/price-2025.pdf)
  size?: string; // "12.4 MB" (необязательно)
  year?: number; // 2025 (необязательно)
  category?: string; // "Каталоги", "Инструкции" и т.п. (необязательно)
};

export const pdfArchive: PdfDoc[] = [
  {
    id: "catalog-2025",
    title: "Каталог продукции 2025",
    file: "/pdfs/catalog-2025.pdf",
    size: "12.4 MB",
    year: 2025,
    category: "Каталоги",
  },
  {
    id: "manual-heater-a1",
    title: "Инструкция по эксплуатации — Обогреватель A1",
    file: "/pdfs/manual-heater-a1.pdf",
    size: "2.1 MB",
    year: 2024,
    category: "Инструкции",
  },
  {
    id: "price-2025-q3",
    title: "Прайс-лист Q3 2025",
    file: "/pdfs/price-2025-q3.pdf",
    size: "850 KB",
    year: 2025,
    category: "Прайс",
  },
];
