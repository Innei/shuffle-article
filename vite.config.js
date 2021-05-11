import { defineConfig } from 'vite'
const { resolve } = require('path')
export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        playground: resolve(__dirname, 'playground.html'),
      },
    },
  },
})
