import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'

const isProduction = !process.env.ROLLUP_WATCH

const plugins = [
  resolve(),
  commonjs(),
  json(),
  bundleSize(),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  }),
  babel({
    runtimeHelpers: true,
    extensions: ['.js', '.vue'],
    sourceMap: true,
    exclude: 'node_modules/**'
  }),
  terser(),
  visualizer()
]

export default [
  {
    external: ['vue'],
    plugins,
    input: 'src/index.js',
    output: [
      {
        file: 'dist/vue-gg.js',
        format: 'umd',
        name: 'VueGG'
      },
      {
        file: 'dist/vue-gg.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/vue-gg.esm.js',
        format: 'esm'
      }
    ]
  }
]
