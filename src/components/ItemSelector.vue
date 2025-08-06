<template>
  <div v-if="isVisible" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🍽️ Configurar Pedido</h2>
        <button @click="cerrarModal" class="close-btn">✕</button>
      </div>

      <!-- Información del item -->
      <div class="item-info">
        <h3>{{ selectedItem?.name }}</h3>
        <p v-if="selectedItem?.description" class="item-description">
          {{ selectedItem.description }}
        </p>
        <p class="item-price">{{ RESTAURANT_CONFIG.currency }}{{ selectedItem?.price }}</p>
      </div>

      <!-- Formulario de configuración -->
      <div class="config-form">
        <!-- Selección de entrada (solo para menús) -->
        <div v-if="selectedItem?.includeEntrada" class="form-section">
          <h4>🍲 Selecciona tu entrada</h4>
          <div class="entrada-options">
            <label v-for="entrada in ENTRADA_OPTIONS" :key="entrada" class="option-item">
              <input v-model="selectedEntrada" type="radio" :value="entrada" required />
              <span class="option-label">{{ entrada }}</span>
            </label>
          </div>
        </div>

        <!-- Opciones adicionales -->
        <div class="form-section">
          <h4>🍽️ Opciones adicionales</h4>
          <div class="additional-options">
            <label class="option-checkbox">
              <input v-model="includeJuice" type="checkbox" />
              <span class="checkbox-label">
                🥤 Agregar refresco
                <small>+{{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.juicePrice }}</small>
              </span>
            </label>

            <label class="option-checkbox">
              <input v-model="includeCubiertos" type="checkbox" />
              <span class="checkbox-label">
                🍴 Incluir cubiertos
                <small>Sin costo adicional</small>
              </span>
            </label>
          </div>
        </div>

        <!-- Precio total -->
        <div class="price-summary">
          <strong>Total: {{ RESTAURANT_CONFIG.currency }}{{ totalPrice }}</strong>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="cerrarModal" class="btn-cancel">Cancelar</button>
          <button
            type="button"
            @click="agregarAlCarrito"
            class="btn-add"
            :disabled="!isValid"
            :class="{ 'btn-disabled': !isValid }"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCart } from '../composables/useCart'
import { RESTAURANT_CONFIG, ENTRADA_OPTIONS } from '../config/restaurant'

interface SelectedItem {
  name: string
  price: number
  description?: string
  includeEntrada?: boolean
  isCustomSalad?: boolean
  customIngredients?: string[]
  customDressing?: string
  customDetails?: {
    base?: string
    proteina?: string
    vinagreta?: string
    ingredientes?: string[]
    comentarios?: string
  }
}

const props = defineProps<{
  isVisible: boolean
  selectedItem: SelectedItem | null
}>()

const emit = defineEmits<{
  close: []
  added: []
}>()

const { addToCart } = useCart()

// Estado del formulario
const selectedEntrada = ref('')
const includeJuice = ref(false)
const includeCubiertos = ref(true)

// Computed para validar el formulario
const isValid = computed(() => {
  // Si el item requiere entrada, debe estar seleccionada
  if (props.selectedItem?.includeEntrada) {
    return selectedEntrada.value !== ''
  }
  return true
})

// Computed para calcular el precio total
const totalPrice = computed(() => {
  if (!props.selectedItem) return 0
  const basePrice = props.selectedItem.price
  const juicePrice = includeJuice.value ? RESTAURANT_CONFIG.juicePrice : 0
  return basePrice + juicePrice
})

// Limpiar formulario cuando se abre/cierra
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      // Reset form when opening
      selectedEntrada.value = ''
      includeJuice.value = false
      includeCubiertos.value = true
    }
  },
)

const cerrarModal = () => {
  emit('close')
}

const agregarAlCarrito = () => {
  if (!props.selectedItem || !isValid.value) return

  const cartItem = {
    name: props.selectedItem.name,
    price: props.selectedItem.price,
    description: props.selectedItem.description,
    includeEntrada: props.selectedItem.includeEntrada,
    selectedEntrada: selectedEntrada.value,
    includeJuice: includeJuice.value,
    includeCubiertos: includeCubiertos.value,
    isCustomSalad: props.selectedItem.isCustomSalad,
    customIngredients: props.selectedItem.customIngredients,
    customDressing: props.selectedItem.customDressing,
    customDetails: props.selectedItem.customDetails,
  }

  addToCart(cartItem)
  emit('added')
  cerrarModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem 1rem;
  border-bottom: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 100%);
  border-radius: 24px 24px 0 0;
}

.modal-header h2 {
  margin: 0;
  color: #2c5530;
  font-size: 2rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
  transform: scale(1.1);
}

.item-info {
  padding: 2rem 2.5rem 1rem;
  background: #f8fffe;
  border-bottom: 1px solid #e0e0e0;
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c5530;
  font-size: 1.8rem;
  font-weight: 600;
}

.item-description {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 1.3rem;
  line-height: 1.5;
}

.item-price {
  margin: 0;
  color: #228b22;
  font-size: 1.6rem;
  font-weight: 700;
}

.config-form {
  padding: 2rem 2.5rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h4 {
  margin: 0 0 1.5rem 0;
  color: #2c5530;
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f5e8;
}

.entrada-options {
  display: grid;
  gap: 0.8rem;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.option-item:hover {
  border-color: #4a7c59;
  background: #f8fffe;
}

.option-item input[type='radio'] {
  margin-right: 1rem;
  transform: scale(1.2);
}

.option-item input[type='radio']:checked + .option-label {
  color: #2c5530;
  font-weight: 600;
}

.option-item:has(input[type='radio']:checked) {
  border-color: #4a7c59;
  background: #f8fffe;
}

.option-label {
  font-size: 1.3rem;
  color: #333;
}

.additional-options {
  display: grid;
  gap: 1rem;
}

.option-checkbox {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.option-checkbox:hover {
  border-color: #4a7c59;
  background: #f8fffe;
}

.option-checkbox input[type='checkbox'] {
  margin-right: 1rem;
  transform: scale(1.2);
}

.option-checkbox input[type='checkbox']:checked + .checkbox-label {
  color: #2c5530;
  font-weight: 600;
}

.option-checkbox:has(input[type='checkbox']:checked) {
  border-color: #4a7c59;
  background: #f8fffe;
}

.checkbox-label {
  color: #4a5a4c;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1.3rem;
}

.checkbox-label small {
  font-size: 1.1rem;
  color: #666;
  font-weight: 400;
}

.price-summary {
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  color: white;
  border-radius: 12px;
  font-size: 1.6rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.btn-cancel,
.btn-add {
  flex: 1;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #f0f0f0;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
  color: #333;
}

.btn-add {
  background: linear-gradient(135deg, #4a7c59, #2c5530);
  color: white;
  box-shadow: 0 4px 16px rgba(74, 124, 89, 0.3);
}

.btn-add:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #5c8a6a, #4a7c59);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(74, 124, 89, 0.4);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #ccc !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-header,
  .item-info,
  .config-form {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .modal-header,
  .item-info,
  .config-form {
    padding: 1rem;
  }
}
</style>
