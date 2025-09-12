// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // игнорим артефакты сборки/кеша
  { ignores: ["dist", "build", "node_modules", ".vite", "coverage"] },

  // базовые пресеты JS + TS (без типовых правил, быстро)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      react: { version: "detect" },
      // чтобы eslint-plugin-import понимал TS-резолвинг
      "import/resolver": { typescript: true, node: true },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Hooks + a11y
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // Импорты
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // TS unused vars (вместо core)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // в самом конце — отключаем конфликтующие с Prettier правила
  prettier
);
