import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    visualizer(),
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
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/easyminercenter/api': {
        changeOrigin: true,
        target: 'https://br-dev.lmcloud.vse.cz/',
      },
      '/easyminercenter/em': {
        changeOrigin: true,
        target: 'https://br-dev.lmcloud.vse.cz/',
      },
    },
  },
})
