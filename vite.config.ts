import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        'background': 'src/background.ts'
      },
      output: {
        entryFileNames() {
          return "[name].js";
        },
      }
    }
  }
})
