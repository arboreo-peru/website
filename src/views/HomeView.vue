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
            <div class="meal-icon">MV</div>
            <h3>Comidas a tu medida</h3>
            <p>Saludables y alineadas a tus metas.</p>
          </div>
          <div class="meal-item">
            <div class="meal-icon">MV</div>
            <h3>Menú siempre distinto</h3>
            <p>Elige tu favorito cada día.</p>
          </div>
          <div class="meal-item">
            <div class="meal-icon">MV</div>
            <h3>Más ahorro, cero esfuerzo</h3>
            <p>Sin cocinar. Delivery gratis al programar.</p>
          </div>
          <div class="meal-item">
            <div class="meal-icon">MV</div>
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
        <div class="email-section">
          <a 
            :href="`mailto:${RESTAURANT_CONFIG.email}?subject=Pedido desde sitio web&body=Hola, me gustaría hacer un pedido.`"
            class="email-info"
          >
            <span class="email-icon">�</span>
            <div>
              <p class="email-label">Email:</p>
              <span class="email-address">{{ RESTAURANT_CONFIG.email }}</span>
            </div>
          </a>
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
              <p>� {{ RESTAURANT_CONFIG.email }}</p>
              <p>�📱 {{ RESTAURANT_CONFIG.whatsapp }}</p>
            </div>
          </div>
          <div class="footer-section">
            <h4>Síguenos</h4>
            <div class="social-links">
              <a :href="RESTAURANT_CONFIG.socialMedia.facebook" target="_blank" class="social-link">
                Facebook
              </a>
              <a :href="RESTAURANT_CONFIG.socialMedia.instagram" target="_blank" class="social-link">
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
  background: linear-gradient(135deg, #2c5530 0%, #4a7c59 50%, #6b8e23 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  font-weight: 300;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1.2rem 2.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button.primary {
  background: #ff6b35;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.cta-button.primary:hover {
  background: #e55a2b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: white;
  color: #2c5530;
  transform: translateY(-2px);
}

/* Comidas a tu Medida Section */
.custom-meals-section {
  padding: 6rem 0;
  background: #f8f9fa;
}

.custom-meals-section h2 {
  font-size: 2.5rem;
  color: #2c5530;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 700;
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.meal-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.meal-item:hover {
  transform: translateY(-5px);
}

.meal-icon {
  background: #4caf50;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 auto 1.5rem;
}

.meal-item h3 {
  font-size: 1.3rem;
  color: #2c5530;
  margin-bottom: 1rem;
  font-weight: 600;
}

.meal-item p {
  color: #666;
  line-height: 1.6;
}

/* Contact Section */
.contact-section {
  padding: 6rem 0;
  background: white;
  text-align: center;
}

.contact-section h2 {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 3rem;
  font-weight: 700;
}

.email-section {
  display: flex;
  justify-content: center;
}

.email-info {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: #ff6b35;
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.email-info:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.email-icon {
  font-size: 2rem;
}

.email-label {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.email-address {
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
}

/* Footer */
.footer {
  background: #2c5530;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #a8e6a1;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #a8e6a1;
}

.footer-section p {
  line-height: 1.6;
  opacity: 0.9;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
}

.footer-contact p {
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
  
  .meals-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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
    font-size: 2rem;
  }
  
  .custom-meals-section h2,
  .contact-section h2 {
    font-size: 2rem;
  }
  
  .email-info {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
