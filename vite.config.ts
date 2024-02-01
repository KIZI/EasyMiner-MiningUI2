import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    Components({
      dirs: [],
      globs: [],
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@discoveredRules': resolve(__dirname, './src/features/discoveredRules/'),
      '@preprocessing': resolve(__dirname, './src/features/preprocessing/'),
      '@rulesMining': resolve(__dirname, './src/features/rulesMining/'),
      '@selectedRules': resolve(__dirname, './src/features/selectedRules/'),
      '@tasksHistory': resolve(__dirname, './src/features/tasksHistory/'),
    },
  },
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://br-dev.lmcloud.vse.cz/easyminercenter/',
      },
      '/em': {
        changeOrigin: true,
        target: 'https://br-dev.lmcloud.vse.cz/easyminercenter/',
      },
    },
  },
});
