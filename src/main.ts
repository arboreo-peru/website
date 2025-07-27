import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useLoading } from './composables/useLoading'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Mostrar loading inicial cuando la aplicación carga
const { showLoading } = useLoading()
showLoading(800) // Loading inicial de 800ms

app.mount('#app')
