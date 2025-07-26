<script setup lang="ts">
import { RESTAURANT_CONFIG } from '../config/restaurant'
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Bienvenido a {{ RESTAURANT_CONFIG.name }}</h1>
        <p class="hero-subtitle">Almuerzos deliciosos y ensaladas frescas hechas a tu medida</p>
        <p class="hero-description">
          Crea tu ensalada perfecta eligiendo entre nuestros ingredientes frescos, proteínas de
          calidad y deliciosas vinagretas artesanales. También ofrecemos una variedad de almuerzos
          saludables para satisfacer tu apetito.
        </p>
        <div class="cta-buttons">
          <RouterLink to="/prepara-orden" class="cta-button primary">
            🥗 Prepara tu Orden
          </RouterLink>
          <RouterLink to="/carta" class="cta-button secondary"> 📋 Ver Carta </RouterLink>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="contact-container">
        <h2>¡Haz tu pedido ahora!</h2>
        <div class="whatsapp-section">
          <div class="whatsapp-info">
            <span class="whatsapp-icon"
              ><img
                class="icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png"
              />
            </span>
            <div>
              <p class="whatsapp-label">WhatsApp:</p>
              <a
                :href="`https://wa.me/${RESTAURANT_CONFIG.whatsapp}`"
                class="whatsapp-number"
                target="_blank"
              >
                {{ RESTAURANT_CONFIG.whatsapp }}
              </a>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="social-media">
          <h3>Síguenos en nuestras redes:</h3>
          <div class="social-links">
            <a
              :href="RESTAURANT_CONFIG.socialMedia.facebook"
              target="_blank"
              class="social-link facebook"
              aria-label="Facebook"
            >
              <img
                class="icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/512px-2021_Facebook_icon.svg.png"
                alt="Facebook"
              />
            </a>
            <a
              :href="RESTAURANT_CONFIG.socialMedia.twitter"
              target="_blank"
              class="social-link twitter"
              aria-label="Twitter"
            >
              🐦
            </a>
            <a
              :href="RESTAURANT_CONFIG.socialMedia.instagram"
              target="_blank"
              class="social-link instagram"
              aria-label="Instagram"
            >
              📷
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <h2>¿Por qué elegir {{ RESTAURANT_CONFIG.name }}?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🥬</div>
            <h3>Ingredientes Frescos</h3>
            <p>Seleccionamos los mejores ingredientes del día para garantizar frescura y calidad</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🎯</div>
            <h3>Personalización Total</h3>
            <p>Crea tu ensalada perfecta eligiendo entre más de 20 ingredientes diferentes</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⚡</div>
            <h3>Preparación Rápida</h3>
            <p>Tu ensalada estará lista en pocos minutos, perfecta para el almuerzo</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💚</div>
            <h3>Opción Saludable</h3>
            <p>Alimentación balanceada y nutritiva para cuidar tu bienestar</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 50%, #7fcdcd 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.hero-content {
  padding: 4rem 2rem;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button.primary {
  background: #ff6b6b;
  color: white;
}

.cta-button.primary:hover {
  background: #ff5252;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-button.secondary {
  background: white;
  color: #4caf50;
}

.cta-button.secondary:hover {
  background: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Contact Section */
.contact-section {
  background: white;
  border-radius: 16px;
  margin-bottom: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.contact-container {
  padding: 3rem 2rem;
  text-align: center;
}

.contact-container h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.whatsapp-section {
  margin-bottom: 2.5rem;
}

.whatsapp-info {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: #25d366;
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  transition: transform 0.3s ease;
}

.whatsapp-info:hover {
  transform: translateY(-3px);
}

.whatsapp-icon {
  font-size: 2rem;
}

.whatsapp-label {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.whatsapp-number {
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: bold;
}

.social-media h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
  transform: translateY(-3px) scale(1.1);
}

.social-link.facebook {
  background: #1877f2;
  color: white;
}

.social-link.twitter {
  background: #1da1f2;
  color: white;
}

.social-link.instagram {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  color: white;
}

/* Features Section */
.features-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.features-container {
  padding: 3rem 2rem;
}

.features-container h2 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature p {
  color: #666;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .whatsapp-info {
    flex-direction: column;
    text-align: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .social-links {
    gap: 0.5rem;
  }

  .social-link {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .contact-container,
  .features-container {
    padding: 2rem 1rem;
  }

  .contact-container h2,
  .features-container h2 {
    font-size: 2rem;
  }
}
</style>
