import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  clean: true,
  platform: 'browser',
  target: 'es2022',
  deps: {
    neverBundle: ['article-shuffle', 'react', 'react-dom'],
  },
  tsconfig: './tsconfig.json',
})
