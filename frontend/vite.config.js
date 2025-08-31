import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 8080,
    host: true,
    allowedHosts: [
      'info-p1-4.onrender.com'  // ✅ add your Render domain here
    ]
  }
})
