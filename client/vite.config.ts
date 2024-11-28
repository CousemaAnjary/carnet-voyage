import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt', // Permet d'afficher un popup si le sw à été mis à jour
    
    manifest: {
      name: 'carnet-voyage',
      short_name: 'carnet-voyage',
      description: 'carnet-voyage',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: false,
      suppressWarnings: false,
    },
    
  })],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})