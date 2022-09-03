import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, 'src/background.ts'),
        content: path.resolve(__dirname, 'src/content.ts'),
      },
      output: {
        sourcemap: 'inline',
        entryFileNames() {
          return '[name].js';
        },
        assetFileNames() {
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
