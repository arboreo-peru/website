<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MENU_OPTIONS, RESTAURANT_CONFIG } from '../config/restaurant'
import { useLoading } from '../composables/useLoading'
import ItemSelector from '../components/ItemSelector.vue'

// Estado para controlar el modal de selección de item
const showItemSelector = ref(false)
const selectedItem = ref<any>(null)

// Router y loading
const router = useRouter()
const { showLoading } = useLoading()

// Función para navegación con loading
const navigateWithLoading = (path: string) => {
  if (router.currentRoute.value.path !== path) {
    showLoading(1000)
  }
  router.push(path)
}

// Función para abrir el selector de item
const seleccionarItem = (item: any) => {
  selectedItem.value = {
    name: item.name,
    price: item.price,
    description: item.description,
    includeEntrada: item.includeEntrada,
  }
  showItemSelector.value = true
}

// Función para cerrar el modal
const cerrarItemSelector = () => {
  showItemSelector.value = false
  selectedItem.value = null
}

// Función cuando se agrega al carrito
const onItemAdded = () => {
  console.log('Item agregado al carrito!')
}
</script>

<template>
  <div class="carta-container">
    <div class="header-section">
      <h1>🍽️ Nuestra Carta</h1>
      <p class="subtitle">
        Descubre nuestros platos tradicionales peruanos, preparados con ingredientes frescos y
        recetas auténticas
      </p>
      <div class="price-info">
        <span class="price-text"
          >Platos desde {{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.baseMenuPrice }}</span
        >
      </div>
    </div>

    <div class="menu-grid">
      <div v-for="item in MENU_OPTIONS" :key="item.name" class="menu-card">
        <div class="menu-header">
          <h3 class="menu-title">{{ item.name }}</h3>
          <div class="menu-price">{{ RESTAURANT_CONFIG.currency }}{{ item.price }}</div>
        </div>

        <p class="menu-description">{{ item.description }}</p>

        <div class="menu-actions">
          <button @click="seleccionarItem(item)" class="order-btn">🛒 Agregar al carrito</button>
        </div>
      </div>
    </div>

    <!-- Modal de selección de item -->
    <ItemSelector
      :is-visible="showItemSelector"
      :selected-item="selectedItem"
      @close="cerrarItemSelector"
      @added="onItemAdded"
    />

    <!-- Información adicional -->
    <div class="info-section">
      <div class="info-card">
        <h2>🥗 ¿También quieres ensaladas?</h2>
        <p>
          Además de nuestros platos tradicionales, tenemos una increíble variedad de ensaladas
          frescas y saludables.
        </p>
        <a href="#" class="custom-order-btn" @click.prevent="navigateWithLoading('/ensaladas')">
          🥬 Ver Nuestras Ensaladas
        </a>
      </div>
    </div>

    <!-- Información sobre ingredientes -->
    <div class="nutrition-section">
      <h2>🏆 Calidad y Tradición</h2>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <div class="nutrition-icon">🇵🇪</div>
          <h4>Recetas Auténticas</h4>
          <p>
            Preparamos cada plato siguiendo recetas tradicionales peruanas transmitidas de
            generación en generación
          </p>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-icon">🥘</div>
          <h4>Ingredientes Frescos</h4>
          <p>
            Seleccionamos los mejores ingredientes del mercado para garantizar sabor y calidad en
            cada plato
          </p>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-icon">👨‍🍳</div>
          <h4>Preparación Casera</h4>
          <p>
            Cada plato es preparado al momento con el cuidado y amor de la cocina casera peruana
          </p>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-icon">⏰</div>
          <h4>Servicio Rápido</h4>
          <p>Comida fresca y deliciosa lista en tiempo récord para que disfrutes sin esperas</p>
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
  overflow: hidden;
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
  font-size: 4rem;
  color: #2c5530;
  margin-bottom: 2rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(44, 85, 48, 0.1);
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.price-info {
  display: inline-block;
  background: linear-gradient(135deg, #4a7c59, #2c5530);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.3rem;
  box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.price-info:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(74, 124, 89, 0.4);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
}

.menu-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
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
  background: linear-gradient(90deg, #4a7c59, #2c5530, #4a7c59);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.menu-card:hover::before {
  transform: scaleX(1);
}

.menu-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-color: #4a7c59;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.menu-title {
  font-size: 1.8rem;
  color: #2c5530;
  margin: 0;
  font-weight: 700;
  flex: 1;
  min-width: 200px;
}

.menu-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: #228b22;
  background: #e8f5e8;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  min-width: fit-content;
}

.menu-description {
  font-size: 1.3rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: justify;
}

.menu-actions {
  text-align: center;
}

.order-btn {
  background: linear-gradient(135deg, #4a7c59, #2c5530);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 25px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(74, 124, 89, 0.3);
  position: relative;
  overflow: hidden;
}

.order-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.order-btn:hover::before {
  left: 100%;
}

.order-btn:hover {
  background: linear-gradient(135deg, #5c8a6a, #4a7c59);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(74, 124, 89, 0.4);
}

.order-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(74, 124, 89, 0.3);
}

.info-section {
  background: linear-gradient(135deg, #ffffff, #f8fffe);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8f5e8;
  position: relative;
  z-index: 2;
}

.info-card h2 {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
}

.info-card p {
  font-size: 1.4rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.custom-order-btn {
  display: inline-block;
  background: linear-gradient(135deg, #228b22, #4a7c59);
  color: white;
  text-decoration: none;
  padding: 1.5rem 3rem;
  border-radius: 25px;
  font-size: 1.4rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(34, 139, 34, 0.3);
  margin: 0 auto;
  display: block;
  width: fit-content;
}

.custom-order-btn:hover {
  background: linear-gradient(135deg, #32cd32, #228b22);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(34, 139, 34, 0.4);
}

.nutrition-section {
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  border-radius: 20px;
  padding: 4rem 3rem;
  color: white;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.nutrition-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.nutrition-section h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;
  z-index: 3;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 3;
}

.nutrition-item {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.nutrition-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.nutrition-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.nutrition-item h4 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #ffffff;
}

.nutrition-item p {
  font-size: 1.2rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .carta-container {
    padding: 1rem;
  }

  .header-section h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.3rem;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .menu-card {
    padding: 2rem;
  }

  .menu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .menu-title {
    font-size: 1.6rem;
    min-width: auto;
  }

  .menu-price {
    font-size: 1.4rem;
    align-self: flex-end;
  }

  .order-btn {
    width: 100%;
    padding: 1rem 2rem;
    font-size: 1.3rem;
  }

  .info-section,
  .nutrition-section {
    padding: 2rem 1.5rem;
  }

  .nutrition-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .nutrition-section h2 {
    font-size: 2.5rem;
  }

  .info-card h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .header-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .menu-card {
    padding: 1.5rem;
  }

  .menu-title {
    font-size: 1.4rem;
  }

  .menu-description {
    font-size: 1.2rem;
  }

  .order-btn {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }

  .price-info {
    font-size: 1.1rem;
    padding: 0.8rem 1.5rem;
  }

  .nutrition-section h2 {
    font-size: 2rem;
  }

  .info-card h2 {
    font-size: 1.8rem;
  }
}
</style>
