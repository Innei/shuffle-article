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
    neverBundle: ['@chenglou/pretext'],
  },
  tsconfig: './tsconfig.json',
})
