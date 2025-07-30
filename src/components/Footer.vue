// src/components/FooterSection.vue
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Información del Restaurante -->
        <div class="footer-section">
          <h3>{{ RESTAURANT_CONFIG.name }}</h3>
          <p>La mejor opción para comer saludable y delicioso en la ciudad.</p>
          <div class="footer-stats">
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Clientes Felices</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Natural</span>
            </div>
          </div>
        </div>

        <!-- Enlaces Rápidos -->
        <div class="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul class="footer-links">
            <li><RouterLink to="/">🏠 Inicio</RouterLink></li>
            <li><RouterLink to="/prepara-orden">🎨 Prepara tu Orden</RouterLink></li>
            <li><RouterLink to="/Ensaladas">🥗 Ver Ensaladas</RouterLink></li>
            <li><RouterLink to="/carta">📋 Ver Menú</RouterLink></li>
          </ul>
        </div>

        <!-- Contacto -->
        <div class="footer-section">
          <h4>Contacto</h4>
          <div class="footer-contact">
            <a :href="`mailto:${RESTAURANT_CONFIG.socialMedia.email}`" class="contact-item">
              <span class="contact-icon">📧</span>
              <span>{{ RESTAURANT_CONFIG.socialMedia.email }}</span>
            </a>
            <a
              :href="`https://wa.me/${RESTAURANT_CONFIG.socialMedia.whatsapp.replace(/\D/g, '')}`"
              class="contact-item"
            >
              <span class="contact-icon">📱</span>
              <span>{{ RESTAURANT_CONFIG.socialMedia.whatsapp }}</span>
            </a>
          </div>
        </div>

        <!-- Redes Sociales y Horarios -->
        <div class="footer-section">
          <h4>Síguenos</h4>
          <div class="social-links">
            <a :href="RESTAURANT_CONFIG.socialMedia.facebook" target="_blank" class="social-link">
              <span>📘</span>
              Facebook
            </a>
            <a :href="RESTAURANT_CONFIG.socialMedia.instagram" target="_blank" class="social-link">
              <span>📷</span>
              Instagram
            </a>
            <a :href="RESTAURANT_CONFIG.socialMedia.twitter" target="_blank" class="social-link">
              <span>✖️</span>
              X
            </a>
          </div>

          <div class="schedule">
            <h5>Horarios</h5>
            <p>{{ RESTAURANT_CONFIG.horario }}</p>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ RESTAURANT_CONFIG.name }}. Todos los derechos reservados.</p>
        <p class="footer-credits">Hecho con 💚 para una alimentación saludable</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RESTAURANT_CONFIG } from '../config/restaurant'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a3520 0%, #2c5530 50%, #3e6b42 100%);
  color: white;
  padding: 6rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #a8e6a1;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.footer-section h4 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #a8e6a1;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.footer-section h5 {
  font-size: 1.4rem;
  margin: 2rem 0 1rem;
  color: #a8e6a1;
  font-weight: 600;
}

.footer-section p {
  line-height: 1.8;
  opacity: 0.9;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.85);
}

.footer-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #a8e6a1;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 1rem;
  position: relative;
}

.footer-links li::before {
  content: '→';
  position: absolute;
  left: -20px;
  color: #a8e6a1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.footer-links li:hover::before {
  opacity: 1;
}

.footer-links a {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.3s ease;
  font-size: 1.4rem;
  font-weight: 400;
  position: relative;
  padding-left: 0;
  transition: padding-left 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
  color: #a8e6a1;
  padding-left: 20px;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  opacity: 0.9;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
}

.contact-item:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
  color: #a8e6a1;
  transform: translateX(5px);
}

.contact-icon {
  font-size: 1.2rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.4s ease;
  font-size: 1.4rem;
  padding: 0.8rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link:hover {
  opacity: 1;
  transform: translateY(-2px);
  background: rgba(168, 230, 161, 0.2);
  color: #a8e6a1;
  box-shadow: 0 8px 32px rgba(168, 230, 161, 0.3);
}

.schedule {
  margin-top: 2rem;
}

.schedule p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 3rem;
  text-align: center;
  opacity: 0.8;
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #a8e6a1, transparent);
}

.footer-bottom p {
  font-size: 1.3rem;
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.7);
}

.footer-credits {
  font-size: 1.1rem !important;
  margin-top: 1rem !important;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-stats {
    justify-content: center;
  }

  .footer-section h3 {
    font-size: 1.8rem;
  }

  .footer-section h4 {
    font-size: 1.5rem;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>
