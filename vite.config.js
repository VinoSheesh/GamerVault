import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tidak perlu import tailwindcss di vite.config.js
export default defineConfig({
  plugins: [react()],
})
