import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Add this line

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:2001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})