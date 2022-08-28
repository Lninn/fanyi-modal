import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path";


// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        background: path.resolve(__dirname, "src/background.ts"),
        translate: path.resolve(__dirname, "src/translate/index.tsx"),
        popup: path.resolve(__dirname, "popup.html"),
      },
      output: {
        sourcemap: "inline",
        entryFileNames() {
          return "[name].js"
        },
        assetFileNames() {
          return "[name].[ext]"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
