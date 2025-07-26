<script setup lang="ts">
import { MENU_ITEMS, RESTAURANT_CONFIG } from '../config/restaurant'

// Función para enviar pedido por WhatsApp
const enviarPedidoCarta = (item: (typeof MENU_ITEMS)[0]) => {
  const mensaje = `¡Hola! Quiero hacer un pedido de ${RESTAURANT_CONFIG.name}:

🥗 *${item.name}*
${item.description}

💰 Total: ${RESTAURANT_CONFIG.currency}${item.price}

¡Gracias!`

  const url = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank')
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
          <button @click="enviarPedidoCarta(item)" class="order-btn">📱 Pedir por WhatsApp</button>
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
  padding: 0;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.price-info {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.menu-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-color: #4caf50;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.menu-title {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  flex: 1;
}

.menu-price {
  background: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  white-space: nowrap;
}

.menu-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.menu-actions {
  text-align: center;
}

.order-btn {
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  width: 100%;
  max-width: 250px;
}

.order-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.info-section {
  margin-bottom: 4rem;
}

.info-card {
  background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.info-card p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.custom-order-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #4caf50;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.custom-order-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: #f8f9fa;
}

.nutrition-section {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.nutrition-section h2 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.nutrition-item {
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  transition: transform 0.3s ease;
}

.nutrition-item:hover {
  transform: translateY(-5px);
}

.nutrition-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.nutrition-item h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.nutrition-item p {
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-section h1 {
    font-size: 2.5rem;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .menu-card {
    padding: 1.5rem;
  }

  .menu-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .menu-title {
    font-size: 1.3rem;
  }

  .nutrition-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-card {
    padding: 2rem 1.5rem;
  }

  .nutrition-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-section h1 {
    font-size: 2rem;
  }

  .info-card h2,
  .nutrition-section h2 {
    font-size: 1.8rem;
  }

  .menu-card {
    padding: 1rem;
  }

  .menu-description {
    font-size: 0.9rem;
  }

  .order-btn {
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }
}
</style>
