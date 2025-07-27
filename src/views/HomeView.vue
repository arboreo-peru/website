<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RESTAURANT_CONFIG } from '../config/restaurant'
import { useLoading } from '../composables/useLoading'

const router = useRouter()
const { showLoading } = useLoading()

// Función para navegación con loading
const navigateWithLoading = (path: string) => {
  if (router.currentRoute.value.path !== path) {
    showLoading(1000)
  }
  router.push(path)
}
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
          <a href="#" class="cta-button menu-button" @click.prevent="navigateWithLoading('/carta')">
            🍽️ Ver Menú del Día
          </a>
          <a
            href="#"
            class="cta-button salads-button"
            @click.prevent="navigateWithLoading('/ensaladas')"
          >
            🥗 Ver Carta de Ensaladas
          </a>
          <a
            href="#"
            class="cta-button custom-button"
            @click.prevent="navigateWithLoading('/prepara-orden')"
          >
            🎨 Personalizar mi Ensalada
          </a>
        </div>
      </div>
    </section>

    <!-- Comidas a tu Medida Section -->
    <section class="custom-meals-section">
      <div class="container">
        <h2>Comidas a tu medida</h2>
        <div class="meals-grid">
          <div class="meal-item">
            <div class="meal-icon">✅</div>
            <h3>Comidas a tu medida</h3>
            <p>Saludables y alineadas a tus metas.</p>
          </div>
          <div class="meal-item">
            <div class="meal-icon">✅</div>
            <h3>Menú siempre distinto</h3>
            <p>Elige tu favorito cada día.</p>
          </div>
          <div class="meal-item">
            <div class="meal-icon">✅</div>
            <h3>Más ahorro, cero esfuerzo</h3>
            <p>Sin cocinar. Delivery gratis al programar.</p>
          </div>
          <div class="meal-item">
            <div class="meal-icon">✅</div>
            <h3>Tú eliges cuándo y dónde</h3>
            <p>Programa o recibe hoy. Flexibilidad total.*</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <h2>¡Haz tu pedido ahora!</h2>
        <div class="delivery-content">
          <!-- Imagen de delivery -->
          <div class="delivery-image">
            <img src="../../public/images/delivery.png" alt="Entrega a domicilio" />
          </div>

          <!-- Contenido de texto y botones -->
          <div class="delivery-info">
            <h3>Entrega a domicilio</h3>
            <p>Recibe tu pedido directamente en tu casa u oficina</p>
            <div class="contact-buttons">
              <a
                :href="`https://wa.me/51${RESTAURANT_CONFIG.socialMedia.whatsapp}?text=Hola, me gustaría hacer un pedido desde su sitio web.`"
                class="contact-button whatsapp-button"
                target="_blank"
              >
                <span class="contact-icon">📱</span>
                <div class="contact-text">
                  <span class="contact-label">Pedir por WhatsApp</span>
                  <span class="contact-address"
                    >+51 {{ RESTAURANT_CONFIG.socialMedia.whatsapp }}</span
                  >
                </div>
              </a>
              <a
                :href="`mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=Pedido desde sitio web&body=Hola, me gustaría hacer un pedido.`"
                class="contact-button email-button"
              >
                <span class="contact-icon">📧</span>
                <div class="contact-text">
                  <span class="contact-label">Enviar por email</span>
                  <span class="contact-address">{{ RESTAURANT_CONFIG.socialMedia.email }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
}

/* Hero Section */
.hero-section {
  background-image: url('../../public/images/salad-wallpaper.png');
  background-size: cover; /* Que cubra todo el contenedor */
  background-position: center; /* Que siempre esté centrada */
  background-repeat: no-repeat; /* Que no se repita */
  color: white;
  padding: 8rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 70%, rgba(107, 142, 35, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(44, 85, 48, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #e8f5e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 2rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  font-weight: 300;
  color: #e8f5e8;
  letter-spacing: 0.5px;
}

.hero-description {
  font-size: 1.4rem;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  opacity: 0.9;
  color: #f0f8f0;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1.5rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button.primary {
  background: linear-gradient(135deg, #ff8a56, #ff6b35, #e55a2b);
  color: white;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.cta-button.primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(255, 107, 53, 0.6);
  background: linear-gradient(135deg, #ff9966, #ff8a56, #ff6b35);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #2c5530;
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(255, 255, 255, 0.3);
}

/* Comidas a tu Medida Section */
.custom-meals-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 50%, #e0f2eb 100%);
  position: relative;
  overflow: hidden;
}

.custom-meals-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 70%, rgba(34, 139, 34, 0.08) 0%, transparent 50%);
  animation: gentle-rotate 60s linear infinite;
}

@keyframes gentle-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.custom-meals-section .container {
  position: relative;
  z-index: 2;
}

.custom-meals-section h2 {
  font-size: 3.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59, #228b22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(44, 85, 48, 0.1);
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
  gap: 3rem;
}

.meal-item {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 12px 48px rgba(44, 85, 48, 0.12);
  border: 1px solid rgba(34, 139, 34, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.meal-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2c5530, #4a7c59, #228b22);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.meal-item:hover::before {
  transform: scaleX(1);
}

.meal-item:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 64px rgba(44, 85, 48, 0.2);
  background: rgba(255, 255, 255, 0.95);
}

.meal-icon {
  background: linear-gradient(135deg, #4caf50, #45a049, #228b22);
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 auto 2rem;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.meal-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.meal-item:hover .meal-icon::before {
  left: 100%;
}

.meal-item:hover .meal-icon {
  transform: scale(1.1);
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.4);
}

.meal-item h3 {
  font-size: 2rem;
  color: #2c5530;
  margin-bottom: 1.5rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.meal-item:hover h3 {
  color: #228b22;
}

.meal-item p {
  color: #6b7b68;
  line-height: 1.7;
  font-size: 1.4rem;
  margin-bottom: 0;
}

/* Contact Section */
.contact-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #2c5530 0%, #3e6b42 50%, #4a7c59 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.contact-section .container {
  position: relative;
  z-index: 2;
}

.contact-section h2 {
  font-size: 3.8rem;
  color: white;
  margin-bottom: 4rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.delivery-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.delivery-info h3 {
  font-size: 2.8rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delivery-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.delivery-image::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 24px;
  filter: blur(20px);
}

.delivery-info p {
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delivery-image img {
  width: 100%;
  max-width: 450px;
  border-radius: 20px;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.delivery-image img:hover {
  transform: scale(1.05);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.delivery-info {
  text-align: left;
}

.delivery-info h3 {
  font-size: 2.8rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delivery-info p {
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-buttons {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  color: white;
  padding: 2rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  min-width: 300px;
}

.contact-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.contact-button:hover::before {
  left: 100%;
}

.contact-button:hover {
  transform: translateY(-4px);
}

.whatsapp-button {
  background: linear-gradient(135deg, #25d366, #128c7e, #075e54);
  box-shadow: 0 8px 32px rgba(37, 211, 102, 0.4);
}

.whatsapp-button:hover {
  background: linear-gradient(135deg, #38e577, #25d366, #128c7e);
  box-shadow: 0 12px 48px rgba(37, 211, 102, 0.6);
}

.email-button {
  background: linear-gradient(135deg, #ff8a56, #ff6b35, #e55a2b);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
}

.email-button:hover {
  background: linear-gradient(135deg, #ff9966, #ff8a56, #ff6b35);
  box-shadow: 0 12px 48px rgba(255, 107, 53, 0.6);
}

.contact-icon {
  font-size: 3rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: gentle-pulse 3s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-label {
  font-size: 1.5rem;
  font-weight: 700;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.contact-address {
  font-size: 1.2rem;
  opacity: 0.85;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .delivery-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .delivery-info {
    text-align: center;
  }

  .delivery-image img {
    max-width: 300px;
  }

  .delivery-info h3 {
    font-size: 2.2rem;
  }

  .delivery-info p {
    font-size: 1.2rem;
  }

  .email-button {
    padding: 1.8rem 2.5rem;
    width: 100%;
    max-width: 400px;
    justify-content: center;
  }

  .contact-buttons {
    align-items: center;
    width: 100%;
  }

  .contact-button {
    width: 100%;
    max-width: 400px;
    justify-content: center;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 0;
  }

  .container {
    padding: 0 0.5rem;
  }

  .contact-section {
    padding: 4rem 0;
  }

  .contact-section h2 {
    font-size: 2.8rem;
    margin-bottom: 3rem;
  }

  .delivery-content {
    gap: 2rem;
  }

  .delivery-image img {
    max-width: 250px;
  }

  .delivery-info h3 {
    font-size: 2rem;
  }

  .delivery-info p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .email-button {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 2rem;
  }

  .contact-buttons {
    gap: 1.5rem;
  }

  .contact-button {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 2rem;
  }

  .contact-icon {
    font-size: 2.5rem;
  }

  .contact-label {
    font-size: 1.2rem;
  }

  .contact-address {
    font-size: 1rem;
  }
}

.social-links {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.social-link {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.4s ease;
  font-size: 1.4rem;
  padding: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.social-link:hover {
  opacity: 1;
  transform: translateY(-4px);
  background: rgba(168, 230, 161, 0.2);
  color: #a8e6a1;
  box-shadow: 0 8px 32px rgba(168, 230, 161, 0.3);
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
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 1.6rem;
  }

  .hero-description {
    font-size: 1.2rem;
  }

  .cta-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .cta-button {
    padding: 1.8rem 2.5rem;
    border-radius: 20px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.3rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    text-align: center;
    min-height: 70px;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }

  .cta-button:hover::before {
    left: 100%;
  }

  .cta-button:hover {
    transform: translateY(-6px) scale(1.02);
  }

  /* Botón Ver Menú del Día */
  .menu-button {
    background: linear-gradient(135deg, #ff8a56, #ff6b35, #e55a2b);
    color: white;
    box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
  }

  .menu-button:hover {
    background: linear-gradient(135deg, #ff9966, #ff8a56, #ff6b35);
    box-shadow: 0 15px 50px rgba(255, 107, 53, 0.6);
  }

  /* Botón Ver Carta de Ensaladas */
  .salads-button {
    background: linear-gradient(135deg, #4caf50, #45a049, #388e3c);
    color: white;
    box-shadow: 0 8px 32px rgba(76, 175, 80, 0.4);
  }

  .salads-button:hover {
    background: linear-gradient(135deg, #66bb6a, #4caf50, #43a047);
    box-shadow: 0 15px 50px rgba(76, 175, 80, 0.6);
  }

  /* Botón Personalizar mi Ensalada */
  .custom-button {
    background: linear-gradient(135deg, #9c27b0, #8e24aa, #7b1fa2);
    color: white;
    box-shadow: 0 8px 32px rgba(156, 39, 176, 0.4);
  }

  .custom-button:hover {
    background: linear-gradient(135deg, #ab47bc, #9c27b0, #8e24aa);
    box-shadow: 0 15px 50px rgba(156, 39, 176, 0.6);
  }

  /* ... resto de estilos permanecen igual hasta las media queries ... */

  /* Responsive Design Actualizado */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 3.5rem;
    }

    .hero-subtitle {
      font-size: 1.6rem;
    }

    .hero-description {
      font-size: 1.2rem;
      margin-bottom: 2.5rem;
    }

    .cta-buttons {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 400px;
    }

    .cta-button {
      font-size: 1.2rem;
      padding: 1.6rem 2rem;
      min-height: 65px;
    }

    .custom-meals-section h2 {
      font-size: 3rem;
    }

    .contact-section h2 {
      font-size: 3rem;
    }

    .meal-item h3 {
      font-size: 1.5rem;
    }

    .meal-item p {
      font-size: 1.1rem;
    }

    .meals-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .delivery-content {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }

    .delivery-info {
      text-align: center;
    }

    .delivery-image img {
      max-width: 300px;
    }

    .delivery-info h3 {
      font-size: 2.2rem;
    }

    .delivery-info p {
      font-size: 1.2rem;
    }

    .contact-buttons {
      align-items: center;
      width: 100%;
    }

    .contact-button {
      width: 100%;
      max-width: 400px;
      justify-content: center;
      min-width: auto;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 2.8rem;
    }

    .hero-subtitle {
      font-size: 1.4rem;
    }

    .hero-description {
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .cta-buttons {
      gap: 1.2rem;
      max-width: 320px;
      grid-template-columns: 1fr;
    }

    .cta-button {
      font-size: 1.1rem;
      padding: 1.4rem 1.5rem;
      min-height: 60px;
      border-radius: 15px;
    }

    .custom-meals-section h2,
    .contact-section h2 {
      font-size: 2.5rem;
    }

    .meal-icon {
      width: 70px;
      height: 70px;
      font-size: 1.4rem;
    }

    .home-container {
      padding: 0;
    }

    .container {
      padding: 0 0.5rem;
    }

    .contact-section {
      padding: 4rem 0;
    }

    .contact-section h2 {
      font-size: 2.8rem;
      margin-bottom: 3rem;
    }

    .delivery-content {
      gap: 2rem;
    }

    .delivery-image img {
      max-width: 250px;
    }

    .delivery-info h3 {
      font-size: 2rem;
    }

    .delivery-info p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .contact-buttons {
      gap: 1.5rem;
    }

    .contact-button {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
      padding: 1.5rem 2rem;
    }

    .contact-icon {
      font-size: 2.5rem;
    }

    .contact-label {
      font-size: 1.2rem;
    }

    .contact-address {
      font-size: 1rem;
    }
  }

  /* Breakpoint especial para pantallas muy pequeñas */
  @media (max-width: 360px) {
    .cta-buttons {
      max-width: 280px;
    }

    .cta-button {
      font-size: 1rem;
      padding: 1.2rem 1rem;
      min-height: 55px;
    }
  }
  .custom-meals-section h2 {
    font-size: 3rem;
  }

  .contact-section h2 {
    font-size: 3rem;
  }

  .meal-item h3 {
    font-size: 1.5rem;
  }

  .meal-item p {
    font-size: 1.1rem;
  }

  .meals-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.4rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .custom-meals-section h2,
  .contact-section h2 {
    font-size: 2.5rem;
  }

  .cta-button {
    font-size: 1.2rem;
    padding: 1.2rem 2rem;
  }

  .meal-icon {
    width: 70px;
    height: 70px;
    font-size: 1.4rem;
  }

  .email-info {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
    padding: 1.8rem 2.5rem;
  }

  .email-icon {
    font-size: 2.5rem;
  }

  .email-address {
    font-size: 1.4rem;
  }

  .footer-section h3 {
    font-size: 1.8rem;
  }

  .footer-section h4 {
    font-size: 1.3rem;
  }
}
</style>
