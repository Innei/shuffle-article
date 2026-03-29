import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '',
  plugins: [react()],
  resolve: {
    alias: {
      'article-shuffle': resolve(__dirname, '../../packages/core/src/index.ts'),
      'react-article-shuffle': resolve(__dirname, '../../packages/react/src/index.ts'),
    },
  },
})
