import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['devdooly.iptime.org'],
    proxy: {
      '/api/koreaexim': {
        target: 'https://oapi.koreaexim.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/koreaexim/, ''),
        secure: false, // For development, if the target API has issues with SSL certificates
      },
    },
  },
})
