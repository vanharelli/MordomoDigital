import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acesso pela rede (0.0.0.0)
    allowedHosts: true // LIBERAÇÃO TOTAL: Aceita qualquer domínio (ngrok, localhost, ip)
  }
})
