import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoading } from '../composables/useLoading'

const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/carta',
      name: 'carta',
      component: () => import('../views/CartaView.vue'),
    },
    {
      path: '/ensaladas',
      name: 'ensaladas',
      component: () => import('../views/SaladView.vue'),
    },
    {
      path: '/prepara-orden',
      name: 'prepara-orden',
      component: () => import('../views/PreparaOrdenView.vue'),
    },
  ],
})

// Integrar loading en las transiciones de rutas
router.beforeEach((to, from, next) => {
  // Solo mostrar loading si estamos cambiando de ruta
  if (to.path !== from.path) {
    const { showLoading } = useLoading()
    showLoading(1000) // Mostrar por al menos 1 segundo
  }
  next()
})

export default router
