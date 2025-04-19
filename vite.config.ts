import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MULTEATlead/', // Замените <имя-репозитория> на имя вашего репозитория
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});