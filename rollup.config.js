import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies)
const isProduction = !process.env.ROLLUP_WATCH

const plugins = [
  resolve(),
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
    sourceMap: true,
    extensions: ['.js', '.vue']
  })
  // minify({
  //   comments: false
  // })
]

export default [
  {
    external,
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
