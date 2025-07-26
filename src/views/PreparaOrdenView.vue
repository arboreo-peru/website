<script setup lang="ts">
import { ref, computed } from 'vue'
import { SALAD_OPTIONS, RESTAURANT_CONFIG } from '../config/restaurant'

// Estado reactivo para las selecciones
const selectedBase = ref('')
const selectedProteina = ref('')
const selectedVinagreta = ref('')
const selectedIngredientes = ref<string[]>([])

// Estado para mostrar/ocultar el resumen
const showSummary = ref(true)

// Computed para validar la selección
const isValidSelection = computed(() => {
  return (
    selectedBase.value &&
    selectedProteina.value &&
    selectedVinagreta.value &&
    selectedIngredientes.value.length > 0
  )
})

// Computed para mostrar un resumen compacto cuando está colapsado
const compactSummary = computed(() => {
  const parts = []
  if (selectedBase.value) parts.push(selectedBase.value)
  if (selectedIngredientes.value.length > 0)
    parts.push(`${selectedIngredientes.value.length} ingredientes`)
  if (selectedProteina.value) parts.push(selectedProteina.value)
  if (selectedVinagreta.value) parts.push(selectedVinagreta.value)
  return parts.join(' | ')
})

// Función para toggle del resumen
const toggleSummary = () => {
  showSummary.value = !showSummary.value
}

// Función para manejar selección de ingredientes
const toggleIngrediente = (ingrediente: string) => {
  const index = selectedIngredientes.value.indexOf(ingrediente)
  if (index > -1) {
    selectedIngredientes.value.splice(index, 1)
  } else if (selectedIngredientes.value.length < 4) {
    selectedIngredientes.value.push(ingrediente)
  }
}

// Función para enviar pedido por WhatsApp
const enviarPedido = () => {
  if (!isValidSelection.value) return

  const mensaje = `¡Hola! Quiero hacer un pedido de ${RESTAURANT_CONFIG.name}:

🥗 *Mi Ensalada Personalizada*
Base: ${selectedBase.value}
Proteína: ${selectedProteina.value}
Vinagreta: ${selectedVinagreta.value}
Ingredientes: ${selectedIngredientes.value.join(', ')}

💰 Total: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.price}

¡Gracias!`

  const url = `https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank')
}

// Función para resetear selección
const resetearSeleccion = () => {
  selectedBase.value = ''
  selectedProteina.value = ''
  selectedVinagreta.value = ''
  selectedIngredientes.value = []
}
</script>

<template>
  <div class="prepara-orden-container">
    <div class="header-section">
      <h1>🥗 Prepara tu Ensalada</h1>
      <p class="subtitle">Crea tu ensalada perfecta eligiendo una opción de cada categoría</p>
      <div class="price-display">
        <span class="price">{{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.price }}</span>
        <span class="price-label">Precio fijo</span>
      </div>
    </div>

    <div class="selection-container">
      <!-- Base Selection -->
      <section class="category-section">
        <h2 class="category-title">
          <span class="category-icon">🥬</span>
          Elige tu Base
          <span class="required">*</span>
        </h2>
        <div class="options-grid">
          <label
            v-for="base in SALAD_OPTIONS.bases"
            :key="base"
            class="option-card"
            :class="{ active: selectedBase === base }"
          >
            <input type="radio" :value="base" v-model="selectedBase" class="option-input" />
            <span class="option-text">{{ base }}</span>
          </label>
        </div>
      </section>

      <!-- Ingredientes Selection -->
      <section class="category-section">
        <h2 class="category-title">
          <span class="category-icon">🥕</span>
          Elige tus Ingredientes
          <span class="required">*</span>
          <span class="counter">({{ selectedIngredientes.length }}/4)</span>
        </h2>
        <div class="options-grid ingredientes-grid">
          <label
            v-for="ingrediente in SALAD_OPTIONS.ingredientes"
            :key="ingrediente"
            class="option-card"
            :class="{
              active: selectedIngredientes.includes(ingrediente),
              disabled:
                !selectedIngredientes.includes(ingrediente) && selectedIngredientes.length >= 4,
            }"
          >
            <input
              type="checkbox"
              :value="ingrediente"
              :disabled="
                !selectedIngredientes.includes(ingrediente) && selectedIngredientes.length >= 4
              "
              @change="toggleIngrediente(ingrediente)"
              class="option-input"
            />
            <span class="option-text">{{ ingrediente }}</span>
          </label>
        </div>
      </section>

      <!-- Proteína Selection -->
      <section class="category-section">
        <h2 class="category-title">
          <span class="category-icon">🍗</span>
          Elige tu Proteína
          <span class="required">*</span>
        </h2>
        <div class="options-grid">
          <label
            v-for="proteina in SALAD_OPTIONS.proteinas"
            :key="proteina"
            class="option-card"
            :class="{ active: selectedProteina === proteina }"
          >
            <input type="radio" :value="proteina" v-model="selectedProteina" class="option-input" />
            <span class="option-text">{{ proteina }}</span>
          </label>
        </div>
      </section>

      <!-- Vinagreta Selection -->
      <section class="category-section">
        <h2 class="category-title">
          <span class="category-icon">🫒</span>
          Elige tu Vinagreta
          <span class="required">*</span>
        </h2>
        <div class="options-grid">
          <label
            v-for="vinagreta in SALAD_OPTIONS.vinagretas"
            :key="vinagreta"
            class="option-card"
            :class="{ active: selectedVinagreta === vinagreta }"
          >
            <input
              type="radio"
              :value="vinagreta"
              v-model="selectedVinagreta"
              class="option-input"
            />
            <span class="option-text">{{ vinagreta }}</span>
          </label>
        </div>
      </section>
    </div>

    <!-- Resumen y Acciones -->
    <div class="summary-section">
      <div class="summary-card" :class="{ collapsed: !showSummary }">
        <!-- Header del resumen con botón toggle -->
        <div class="summary-header" @click="toggleSummary">
          <h3>📋 Resumen de tu Ensalada</h3>
          <button class="toggle-btn" :class="{ rotated: showSummary }" type="button">
            {{ showSummary ? '▼' : '▽' }}
          </button>
        </div>

        <!-- Resumen compacto cuando está colapsado -->
        <div v-if="!showSummary && compactSummary" class="compact-summary">
          <p>{{ compactSummary }}</p>
          <span class="compact-price"
            >{{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.price }}</span
          >
        </div>

        <!-- Resumen completo cuando está expandido -->
        <div v-if="showSummary" class="summary-content">
          <div v-if="selectedBase" class="summary-item">
            <strong>Base:</strong> {{ selectedBase }}
          </div>
          <div v-if="selectedIngredientes.length > 0" class="summary-item">
            <strong>Ingredientes:</strong> {{ selectedIngredientes.join(', ') }}
          </div>
          <div v-if="selectedProteina" class="summary-item">
            <strong>Proteína:</strong> {{ selectedProteina }}
          </div>
          <div v-if="selectedVinagreta" class="summary-item">
            <strong>Vinagreta:</strong> {{ selectedVinagreta }}
          </div>
          <div class="summary-total">
            <strong>Total: {{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.price }}</strong>
          </div>
        </div>

        <!-- Botones siempre visibles -->
        <div class="action-buttons">
          <button
            @click="resetearSeleccion"
            class="btn btn-secondary"
            :disabled="
              !selectedBase &&
              !selectedProteina &&
              !selectedVinagreta &&
              selectedIngredientes.length === 0
            "
          >
            🔄 Resetear
          </button>
          <button @click="enviarPedido" class="btn btn-primary" :disabled="!isValidSelection">
            📱 Enviar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prepara-orden-container {
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
}

.price-display {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.price {
  font-size: 2rem;
  font-weight: bold;
}

.price-label {
  font-size: 1rem;
  opacity: 0.9;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
}

.category-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #4caf50;
  padding-bottom: 0.5rem;
}

.category-icon {
  font-size: 2rem;
}

.required {
  color: #e74c3c;
  font-size: 1rem;
}

.counter {
  color: #4caf50;
  font-size: 1rem;
  font-weight: normal;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.ingredientes-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.option-card {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
  position: relative;
}

.option-card:hover:not(.disabled) {
  border-color: #4caf50;
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.option-card.active {
  border-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
  color: #155724;
  font-weight: 600;
}

.option-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f8f9fa;
}

.option-input {
  margin-right: 1rem;
  transform: scale(1.2);
  accent-color: #4caf50;
}

.option-text {
  flex: 1;
  font-size: 1rem;
}

.summary-section {
  position: sticky;
  bottom: 1rem;
  z-index: 100;
}

.summary-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border: 2px solid #4caf50;
  transition: all 0.3s ease;
  overflow: hidden;
}

.summary-card.collapsed {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  transition: background 0.3s ease;
}

.summary-header:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
}

.summary-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.3rem;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #4caf50;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
}

.toggle-btn:hover {
  background: rgba(76, 175, 80, 0.1);
}

.toggle-btn.rotated {
  transform: rotate(180deg);
}

.compact-summary {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.compact-summary p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  flex: 1;
}

.compact-price {
  color: #4caf50;
  font-weight: bold;
  font-size: 1.1rem;
}

.summary-content {
  padding: 1rem 1.5rem;
  margin-bottom: 0;
}

.summary-item {
  padding: 0.4rem 0;
  border-bottom: 1px solid #f1f1f1;
  line-height: 1.4;
  font-size: 0.95rem;
}

.summary-item:last-of-type {
  border-bottom: none;
}

.summary-total {
  padding: 0.8rem 0;
  font-size: 1.1rem;
  color: #4caf50;
  text-align: center;
  border-top: 1px solid #4caf50;
  margin-top: 0.8rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
  box-shadow: 0 3px 12px rgba(37, 211, 102, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 18px rgba(37, 211, 102, 0.4);
}

.btn-secondary {
  background: #6c757d;
  color: white;
  box-shadow: 0 3px 12px rgba(108, 117, 125, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-section h1 {
    font-size: 2.5rem;
  }

  .options-grid,
  .ingredientes-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    padding: 1rem;
  }

  .btn {
    width: 100%;
  }

  .summary-header h3 {
    font-size: 1.1rem;
  }

  .compact-summary {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .category-section {
    padding: 1.5rem;
  }

  .summary-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-section h1 {
    font-size: 2rem;
  }

  .price {
    font-size: 1.5rem;
  }

  .category-title {
    font-size: 1.5rem;
    flex-wrap: wrap;
  }

  .option-card {
    padding: 0.8rem 1rem;
  }
}
</style>
