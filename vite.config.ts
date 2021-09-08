import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts2 from 'rollup-plugin-typescript2';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    json(),
    {
      ...ts2({
        check: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'), // your tsconfig.json path
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: false,
            declaration: true,
            declarationMap: false,
          },
        },
      }),
      enforce: 'pre',
    },
    nodeResolve(),
    commonjs(),
  ],
  build: {
    rollupOptions: {
      input: './src/App.vue',
      external: ['vue'],
      output: [
        {
          exports: 'auto',
          format: 'umd',
          entryFileNames: 'index.js',
          name: 'VueWaterMarker',
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'VueWaterMarker',
      fileName: 'index',
    },
    terserOptions: {
      ecma: 2016,
    },
  },
});
