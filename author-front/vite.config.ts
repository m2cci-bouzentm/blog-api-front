import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env,
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
    VITE_AUTHOR_KEY: process.env.VITE_AUTHOR_KEY,
    VITE_TINY_API: process.env.VITE_TINY_API,
  },
});
