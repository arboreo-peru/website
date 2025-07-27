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

          <!-- Contenido de texto y botón -->
          <div class="delivery-info">
            <h3>Entrega a domicilio</h3>
            <p>Recibe tu pedido directamente en tu casa u oficina</p>
            <a
              :href="`mailto:${RESTAURANT_CONFIG.email}?subject=Pedido desde sitio web&body=Hola, me gustaría hacer un pedido.`"
              class="email-button"
            >
              <span class="email-icon">📧</span>
              <div class="email-text">
                <span class="email-label">Enviar pedido por email</span>
                <span class="email-address">{{ RESTAURANT_CONFIG.email }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{{ RESTAURANT_CONFIG.name }}</h3>
            <p>La mejor opción para comer saludable y delicioso en la ciudad.</p>
          </div>
          <div class="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul class="footer-links">
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/prepara-orden">Prepara tu Orden</RouterLink></li>
              <li><RouterLink to="/carta">Ver Carta</RouterLink></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contacto</h4>
            <div class="footer-contact">
              <p>📧 {{ RESTAURANT_CONFIG.email }}</p>
              <p>📱 {{ RESTAURANT_CONFIG.whatsapp }}</p>
            </div>
          </div>
          <div class="footer-section">
            <h4>Síguenos</h4>
            <div class="social-links">
              <a :href="RESTAURANT_CONFIG.socialMedia.facebook" target="_blank" class="social-link">
                Facebook
              </a>
              <a
                :href="RESTAURANT_CONFIG.socialMedia.instagram"
                target="_blank"
                class="social-link"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 {{ RESTAURANT_CONFIG.name }}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  margin: 0;
  padding: 0;
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
  background: linear-gradient(135deg, #1e3a2e 0%, #2c5530 35%, #4a7c59 70%, #6b8e23 100%);
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1b6810;
  font-weight: 600;
}

.delivery-info p {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.email-button {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, #7fe98a 0%, #026620 50%, #6b8e23 100%);
  color: white;
  padding: 2rem 3rem;
  border-radius: 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3); /* Sombra verde */
  border: 2px solid transparent;
}

.email-button:hover {
  transform: translateY(-3px);
  background: linear-gradient(135deg, #45aa26 0%, #07832c 50%, #6b8e23 100%);
  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4);
  border-color: #81c784; /* Borde verde claro en hover */
}

.email-icon {
  font-size: 3rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.email-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.email-label {
  font-size: 1.3rem;
  font-weight: 600;
  opacity: 0.95;
}

.email-address {
  font-size: 1.1rem;
  opacity: 0.8;
  font-weight: 400;
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
}

@media (max-width: 480px) {
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

  .email-icon {
    font-size: 2.5rem;
  }

  .email-label {
    font-size: 1.2rem;
  }

  .email-address {
    font-size: 1rem;
  }
}

/* Footer */
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

.footer .container {
  position: relative;
  z-index: 2;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-section {
  position: relative;
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

.footer-section p {
  line-height: 1.8;
  opacity: 0.9;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.85);
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

.footer-contact p {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-contact p::before {
  font-size: 1.2rem;
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
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 350px;
    text-align: center;
    font-size: 1.3rem;
    padding: 1.3rem 2.5rem;
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
