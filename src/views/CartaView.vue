<script setup lang="ts">
import { MENU_ITEMS, RESTAURANT_CONFIG } from '../config/restaurant'

// Función para enviar pedido por email
const enviarPedidoCarta = (item: (typeof MENU_ITEMS)[0]) => {
  const subject = `Pedido - ${item.name}`
  const body = `¡Hola! Quiero hacer un pedido de ${RESTAURANT_CONFIG.name}:

🥗 ${item.name}
${item.description}

💰 Total: ${RESTAURANT_CONFIG.currency}${item.price}

¡Gracias!`

  const mailtoUrl = `mailto:${RESTAURANT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoUrl
}
</script>

<template>
  <div class="carta-container">
    <div class="header-section">
      <h1>📋 Nuestra Carta</h1>
      <p class="subtitle">
        Descubre nuestras ensaladas especiales, cada una con una combinación única de sabores
      </p>
      <div class="price-info">
        <span class="price-text"
          >Todas nuestras ensaladas: {{ RESTAURANT_CONFIG.currency
          }}{{ RESTAURANT_CONFIG.price }}</span
        >
      </div>
    </div>

    <div class="menu-grid">
      <div v-for="item in MENU_ITEMS" :key="item.name" class="menu-card">
        <div class="menu-header">
          <h3 class="menu-title">{{ item.name }}</h3>
          <div class="menu-price">{{ RESTAURANT_CONFIG.currency }}{{ item.price }}</div>
        </div>

        <p class="menu-description">{{ item.description }}</p>

        <div class="menu-actions">
          <button @click="enviarPedidoCarta(item)" class="order-btn">📧 Pedir por Email</button>
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="info-section">
      <div class="info-card">
        <h2>💚 ¿Prefieres personalizar tu ensalada?</h2>
        <p>
          Si ninguna de nuestras opciones te convence completamente, puedes crear tu ensalada
          perfecta con nuestro sistema personalizado.
        </p>
        <RouterLink to="/prepara-orden" class="custom-order-btn">
          🎨 Personalizar mi Ensalada
        </RouterLink>
      </div>
    </div>

    <!-- Información nutricional -->
    <div class="nutrition-section">
      <h2>🌱 Información Nutricional</h2>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <div class="nutrition-icon">🥬</div>
          <h4>Ingredientes Frescos</h4>
          <p>Seleccionamos vegetales del día para garantizar frescura y calidad nutricional</p>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-icon">🍗</div>
          <h4>Proteínas de Calidad</h4>
          <p>Pollo fresco, atún en conserva y opciones vegetarianas ricas en proteínas</p>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-icon">🫒</div>
          <h4>Vinagretas Artesanales</h4>
          <p>Preparadas diariamente con ingredientes naturales y aceites de calidad</p>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-icon">⚡</div>
          <h4>Energía Balanceada</h4>
          <p>Combinaciones perfectas para mantenerte lleno de energía todo el día</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 50%, #e0f2eb 100%);
  position: relative;
}

.carta-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 70% 30%, rgba(34, 139, 34, 0.06) 0%, transparent 50%);
  animation: gentle-rotate 80s linear infinite;
  pointer-events: none;
}

@keyframes gentle-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.header-section {
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
}

.header-section::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #2c5530, transparent);
  border-radius: 2px;
}

.header-section h1 {
  font-size: 4.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59, #228b22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(44, 85, 48, 0.1);
}

.subtitle {
  font-size: 1.8rem;
  color: #5a6c57;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-weight: 400;
}

.price-info {
  display: inline-block;
  background: linear-gradient(135deg, #ff8a56, #ff6b35, #e55a2b);
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.6rem;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.price-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.price-info:hover::before {
  left: 100%;
}

.price-info:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(255, 107, 53, 0.6);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
}

.menu-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 12px 48px rgba(44, 85, 48, 0.12);
  border: 1px solid rgba(34, 139, 34, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.menu-card::before {
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

.menu-card:hover::before {
  transform: scaleX(1);
}

.menu-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 64px rgba(44, 85, 48, 0.2);
  background: rgba(255, 255, 255, 0.95);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.menu-title {
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.menu-price {
  background: linear-gradient(135deg, #4caf50, #45a049, #228b22);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.3rem;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.menu-card:hover .menu-price {
  transform: scale(1.05);
  box-shadow: 0 6px 24px rgba(76, 175, 80, 0.4);
}

.menu-description {
  color: #6b7b68;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-size: 1.4rem;
  font-weight: 400;
}

.menu-actions {
  text-align: center;
}

.order-btn {
  background: linear-gradient(135deg, #ff8a56, #ff6b35, #e55a2b);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 280px;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.order-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.order-btn:hover::before {
  left: 100%;
}

.order-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(255, 107, 53, 0.6);
  background: linear-gradient(135deg, #ff9966, #ff8a56, #ff6b35);
}

.info-section {
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
}

.info-card {
  background: linear-gradient(135deg, #2c5530 0%, #3e6b42 50%, #4a7c59 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 16px 64px rgba(44, 85, 48, 0.2);
  position: relative;
  overflow: hidden;
}

.info-card::before {
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

.info-card > * {
  position: relative;
  z-index: 2;
}

.info-card h2 {
  font-size: 2.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.info-card p {
  font-size: 1.6rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.9);
}

.custom-order-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #2c5530;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.custom-order-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(44, 85, 48, 0.1), transparent);
  transition: left 0.6s;
}

.custom-order-btn:hover::before {
  left: 100%;
}

.custom-order-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 1);
  color: #228b22;
}

.nutrition-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 4rem 3rem;
  box-shadow: 0 12px 48px rgba(44, 85, 48, 0.12);
  border: 1px solid rgba(34, 139, 34, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.nutrition-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2c5530, #4a7c59, #228b22);
}

.nutrition-section h2 {
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59, #228b22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(44, 85, 48, 0.1);
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
}

.nutrition-item {
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 250, 0.9) 100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(44, 85, 48, 0.1);
  position: relative;
  overflow: hidden;
}

.nutrition-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(34, 139, 34, 0.02), rgba(76, 175, 80, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nutrition-item:hover::before {
  opacity: 1;
}

.nutrition-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(44, 85, 48, 0.15);
  border-color: rgba(76, 175, 80, 0.3);
}

.nutrition-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  filter: drop-shadow(0 4px 8px rgba(44, 85, 48, 0.2));
  transition: transform 0.3s ease;
}

.nutrition-item:hover .nutrition-icon {
  transform: scale(1.1);
}

.nutrition-item h4 {
  color: #2c5530;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.nutrition-item p {
  color: #6b7b68;
  line-height: 1.7;
  font-size: 1.3rem;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 768px) {
  .carta-container {
    padding: 1.5rem;
  }

  .header-section h1 {
    font-size: 3.5rem;
  }

  .subtitle {
    font-size: 1.6rem;
  }

  .price-info {
    font-size: 1.4rem;
    padding: 1.2rem 2.5rem;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .menu-card {
    padding: 2.5rem;
  }

  .menu-header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .menu-title {
    font-size: 1.8rem;
  }

  .menu-price {
    font-size: 1.2rem;
    padding: 0.7rem 1.3rem;
  }

  .menu-description {
    font-size: 1.3rem;
  }

  .order-btn {
    font-size: 1.3rem;
    padding: 1.3rem 2.5rem;
  }

  .nutrition-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .info-card {
    padding: 3rem 2rem;
  }

  .info-card h2 {
    font-size: 2.4rem;
  }

  .nutrition-section {
    padding: 3rem 2rem;
  }

  .nutrition-section h2 {
    font-size: 2.8rem;
  }

  .custom-order-btn {
    font-size: 1.3rem;
    padding: 1.3rem 2.5rem;
  }
}

@media (max-width: 480px) {
  .header-section h1 {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .info-card h2,
  .nutrition-section h2 {
    font-size: 2.2rem;
  }

  .menu-card {
    padding: 2rem;
  }

  .menu-title {
    font-size: 1.6rem;
  }

  .menu-description {
    font-size: 1.2rem;
  }

  .order-btn {
    font-size: 1.2rem;
    padding: 1.2rem 2rem;
  }

  .nutrition-item {
    padding: 2.5rem 1.5rem;
  }

  .nutrition-item h4 {
    font-size: 1.6rem;
  }

  .nutrition-item p {
    font-size: 1.2rem;
  }

  .custom-order-btn {
    font-size: 1.2rem;
    padding: 1.2rem 2rem;
  }
}
</style>
