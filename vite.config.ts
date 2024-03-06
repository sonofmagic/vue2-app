import { defineConfig } from 'vite'
import path from "node:path"
// import vue from '@vitejs/plugin-vue'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  plugins: [vue()],
})
