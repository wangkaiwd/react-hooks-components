import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

module.exports = {
  input: './src/main.tsx',
  output: [
    { file: 'build/antd.cjs.js', format: 'cjs' },
    { file: 'build/antd.es.js', format: 'es' }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
};
