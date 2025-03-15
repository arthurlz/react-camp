import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
      getJSON: function(cssFileName, json, outputFileName) {
        console.log(cssFileName, json, outputFileName)
      }
      // generateScopedName: 'skytech_[name]__[local]___[hash:base64:5]',
      // generateScopedName(name, filename, css) {
      //   console.log(name, filename, css)
      //   return 'skytech_' + name 
      // },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
