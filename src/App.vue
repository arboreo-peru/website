<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RESTAURANT_CONFIG } from './config/restaurant'
</script>

<template>
  <div id="app">
    <header class="navbar">
      <div class="nav-container">
        <div class="logo-section">
          <div class="logo-placeholder">
            <!-- Espacio reservado para el logo -->
            <span class="logo-text">{{ RESTAURANT_CONFIG.name }}</span>
          </div>
        </div>

        <nav class="nav-links">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/prepara-orden" class="nav-link">Prepara tu Orden</RouterLink>
          <RouterLink to="/carta" class="nav-link">Carta</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.navbar {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  flex: 1;
}

.logo-placeholder {
  display: flex;
  align-items: center;
  color: white;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.main-content {
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .logo-section {
    flex: none;
  }

  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }

  .main-content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.5rem;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>
