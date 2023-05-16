import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { checker } from 'vite-plugin-checker';
import { svgSpritemap } from 'vite-plugin-svg-spritemap';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        '@root': path.resolve(__dirname),
        '@ui': path.resolve(__dirname, './src/view/ui'),
      },
    },
    envDir: './env',
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      svgSpritemap({
        pattern: 'src/view/assets/icons/*.svg',
        filename: 'icons/spritemap.svg',
        prefix: 'sprite',
      }),
      svgSpritemap({
        pattern: 'src/view/assets/icons/raw/*.svg',
        filename: 'icons/raw-spritemap.svg',
        prefix: 'sprite',
      }),
    ],
  };
});
