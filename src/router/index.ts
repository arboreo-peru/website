import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoading } from '../composables/useLoading'

const router = createRouter({
  history: createWebHistory('#'),
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (por ejemplo, al usar el botón de atrás del navegador)
    if (savedPosition) {
      return savedPosition
    }
    // Si hay un hash en la URL (por ejemplo, #section)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // Por defecto, ir al top de la página
    return { top: 0, behavior: 'smooth' }
  },
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
