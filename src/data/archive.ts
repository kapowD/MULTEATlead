import MzhTT20Document from "../assets/documents/MZhTT-20/manual_MJTT (1).pdf"
import Vmu230Passport from "../assets/documents/VMU 230-16/PassportVMU230.pdf"

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
    id: "vmu-230-16",
    title: "Паспорт вентилятора ВМУ 230-16",
    file: Vmu230Passport,
  },
  {
    id: "mzh-tt-20",
    title: "Документ МЖТТ-20",
    file: MzhTT20Document,
  },
  {
    id: "multeat-mul-me-per-2017",
    title: "PDF-инструкция MULTEAT MUL ME ПЕР(РЕВ 27.09.17)",
    year: 2024,
  },
];
