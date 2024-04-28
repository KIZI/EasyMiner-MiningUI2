import './style/style.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from '@/libs/i18n/i18n'
import { router } from '@/libs/router'
import { vueQueryPluginOptions } from '@/libs/vueQuery'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(autoAnimatePlugin)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#MiningUI')
