import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',   // <-- для мобильной сборки путь должен быть относительным
  server: {
    host: true,
  port: 5180,
    strictPort: true
  }
})
