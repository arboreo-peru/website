import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/prepara-orden',
      name: 'prepara-orden',
      component: () => import('../views/PreparaOrdenView.vue'),
    },
    {
      path: '/carta',
      name: 'carta',
      component: () => import('../views/CartaView.vue'),
    },
  ],
})

export default router
