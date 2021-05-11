import { copyFileSync } from 'fs'
import { join } from 'path'

export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: 'shuffle-article',
    sourcemap: true,
  },
  plugins: [
    {
      writeBundle() {
        copyFileSync(join('dist', 'index.d.ts'), join('dist', 'index.umd.d.ts'))
      },
    },
  ],
}
