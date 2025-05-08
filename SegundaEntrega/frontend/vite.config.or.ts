// vite.config.or.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/version_original/", // <-- Este es el cambio clave
  build: {
    outDir: 'version_original',
    minify: false,
    sourcemap: true
  }
})