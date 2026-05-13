// src/data/archive.ts
export type PdfDoc = {
  id: string;
  title: string;
  file?: string; // путь к файлу в /public (например: /pdfs/price-2025.pdf)
  size?: string; // "12.4 MB" (необязательно)
  year?: number; // 2025 (необязательно)
  category?: string; // "Каталоги", "Инструкции" и т.п. (необязательно)
};

export const pdfArchive: PdfDoc[] = [
  {
    id: "multeat-mul-me-per-2017",
    title: "PDF-инструкция MULTEAT MUL ME ПЕР(РЕВ 27.09.17)",
    year: 2024,
  },
];
