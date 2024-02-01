import { createRouter, createWebHashHistory } from 'vue-router';
import IndexPage from '@/pages/IndexPage.vue';
import PreprocessingPage from '@/pages/PreprocessingPage.vue';

const routes = [
  { component: IndexPage, path: '/' },
  { component: PreprocessingPage, path: '/preprocessing' },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
