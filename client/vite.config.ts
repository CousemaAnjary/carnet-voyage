import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',  // Dossier source de ton projet
    filename: 'sw.ts',
    
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    manifest: {
      "name": "Carnet de voyage",
      "short_name": "Carnet de voyage",
      "description": "",
      "theme_color": "#ffffff",
      "background_color": "#ffffff",
      "display":"fullscreen",
      "icons": [
        {
          "src": "icons/64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "180x180.png",
          "sizes": "180x180",
          "type": "image/png"
        },
        {
          "src": "192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },

    devOptions: {
      enabled: false
    },
    
  })],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})