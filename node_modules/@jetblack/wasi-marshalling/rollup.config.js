import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/index.js',
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'wasiMarshalling'
    },
    {
      file: 'lib/index.min.js',
      format: 'umd',
      name: 'WasiMarshalling',
      plugins: [terser()]
    }
  ]
}