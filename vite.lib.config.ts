import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'publish',
    rollupOptions: {
      external: ['@chenglou/pretext'],
    },
  },
  plugins: [
    dts({
      outDir: 'publish',
      rollupTypes: true,
    }),
  ],
})
