import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/yourfitcard/',   // <-- matches repo name
  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
})
