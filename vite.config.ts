import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Unfonts from 'unplugin-fonts/vite'

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
    Unfonts({
      google: {
        families: [
          {
            name: 'Open Sans',
            styles: 'ital,wght@0,300..800;1,300..800',
          },
        ],
      },
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
