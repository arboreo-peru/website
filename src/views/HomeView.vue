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

    <!-- Planes Arbóreo Section -->
    <section class="plans-section">
      <div class="container">
        <h2>Planes Arbóreo</h2>
        <p class="section-subtitle">
          Ahorra con nuestros planes de comidas. Puedes elegir cualquier opción de nuestra carta y
          disfrutar de una alimentación saludable y variada todos los días.
        </p>

        <!-- Opciones Disponibles -->
        <div class="plan-options">
          <h4>Se puede elegir cualquier opción de la carta:</h4>
          <div class="option-tags">
            <a href="#" class="option-tag" @click.prevent="navigateWithLoading('/ensaladas')">
              🥗 Ensaladas de la Casa
            </a>
            <a href="#" class="option-tag" @click.prevent="navigateWithLoading('/prepara-orden')">
              🥬 Saladbar
            </a>
            <a href="#" class="option-tag" @click.prevent="navigateWithLoading('/carta')">
              🍽️ Platos del Día
            </a>
          </div>
        </div>

        <div class="plans-grid">
          <!-- Plan 20 Comidas -->
          <div class="plan-card featured">
            <div class="plan-badge">Más Popular</div>
            <div class="plan-icon">🍽️</div>
            <h3>Plan 20 Comidas</h3>
            <div class="plan-price">
              <span class="price-amount">S/ 360</span>
              <span class="price-per">S/ 18 por comida</span>
            </div>
            <ul class="plan-features">
              <li>20 comidas incluidas</li>
              <li>Ahorro de S/ 40</li>
              <li>Delivery gratis programado</li>
            </ul>
            <a
              href="#"
              class="plan-button plan-20-button"
              @click.prevent="navigateWithLoading('/carta')"
            >
              Elegir Plan 20
            </a>
          </div>

          <!-- Plan 10 Comidas -->
          <div class="plan-card">
            <div class="plan-icon">🥗</div>
            <h3>Plan 10 Comidas</h3>
            <div class="plan-price">
              <span class="price-amount">S/ 190</span>
              <span class="price-per">S/ 19 por comida</span>
            </div>
            <ul class="plan-features">
              <li>10 comidas incluidas</li>
              <li>Ahorro de S/ 10</li>
              <li>Delivery gratis programado</li>
            </ul>
            <a
              href="#"
              class="plan-button plan-10-button"
              @click.prevent="navigateWithLoading('/carta')"
            >
              Elegir Plan 10
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Ensaladas Section -->
    <section class="salads-section">
      <div class="container">
        <h2>Ensaladas Frescas y Personalizadas</h2>
        <p class="section-subtitle">
          Disfruta de nuestras ensaladas preparadas con ingredientes frescos y de temporada, o crea
          tu propia combinación única con nuestros ingredientes premium.
        </p>

        <div class="salads-content">
          <!-- Ensaladas Pre-hechas -->
          <div class="salads-card">
            <div class="card-icon">🥗</div>
            <h3>Ensaladas de la Casa</h3>
            <p>
              Descubre nuestras combinaciones especiales creadas por nuestros chefs. Cada ensalada
              está balanceada con los mejores ingredientes y aderezos artesanales.
            </p>
            <ul class="features-list">
              <li>✓ Ingredientes frescos diarios</li>
              <li>✓ Aderezos caseros</li>
              <li>✓ Opciones veganas y vegetarianas</li>
              <li>✓ Proteínas de calidad</li>
            </ul>
            <a
              href="#"
              class="section-button salads-menu-button"
              @click.prevent="navigateWithLoading('/ensaladas')"
            >
              Ver Carta de Ensaladas
            </a>
          </div>

          <!-- Personalización -->
          <div class="salads-card">
            <div class="card-icon">🎨</div>
            <h3>Crea tu Ensalada Perfecta</h3>
            <p>
              ¿Tienes gustos específicos? Personaliza tu ensalada eligiendo entre más de 20
              ingredientes, 5 tipos de proteína y 8 aderezos diferentes.
            </p>
            <ul class="features-list">
              <li>✓ Más de 20 ingredientes disponibles</li>
              <li>✓ 5 opciones de proteína</li>
              <li>✓ 8 aderezos artesanales</li>
              <li>✓ Tamaños personalizables</li>
            </ul>
            <a
              href="#"
              class="section-button custom-salad-button"
              @click.prevent="navigateWithLoading('/prepara-orden')"
            >
              Personalizar mi Ensalada
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu del Día Section -->
    <section class="daily-menu-section">
      <div class="container">
        <h2>Menú del Día</h2>
        <p class="section-subtitle">
          Cada día preparamos opciones diferentes y deliciosas para que disfrutes de una experiencia
          gastronómica única. Platos caseros, saludables y llenos de sabor.
        </p>

        <div class="daily-menu-content">
          <!-- Menú Único del Día -->
          <div class="menu-card-single">
            <div class="card-icon">🍽️</div>
            <h3>Carta del Día</h3>
            <p>
              Disfruta de nuestro menú ejecutivo con opciones balanceadas y nutritivas. Perfecto
              para el almuerzo, con ingredientes frescos y preparación casera.
            </p>
            <ul class="features-list">
              <li>✓ Platos diferentes cada día</li>
              <li>✓ Preparación casera</li>
              <li>✓ Ingredientes frescos</li>
              <li>✓ Opciones balanceadas</li>
              <li>✓ Precio accesible</li>
              <li>✓ Porciones generosas</li>
            </ul>
            <a
              href="#"
              class="section-button daily-menu-button"
              @click.prevent="navigateWithLoading('/carta')"
            >
              Ver Carta del Día
            </a>
          </div>
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
        <h2>Delivery Rápido y Efectivo</h2>

        <!-- Imagen de delivery arriba -->
        <div class="delivery-image">
          <img src="../../public/images/delivery.png" alt="Entrega a domicilio" />
        </div>

        <!-- Contenido de texto abajo -->
        <div class="delivery-content">
          <div class="delivery-info">
            <h3>Sin Salir de Casa</h3>
            <p>
              Disfruta de comida saludable y deliciosa sin la necesidad de salir de tu hogar u
              oficina. Nuestro servicio de delivery es rápido, confiable y diseñado para tu
              comodidad.
            </p>

            <!-- Beneficios del delivery -->
            <div class="delivery-benefits">
              <div class="benefit-item">
                <span class="benefit-icon">⚡</span>
                <div class="benefit-text">
                  <h4>Entrega Rápida</h4>
                  <p>Recibe tu pedido en tiempo récord</p>
                </div>
              </div>

              <div class="benefit-item">
                <span class="benefit-icon">🏠</span>
                <div class="benefit-text">
                  <h4>Comodidad Total</h4>
                  <p>Sin salir de tu hogar u oficina</p>
                </div>
              </div>

              <div class="benefit-item">
                <span class="benefit-icon">📱</span>
                <div class="benefit-text">
                  <h4>Fácil Comunicación</h4>
                  <p>Realiza tu pedido por WhatsApp o email</p>
                </div>
              </div>

              <div class="benefit-item">
                <span class="benefit-icon">🔒</span>
                <div class="benefit-text">
                  <h4>Seguro y Confiable</h4>
                  <p>Entrega garantizada y segura</p>
                </div>
              </div>
            </div>

            <!-- Información de contacto simple -->
            <div class="contact-info">
              <h4>Haz tu Pedido:</h4>
              <div class="contact-methods">
                <div class="contact-method">
                  <span class="method-icon">📱</span>
                  <span class="method-text"
                    >WhatsApp: +51 {{ RESTAURANT_CONFIG.socialMedia.whatsapp }}</span
                  >
                </div>
                <div class="contact-method">
                  <span class="method-icon">📧</span>
                  <span class="method-text">Email: {{ RESTAURANT_CONFIG.socialMedia.email }}</span>
                </div>
              </div>
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
  background-image: url('/website/images/salad-wallpaper.png');
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
  text-shadow: 1px 1px 2px rgba(201, 201, 201, 0.3);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cta-button {
  padding: 1.2rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;

  /* ✅ NUEVO: Tamaños uniformes pero no tan altos */
  min-height: 60px;
  width: 100%;
  max-width: 320px;

  /* ✅ NUEVO: Base translúcida por defecto */
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
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

/* ✅ NUEVOS: Estilos específicos para cada botón */
.menu-button {
  background: linear-gradient(
    135deg,
    rgba(102, 187, 106, 0.4),
    rgba(76, 175, 80, 0.4),
    rgba(46, 125, 50, 0.4)
  ) !important;
  color: white;
  border: 2px solid rgba(76, 175, 80, 0.3);
  box-shadow:
    0 8px 32px rgba(46, 125, 50, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.menu-button:hover {
  background: linear-gradient(
    135deg,
    rgba(102, 187, 106, 0.9),
    rgba(76, 175, 80, 0.9),
    rgba(46, 125, 50, 0.9)
  ) !important;
  transform: translateY(-4px);
  box-shadow:
    0 12px 48px rgba(46, 125, 50, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(76, 175, 80, 0.7);
}

.salads-button {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.4),
    rgba(69, 160, 73, 0.4),
    rgba(56, 142, 60, 0.4)
  ) !important;
  color: white;
  border: 2px solid rgba(76, 175, 80, 0.3);
  box-shadow:
    0 8px 32px rgba(76, 175, 80, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.salads-button:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.9),
    rgba(69, 160, 73, 0.9),
    rgba(56, 142, 60, 0.9)
  ) !important;
  transform: translateY(-4px);
  box-shadow:
    0 12px 48px rgba(76, 175, 80, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(76, 175, 80, 0.7);
}

.custom-button {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.4),
    rgba(67, 160, 71, 0.4),
    rgba(56, 142, 60, 0.4)
  ) !important;
  color: white;
  border: 2px solid rgba(76, 175, 80, 0.3);
  box-shadow:
    0 8px 32px rgba(76, 175, 80, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.custom-button:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.9),
    rgba(67, 160, 71, 0.9),
    rgba(56, 142, 60, 0.9)
  ) !important;
  transform: translateY(-4px);
  box-shadow:
    0 12px 48px rgba(76, 175, 80, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(76, 175, 80, 0.7);
}

.cta-button.primary {
  background: linear-gradient(135deg, #2e7d32, #4caf50, #66bb6a);
  color: white;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.cta-button.primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.6);
  background: linear-gradient(135deg, #1b5e20, #2e7d32, #4caf50);
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

/* Plans Section */
.plans-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 50%, #dcedc8 100%);
  position: relative;
  overflow: hidden;
}

.plans-section::before {
  content: '';
  position: absolute;
  top: -30%;
  left: -20%;
  width: 140%;
  height: 160%;
  background: radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 50%);
  transform: rotate(-15deg);
  z-index: 1;
}

.plans-section .container {
  position: relative;
  z-index: 2;
}

.plans-section h2 {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.plans-section .section-subtitle {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 5rem;
  max-width: 800px;
  margin: 0 auto;
}

.plan-card {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 20px;
  padding: 3rem 2rem;
  margin: 1rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.plan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #66bb6a 0%, #4caf50 50%, #2e7d32 100%);
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: rgba(76, 175, 80, 0.4);
}

.plan-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  z-index: 10;
}

.plan-icon {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.plan-name {
  font-size: 2.8rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plan-card h3 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plan-price {
  margin-bottom: 2.5rem;
  text-align: center;
}

.price-amount {
  display: block;
  font-size: 4rem;
  font-weight: 800;
  color: #2e7d32;
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.price-per {
  font-size: 1.4rem;
  color: #666;
  font-weight: 500;
  display: block;
}

.plan-price .currency {
  font-size: 1.5rem;
  font-weight: 500;
  vertical-align: top;
}

.plan-meals {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  font-weight: 500;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
  text-align: left;
}

.plan-features li {
  padding: 1rem 0;
  color: #555;
  font-size: 1.3rem;
  font-weight: 500;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  line-height: 1.4;
}

.plan-features li:last-child {
  border-bottom: none;
}

.plan-features li::before {
  content: '✓';
  color: #4caf50;
  font-weight: 800;
  margin-right: 1rem;
  font-size: 1.4rem;
}

.plan-button {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 6px 25px rgba(76, 175, 80, 0.3);
  width: 100%;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.plan-button:hover {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4);
}

.plan-options {
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 1rem;
}

.plan-options h4 {
  font-size: 2rem;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 2.5rem;
  text-align: center;
  line-height: 1.4;
}

.option-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.option-tag {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  color: #2e7d32;
  padding: 1.2rem 2rem;
  border-radius: 25px;
  font-size: 1.3rem;
  font-weight: 600;
  border: 2px solid rgba(46, 125, 50, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
}

.option-tag:hover {
  background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(46, 125, 50, 0.3);
  border-color: rgba(46, 125, 50, 0.4);
  color: #1b5e20;
}

@media (max-width: 768px) {
  .plans-section {
    padding: 5rem 0;
  }

  .plans-section h2 {
    font-size: 2.5rem;
  }

  .plans-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .plan-card {
    padding: 2rem 1.5rem;
  }

  .plan-card h3 {
    font-size: 2.2rem;
  }

  .price-amount {
    font-size: 3.2rem;
  }

  .price-per {
    font-size: 1.2rem;
  }

  .plan-features li {
    font-size: 1.1rem;
    padding: 0.8rem 0;
  }

  .plan-button {
    font-size: 1.2rem;
    padding: 1.3rem 2.5rem;
  }

  .plan-options {
    margin-top: 3rem;
    padding: 2rem 1.5rem;
  }

  .plan-options h4 {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  .option-tags {
    gap: 1rem;
  }

  .option-tag {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .plan-badge {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    top: -10px;
    right: 15px;
  }

  .plan-icon {
    font-size: 3.5rem;
  }

  .plan-card h3 {
    font-size: 1.8rem;
  }

  .price-amount {
    font-size: 2.8rem;
  }

  .plan-features li {
    font-size: 1rem;
  }

  .plan-options {
    padding: 1.5rem 1rem;
  }

  .plan-options h4 {
    font-size: 1.4rem;
  }

  .option-tags {
    flex-direction: column;
    gap: 0.8rem;
  }

  .option-tag {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
    width: 100%;
    justify-content: center;
  }
}

/* Ensaladas Section */
.salads-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 50%, #e0f2eb 100%);
  position: relative;
  overflow: hidden;
}

.salads-section::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 60%;
  height: 160%;
  background: radial-gradient(circle at center, rgba(76, 175, 80, 0.05) 0%, transparent 70%);
  animation: gentle-float 20s ease-in-out infinite;
}

@keyframes gentle-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
}

.salads-section .container {
  position: relative;
  z-index: 2;
}

.salads-section h2 {
  font-size: 3.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #4a7c59, #76b57c, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(76, 175, 80, 0.1);
}

.section-subtitle {
  font-size: 1.6rem;
  text-align: center;
  color: #5a6c57;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  opacity: 0.9;
}

.salads-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 4rem;
  align-items: start;
}

.salads-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 4rem;
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.salads-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #76b57c, #7a7c4a);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.salads-card:hover::before {
  transform: scaleX(1);
}

.salads-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 64px rgba(76, 175, 80, 0.15);
  background: rgba(255, 255, 255, 1);
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  display: inline-block;
  background: linear-gradient(135deg, #4caf50, #45a049, #228b22);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  transition: all 0.4s ease;
}

.salads-card:hover .card-icon {
  transform: scale(1.1);
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.4);
}

.salads-card h3 {
  font-size: 2.4rem;
  color: #2c5530;
  margin-bottom: 2rem;
  font-weight: 600;
}

.salads-card p {
  color: #6b7b68;
  line-height: 1.8;
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
  text-align: left;
}

.features-list li {
  color: #5a6c57;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  padding-left: 0;
  position: relative;
}

.section-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  color: white;
  min-height: 60px;
  border: 2px solid transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.section-button:hover::before {
  left: 100%;
}

.salads-menu-button {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.4),
    rgba(69, 160, 73, 0.4),
    rgba(56, 142, 60, 0.4)
  );
  border-color: rgba(76, 175, 80, 0.3);
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
}

.salads-menu-button:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.9),
    rgba(69, 160, 73, 0.9),
    rgba(56, 142, 60, 0.9)
  );
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.6);
  border-color: rgba(76, 175, 80, 0.7);
}

.custom-salad-button {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.4),
    rgba(67, 160, 71, 0.4),
    rgba(56, 142, 60, 0.4)
  );
  border-color: rgba(76, 175, 80, 0.3);
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
}

.custom-salad-button:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.9),
    rgba(67, 160, 71, 0.9),
    rgba(56, 142, 60, 0.9)
  );
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.6);
  border-color: rgba(76, 175, 80, 0.7);
}

/* Responsive Design para la sección de ensaladas */
@media (max-width: 768px) {
  .salads-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .salads-card {
    padding: 3rem;
  }

  .salads-section h2 {
    font-size: 3rem;
  }

  .section-subtitle {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .salads-section {
    padding: 6rem 0;
  }

  .salads-card {
    padding: 2.5rem;
  }

  .card-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .salads-card h3 {
    font-size: 2rem;
  }

  .section-button {
    padding: 1.3rem 2.5rem;
    font-size: 1.2rem;
  }

  .salads-section h2 {
    font-size: 2.5rem;
  }

  .section-subtitle {
    font-size: 1.2rem;
  }
}

/* Menu del Día Section */
.daily-menu-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 50%, #dcedc8 100%);
  position: relative;
  overflow: hidden;
}

.daily-menu-section::before {
  content: '';
  position: absolute;
  top: -20%;
  left: -20%;
  width: 40%;
  height: 140%;
  background: radial-gradient(circle at center, rgba(76, 175, 80, 0.05) 0%, transparent 70%);
  animation: gentle-float 25s ease-in-out infinite reverse;
}

.daily-menu-section .container {
  position: relative;
  z-index: 2;
}

.daily-menu-section h2 {
  font-size: 3.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1b5e20, #2e7d32, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(46, 125, 50, 0.1);
}

.daily-menu-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.menu-card-single {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 4rem;
  box-shadow: 0 12px 48px rgba(255, 138, 86, 0.1);
  border: 1px solid rgba(255, 138, 86, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 100%;
}

.menu-card-single::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #2e7d32, #1b5e20);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.menu-card-single:hover::before {
  transform: scaleX(1);
}

.menu-card-single:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 64px rgba(76, 175, 80, 0.15);
  background: rgba(255, 255, 255, 1);
}

.menu-card-single .card-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  display: inline-block;
  background: linear-gradient(135deg, #4caf50, #2e7d32, #1b5e20);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  transition: all 0.4s ease;
}

.menu-card-single:hover .card-icon {
  transform: scale(1.1);
  box-shadow: 0 12px 48px rgba(255, 138, 86, 0.4);
}

.menu-card-single h3 {
  font-size: 2.4rem;
  color: #2c5530;
  margin-bottom: 2rem;
  font-weight: 600;
}

.menu-card-single p {
  color: #6b7b68;
  line-height: 1.8;
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
}

.daily-menu-button {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.4),
    rgba(69, 160, 73, 0.4),
    rgba(56, 142, 60, 0.4)
  );
  border-color: rgba(76, 175, 80, 0.3);
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
}

.daily-menu-button:hover {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.9),
    rgba(69, 160, 73, 0.9),
    rgba(56, 142, 60, 0.9)
  );
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(76, 175, 80, 0.6);
  border-color: rgba(76, 175, 80, 0.7);
}

/* Responsive Design para la sección del menú */
@media (max-width: 768px) {
  .daily-menu-content {
    max-width: 100%;
  }

  .menu-card-single {
    padding: 3rem;
  }

  .daily-menu-section h2 {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .daily-menu-section {
    padding: 6rem 0;
  }

  .menu-card-single {
    padding: 2.5rem;
  }

  .menu-card-single .card-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .menu-card-single h3 {
    font-size: 2rem;
  }

  .daily-menu-section h2 {
    font-size: 2.5rem;
  }
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
  padding: 1rem 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

.contact-section h2 {
  font-size: 3.8rem;
  color: white;
  margin-bottom: 4rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.delivery-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
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

.delivery-image img {
  width: 100%;
  max-width: 350px;
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

.delivery-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.delivery-info h3 {
  font-size: 2.8rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delivery-info {
  text-align: center;
}

.delivery-info p {
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  padding: 2rem;
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

.delivery-benefits {
  margin: 2.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.benefit-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.benefit-text h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.benefit-text p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.4;
}

.contact-info {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-info h4 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.contact-method:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.method-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.method-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .delivery-image {
    margin-bottom: 2rem;
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

  .delivery-benefits {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .benefit-item {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .contact-methods {
    gap: 0.75rem;
  }

  .contact-method {
    justify-content: center;
    text-align: center;
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
    font-weight: 800; /* ✅ Mantener negrita en responsive */
    font-size: 1.3rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    /* ✅ Mantener fondo semi-opaco en responsive */
    backdrop-filter: blur(15px);
    text-align: center;
    min-height: 70px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
    background: linear-gradient(
      135deg,
      rgba(76, 175, 80, 0.85),
      rgba(69, 160, 73, 0.85),
      rgba(56, 142, 60, 0.85)
    ) !important;
    color: white;
    border: 2px solid rgba(76, 175, 80, 0.4);
    box-shadow:
      0 8px 32px rgba(76, 175, 80, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .menu-button:hover {
    background: linear-gradient(
      135deg,
      rgba(102, 187, 106, 0.95),
      rgba(76, 175, 80, 0.95),
      rgba(67, 160, 71, 0.95)
    ) !important;
    box-shadow: 0 15px 50px rgba(76, 175, 80, 0.6);
  }

  /* Botón Ver Carta de Ensaladas */
  .salads-button {
    background: linear-gradient(
      135deg,
      rgba(76, 175, 80, 0.85),
      rgba(69, 160, 73, 0.85),
      rgba(56, 142, 60, 0.85)
    ) !important;
    color: white;
    border: 2px solid rgba(76, 175, 80, 0.4);
    box-shadow:
      0 8px 32px rgba(76, 175, 80, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .salads-button:hover {
    background: linear-gradient(
      135deg,
      rgba(102, 187, 106, 0.95),
      rgba(76, 175, 80, 0.95),
      rgba(67, 160, 71, 0.95)
    ) !important;
    box-shadow: 0 15px 50px rgba(76, 175, 80, 0.6);
  }

  /* Botón Personalizar mi Ensalada */
  .custom-button {
    background: linear-gradient(
      135deg,
      rgba(76, 175, 80, 0.85),
      rgba(67, 160, 71, 0.85),
      rgba(56, 142, 60, 0.85)
    ) !important;
    color: white;
    border: 2px solid rgba(76, 175, 80, 0.4);
    box-shadow:
      0 8px 32px rgba(76, 175, 80, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .custom-button:hover {
    background: linear-gradient(
      135deg,
      rgba(76, 175, 80, 0.9),
      rgba(67, 160, 71, 0.9),
      rgba(56, 142, 60, 0.9)
    ) !important;
    transform: translateY(-4px);
    box-shadow:
      0 12px 48px rgba(76, 175, 80, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    border-color: rgba(76, 175, 80, 0.7);
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

/* Regla general para móviles: todas las secciones (excepto hero) vuelven a auto height */
@media (max-width: 768px) {
  .plans-section,
  .salads-section,
  .daily-menu-section,
  .custom-meals-section,
  .contact-section {
    height: auto !important;
    min-height: auto !important;
    padding: 3rem 0 !important;
  }

  .plans-section .container,
  .salads-section .container,
  .daily-menu-section .container,
  .custom-meals-section .container,
  .contact-section .container {
    height: auto !important;
    overflow-y: visible !important;
  }
}
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(108, 108, 108, 0.4); /* ← Overlay oscuro semi-transparente */
  pointer-events: none;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2; /* ← Asegura que el texto esté encima del overlay */
}

.hero-subtitle,
.hero-description {
  text-shadow:
    1px 1px 6px rgba(68, 68, 68, 0.7),
    0 0 15px rgba(201, 201, 201, 0.5);
}
</style>
