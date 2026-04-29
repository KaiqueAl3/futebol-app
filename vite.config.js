import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em produção, usamos caminhos relativos para o build funcionar tanto na
// raiz (Vercel/Netlify) quanto em subpasta (GitHub Pages: /futebol-app/).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: true,
  },
})
