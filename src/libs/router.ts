import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import PreprocessingPage from '@/pages/PreprocessingPage.vue'

export const routesNames = {
  rulesMining: 'rulesMining',
  preprocessing: 'preprocessing',
}

const routes = [
  { component: MainPage, path: '/', name: routesNames.rulesMining },
  { component: PreprocessingPage, path: '/preprocessing', name: routesNames.preprocessing },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
