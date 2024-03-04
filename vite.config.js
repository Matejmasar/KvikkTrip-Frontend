import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "istanbul",
      enabled: true
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  }
})
