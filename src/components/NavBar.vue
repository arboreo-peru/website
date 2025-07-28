<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo/Brand -->
      <div class="nav-brand">
        <a href="#" class="brand-link" @click.prevent="navigateWithLoading('/')">
          <span class="brand-icon">🥗</span>
          <span class="brand-text">{{ RESTAURANT_CONFIG.name }}</span>
        </a>
      </div>

      <!-- Menu Toggle (Mobile) -->
      <button class="nav-toggle" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Links -->
      <div class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateWithLoading('/')"
          :class="{ active: $route.path === '/' }"
        >
          🏠 Inicio
        </a>

        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateWithLoading('/carta')"
          :class="{ active: $route.path === '/carta' }"
        >
          🍽️ Nuestra Carta
        </a>

        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateWithLoading('/ensaladas')"
          :class="{ active: $route.path === '/ensaladas' }"
        >
          🥗 Ensaladas
        </a>

        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateWithLoading('/prepara-orden')"
          :class="{ active: $route.path === '/prepara-orden' }"
        >
          🎨 Personalizar
        </a>

        <!-- Contact Info (Desktop) -->
        <div class="nav-contact">
          <div class="contact-info">
            <a :href="`mailto:${RESTAURANT_CONFIG.socialMedia.email}`" class="contact-item">
              {{ RESTAURANT_CONFIG.socialMedia.email }}
            </a>
            <a
              :href="`https://wa.me/${RESTAURANT_CONFIG.socialMedia.whatsapp.replace(/\D/g, '')}`"
              target="_blank"
              class="contact-item"
            >
              {{ RESTAURANT_CONFIG.socialMedia.whatsapp }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RESTAURANT_CONFIG } from '../config/restaurant'
import { useLoading } from '../composables/useLoading'

// Mobile menu state
const isMobileMenuOpen = ref(false)
const router = useRouter()
const { showLoading } = useLoading()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Función para manejar navegación con loading
const navigateWithLoading = (path: string) => {
  // Solo mostrar loading si vamos a una ruta diferente
  if (router.currentRoute.value.path !== path) {
    showLoading(1200) // Duración un poco más larga para mejor UX
  }
  closeMobileMenu()
  router.push(path)
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #1a3520 0%, #2c5530 30%, #3e6b42 70%, #4a7c59 100%);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%,
    transparent 100%
  );
  animation: shimmer 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.nav-brand .brand-link {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.nav-brand .brand-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-brand .brand-link:hover::before {
  left: 100%;
}

.nav-brand .brand-link:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
}

.brand-icon {
  font-size: 2.8rem;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.brand-text {
  background: linear-gradient(45deg, #ffffff, #a8e6a1, #7dd87d, #ffffff);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 4s ease-in-out infinite;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes gradientFlow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  opacity: 0.9;
  overflow: hidden;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid transparent;
  min-width: 120px;
  text-align: center;
  white-space: nowrap;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #a8e6a1, #7dd87d);
  transition: all 0.4s ease;
  transform: translateX(-50%);
}

.nav-link:hover,
.nav-link.active {
  opacity: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(168, 230, 161, 0.1));
  color: #a8e6a1;
  transform: translateY(-3px);
  border: 1px solid rgba(168, 230, 161, 0.3);
  box-shadow: 0 8px 25px rgba(168, 230, 161, 0.2);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 80%;
}

.nav-contact {
  margin-left: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.nav-contact::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(168, 230, 161, 0.8), transparent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  color: #a8e6a1;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.9;
  transition: all 0.3s ease;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  background: rgba(168, 230, 161, 0.05);
  border: 1px solid transparent;
  text-align: center;
}

.contact-item:hover {
  opacity: 1;
  background: rgba(168, 230, 161, 0.1);
  border: 1px solid rgba(168, 230, 161, 0.3);
  transform: translateY(-2px);
  color: #7dd87d;
}

/* Mobile Toggle Button */
.nav-toggle {
  display: none;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: linear-gradient(90deg, #ffffff, #a8e6a1);
  margin: 3px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  transform-origin: center;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
  background: linear-gradient(90deg, #ff8a56, #ff6b35);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
  background: linear-gradient(90deg, #ff8a56, #ff6b35);
}

/* Responsive */
@media (max-width: 1280px) {
  .nav-container {
    max-width: 100%;
    padding: 0 1.5rem;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.7rem 1rem;
    min-width: 110px;
  }

  .nav-menu {
    gap: 0.8rem;
    padding: 0.7rem 1.3rem;
  }

  .contact-item {
    font-size: 0.85rem;
    padding: 0.25rem 0.7rem;
  }
}

@media (max-width: 1200px) {
  .nav-contact {
    margin-left: 0.8rem;
    padding-left: 0.8rem;
  }

  .contact-item {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }

  .nav-link {
    font-size: 0.95rem;
    padding: 0.6rem 0.9rem;
    min-width: 100px;
  }

  .nav-menu {
    gap: 0.6rem;
    padding: 0.6rem 1.1rem;
  }
}

@media (max-width: 1100px) {
  .nav-link {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
    min-width: 90px;
  }

  .nav-menu {
    gap: 0.5rem;
    padding: 0.5rem 1rem;
  }

  .contact-item {
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
  }

  .contact-info {
    gap: 0.3rem;
  }
}

@media (max-width: 1024px) {
  .nav-contact {
    margin-left: 0.6rem;
    padding-left: 0.6rem;
  }

  .contact-item {
    font-size: 0.7rem;
    padding: 0.1rem 0.4rem;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 0.5rem 0.7rem;
    min-width: 85px;
  }

  .nav-menu {
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
  }
}

@media (max-width: 900px) {
  .nav-link {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    min-width: 80px;
  }

  .nav-menu {
    gap: 0.3rem;
    padding: 0.4rem 0.8rem;
  }

  .contact-item {
    font-size: 0.65rem;
    padding: 0.1rem 0.3rem;
  }
}

@media (max-width: 850px) {
  .brand-text {
    font-size: 1.5rem;
  }

  .nav-link {
    font-size: 0.75rem;
    padding: 0.4rem 0.5rem;
    min-width: 75px;
  }

  .nav-menu {
    gap: 0.2rem;
    padding: 0.4rem 0.7rem;
  }

  .contact-item {
    font-size: 0.6rem;
    padding: 0.05rem 0.25rem;
  }
}
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 90px;
    flex-direction: column;
    background: linear-gradient(135deg, rgba(26, 53, 32, 0.95), rgba(44, 85, 48, 0.95));
    width: 100%;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    padding: 2rem 0;
    gap: 1.5rem;
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0;
  }

  .nav-menu.active {
    left: 0;
    animation: slideInFromLeft 0.4s ease-out;
  }

  @keyframes slideInFromLeft {
    from {
      left: -100%;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }

  .nav-link {
    margin: 0 2rem;
    padding: 1rem 2rem;
    transform: translateX(-50px);
    opacity: 0;
    animation: slideInItem 0.5s ease-out forwards;
    min-width: auto;
    width: calc(100% - 4rem);
  }

  .nav-menu.active .nav-link:nth-child(1) {
    animation-delay: 0.1s;
  }
  .nav-menu.active .nav-link:nth-child(2) {
    animation-delay: 0.2s;
  }
  .nav-menu.active .nav-link:nth-child(3) {
    animation-delay: 0.3s;
  }
  .nav-menu.active .nav-link:nth-child(4) {
    animation-delay: 0.4s;
  }
  .nav-menu.active .nav-contact {
    animation-delay: 0.5s;
  }

  @keyframes slideInItem {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .nav-contact {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1.5rem;
    width: calc(100% - 4rem);
    margin: 0 2rem;
    transform: translateX(-50px);
    opacity: 0;
    animation: slideInItem 0.5s ease-out forwards;
  }

  .nav-contact::before {
    display: none;
  }

  .contact-info {
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }

  .contact-item {
    flex: 1;
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }

  .brand-text {
    display: block !important; /* ← Mostrar siempre el nombre */
    font-size: 1.2rem; /* ← Tamaño más pequeño para móvil */
  }

  .brand-icon {
    font-size: 2.2rem;
  }

  .navbar {
    padding: 0.8rem 0;
  }

  .nav-container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }

  .nav-link {
    font-size: 1rem;
    margin: 0 1rem;
    padding: 0.8rem 1.5rem;
    width: calc(100% - 2rem);
  }

  .brand-icon {
    font-size: 2rem;
  }

  .brand-text {
    font-size: 1rem !important; /* ← Aún más pequeño en pantallas muy pequeñas */
  }

  .nav-contact {
    margin: 0 1rem;
    width: calc(100% - 2rem);
  }

  .contact-info {
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact-item {
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }
}

/* Efecto hover global para toda la navbar */
.navbar:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

/* Scroll effect */
.navbar.scrolled {
  background: linear-gradient(135deg, rgba(26, 53, 32, 0.95), rgba(44, 85, 48, 0.95));
  backdrop-filter: blur(25px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}
</style>
