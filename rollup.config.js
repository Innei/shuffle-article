import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

const p = [
  resolve(), // 查找和打包node_modules中的第三方模块
  commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
  typescript({ rollupCommonJSResolveHack: false, clean: true }),
]
export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'publish/index.umd.js',
      format: 'umd',
      name: 'shuffle-article',
      sourcemap: true,
    },
    plugins: p,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'publish/index.esm.js',
      format: 'esm',
      name: 'shuffle-article',
      sourcemap: true,
    },
    plugins: p,
  },
]
