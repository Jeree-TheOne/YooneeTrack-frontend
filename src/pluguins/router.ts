import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/App.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router