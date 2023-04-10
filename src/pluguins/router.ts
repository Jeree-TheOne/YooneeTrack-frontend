import StorageService from "@/services/storageService";
import Layout from "@/pages/Layouts/Base.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/login',
    component: () => import('@/pages/Login.vue'),
    beforeEnter(to: any, from: any, next: Function) {
      const token = StorageService.getItem('token')
      if (!token) next(true)
      else next('/workspaces')
    }
  },
  {
    path: '/registration',
    component: () => import('@/pages/Registration.vue'),
    beforeEnter(to: any, from: any, next: Function) {
      const token = StorageService.getItem('token')
      if (!token) next(true)
      else next('/')
    }
  },
  {
    path: '/',
    redirect: '/workspaces',
    component: Layout,
    children: [
      {
        name: 'Workspaces',
        path: 'workspaces',
        component: () => import('@/pages/Workspaces.vue')
      },
      {
        path: 'profile',
        component: () => import('@/pages/Profile.vue')
      },
      {
        path: 'workspace/:workspace/:deskId',
        component: () => import('@/pages/Workspace.vue')
      },
      {
        path: 'workspace/settings/:workspace',
        component: () => import('@/pages/Settings.vue')
      },
    ],
    beforeEnter(to: any, from: any, next: Function) {
      const token = StorageService.getItem('token')
      if (token) next(true)
      else next('/login')
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router