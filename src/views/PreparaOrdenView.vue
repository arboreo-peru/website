<script setup lang="ts">
import { ref, computed } from 'vue'
import { SALAD_INGREDIENTS, RESTAURANT_CONFIG, getCustomSaladPrice } from '../config/restaurant'
import { useCart } from '../composables/useCart'
import ItemSelector from '../components/ItemSelector.vue'

// ✅ NUEVO: Usar el carrito
const { addToCart } = useCart()

// Estado reactivo para las selecciones
const selectedBase = ref('')
const selectedIngredientes = ref<string[]>([])
const selectedProteina = ref('')
const selectedVinagreta = ref('')

// ✅ NUEVO: Estado para comentarios de la ensalada personalizada
const comentarios = ref('')

// ✅ NUEVO: Estado para controlar el modal de selección de item
const showItemSelector = ref(false)
const selectedCustomSalad = ref<any>(null)

// ✅ ACTUALIZADO: Computed para calcular precio total base (sin extras)
const totalPrice = computed(() => {
  return getCustomSaladPrice(false) // El refresco se agregará en el checkout
})

// ✅ ACTUALIZADO: Computed para validar la selección
const isValidSelection = computed(() => {
  return (
    selectedBase.value &&
    selectedIngredientes.value.length > 0 &&
    selectedProteina.value &&
    selectedVinagreta.value
  )
})

// Función para manejar selección de ingredientes
const toggleIngrediente = (ingrediente: string) => {
  const index = selectedIngredientes.value.indexOf(ingrediente)
  if (index > -1) {
    selectedIngredientes.value.splice(index, 1)
  } else if (selectedIngredientes.value.length < 4) {
    selectedIngredientes.value.push(ingrediente)
  }
}

// NUEVO: Función para generar el mensaje del pedido
const generarMensajePedido = () => {
  let mensaje = `NUEVO PEDIDO DE ENSALADA PERSONALIZADA

Cliente: [Por favor, incluye tu nombre]
Direccion de entrega: [Por favor, incluye tu direccion completa]
Telefono: [Tu numero de contacto]

DETALLE DEL PEDIDO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

  mensaje += `
Base: ${selectedBase.value}
Ingredientes adicionales: ${selectedIngredientes.value.length > 0 ? selectedIngredientes.value.join(', ') : 'Ninguno'}
Proteina: ${selectedProteina.value}
Vinagreta: ${selectedVinagreta.value}`

  // Agregar comentarios si los hay
  if (comentarios.value.trim()) {
    mensaje += `

Comentarios adicionales:
${comentarios.value.trim()}`
  }

  // Desglose de precios
  mensaje += `

Desglose de precios:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ensalada personalizada: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.baseSaladPrice}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: ${RESTAURANT_CONFIG.currency}${totalPrice.value}

¡Gracias!`

  return mensaje
}

// ✅ ACTUALIZADO: Función para abrir el selector de item con ensalada personalizada
const enviarPedido = () => {
  if (!isValidSelection.value) return

  // Crear el item personalizado para el selector
  selectedCustomSalad.value = {
    name: 'Ensalada Personalizada',
    price: totalPrice.value,
    description: generarDescripcionEnsalada(),
    includeEntrada: false,
    isCustomSalad: true,
    customDetails: {
      base: selectedBase.value,
      ingredientes: selectedIngredientes.value,
      proteina: selectedProteina.value,
      vinagreta: selectedVinagreta.value,
      comentarios: comentarios.value,
    },
  }

  showItemSelector.value = true
}

// ✅ NUEVO: Función para generar descripción de la ensalada
const generarDescripcionEnsalada = () => {
  let descripcion = `Base: ${selectedBase.value}, Proteína: ${selectedProteina.value}, Vinagreta: ${selectedVinagreta.value}`

  if (selectedIngredientes.value.length > 0) {
    descripcion += `, Ingredientes: ${selectedIngredientes.value.join(', ')}`
  }

  if (comentarios.value.trim()) {
    descripcion += `. Comentarios: ${comentarios.value.trim()}`
  }

  return descripcion
}

// ✅ NUEVO: Función para cerrar el modal del selector
const cerrarItemSelector = () => {
  showItemSelector.value = false
  selectedCustomSalad.value = null
}

// ✅ NUEVO: Función cuando se agrega al carrito
const onItemAdded = () => {
  console.log('Ensalada personalizada agregada al carrito!')
  // Opcional: Resetear la selección después de agregar
  // resetearSeleccion()
}

// ✅ ACTUALIZADO: Función para resetear selección
const resetearSeleccion = () => {
  selectedBase.value = ''
  selectedIngredientes.value = []
  selectedProteina.value = ''
  selectedVinagreta.value = ''
  comentarios.value = ''
}
</script>

<template>
  <div class="prepara-orden-container">
    <!-- ✅ ACTUALIZADO: Header sin precio -->
    <div class="header-section">
      <h1>🥗 Prepara tu Ensalada</h1>
      <p class="subtitle">Crea tu ensalada perfecta eligiendo una opción de cada categoría</p>
    </div>

    <div class="selection-container">
      <!-- Base Selection -->
      <section class="category-section">
        <h2 class="category-title">
          <span class="category-icon">🥬</span>
          <span class="title-text">Elige tu Base</span>
          <span class="required">*</span>
        </h2>
        <div class="options-grid">
          <label
            v-for="base in SALAD_INGREDIENTS.bases"
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
          <span class="title-text">Elige tus Ingredientes</span>
          <span class="required">*</span>
          <span class="counter">({{ selectedIngredientes.length }}/4)</span>
        </h2>
        <div class="options-grid ingredientes-grid">
          <label
            v-for="ingrediente in SALAD_INGREDIENTS.ingredientes"
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
          <span class="title-text">Elige tu Proteína</span>
          <span class="required">*</span>
        </h2>
        <div class="options-grid">
          <label
            v-for="proteina in SALAD_INGREDIENTS.proteinas"
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
          <span class="title-text">Elige tu Vinagreta</span>
          <span class="required">*</span>
        </h2>
        <div class="options-grid">
          <label
            v-for="vinagreta in SALAD_INGREDIENTS.vinagretas"
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

    <!-- ✅ NUEVO: Botón simple para agregar al carrito -->
    <div class="add-to-cart-section">
      <button
        @click="enviarPedido"
        class="add-to-cart-btn"
        :disabled="!isValidSelection"
        :class="{ pulse: isValidSelection }"
      >
        <span class="cart-icon">🛒</span>
        <div class="cart-content">
          <span class="cart-text">Agregar al Carrito</span>
          <span class="cart-price">{{ RESTAURANT_CONFIG.currency }}{{ totalPrice }}</span>
        </div>
      </button>

      <button
        @click="resetearSeleccion"
        class="reset-btn"
        :disabled="
          !selectedBase &&
          !selectedProteina &&
          !selectedVinagreta &&
          selectedIngredientes.length === 0 &&
          !comentarios.trim()
        "
      >
        🔄 Resetear Selección
      </button>
    </div>

    <!-- ✅ Modal de selección de item para ensalada personalizada -->
    <ItemSelector
      :is-visible="showItemSelector"
      :selected-item="selectedCustomSalad"
      @close="cerrarItemSelector"
      @added="onItemAdded"
    />
  </div>
</template>

<style scoped>
.prepara-orden-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 50%, #e0f2eb 100%);
  overflow-x: hidden;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
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
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59, #228b22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(44, 85, 48, 0.1);
}

.subtitle {
  font-size: 1.8rem;
  color: #5a6c57;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 400;
}

.price-display {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.8rem;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.price {
  font-size: 2.8rem;
  font-weight: bold;
}

.price-label {
  font-size: 1.5rem;
  opacity: 0.9;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 4rem;
}

.category-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 12px 48px rgba(44, 85, 48, 0.12);
  border: 1px solid rgba(34, 139, 34, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.category-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2c5530, #4a7c59, #228b22);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(44, 85, 48, 0.1);
}

.category-icon {
  font-size: 3.2rem;
  filter: drop-shadow(0 2px 4px rgba(44, 85, 48, 0.2));
  z-index: 10;
  position: relative;
  /* ✅ Asegurar que el emoji no sea afectado por background-clip */
  background: none !important;
  -webkit-background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  background-clip: initial !important;
}

/* ✅ NUEVO: Aplicar el gradiente solo al texto del título */
.title-text {
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.required {
  color: #e74c3c;
  font-size: 1.6rem;
  font-weight: 500;
  background: rgba(231, 76, 60, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.counter {
  color: #4caf50;
  font-size: 1.6rem;
  font-weight: 500;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1.5rem;
}

.ingredientes-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
}

.option-card {
  display: flex;
  align-items: center;
  padding: 2rem 2.5rem;
  border: 2px solid rgba(44, 85, 48, 0.15);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  color: #2c5530;
  font-weight: 500;
  backdrop-filter: blur(5px);
}

.option-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.option-card:hover:not(.disabled)::before {
  opacity: 1;
}

.option-card:hover:not(.disabled) {
  border-color: #4caf50;
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(76, 175, 80, 0.2);
}

.option-card.active {
  border-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
  color: #155724;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
}

.option-card.active::before {
  opacity: 0;
}

.option-card.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: rgba(248, 249, 250, 0.8);
}

.option-input {
  margin-right: 2rem;
  transform: scale(1.8);
  accent-color: #4caf50;
}

.option-text {
  flex: 1;
  font-size: 1.5rem;
  font-weight: 500;
}

/* ✅ NUEVO: Estilos para la sección de comentarios */
.comments-section-container {
  margin: 4rem 0;
}

.comments-section {
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(108, 117, 125, 0.05) 100%);
  border-left: 4px solid #0d6efd;
}

.optional {
  color: #0d6efd;
  font-size: 1.4rem;
  font-weight: 500;
  background: rgba(13, 110, 253, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.comments-container {
  position: relative;
}

.comments-textarea {
  width: 100%;
  padding: 1.5rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  font-size: 1.4rem;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
}

.comments-textarea:focus {
  outline: none;
  border-color: #4caf50;
  background: white;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.comments-textarea::placeholder {
  color: #999;
  font-style: italic;
}

.char-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  color: #6c757d;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 1px solid rgba(108, 117, 125, 0.2);
}

/* ✅ NUEVO: Estilos para la sección de agregar al carrito */
.add-to-cart-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin: 4rem 0 2rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 2rem 3rem;
  border-radius: 25px;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  position: relative;
  overflow: hidden;
  min-width: 320px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.add-to-cart-btn:hover:not(:disabled)::before {
  left: 100%;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #66bb6a, #4caf50);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 50px rgba(76, 175, 80, 0.5);
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  background: linear-gradient(135deg, #9e9e9e, #757575);
  box-shadow: 0 4px 16px rgba(158, 158, 158, 0.3);
}

.add-to-cart-btn.pulse:not(:disabled) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  }
  50% {
    box-shadow: 0 12px 40px rgba(76, 175, 80, 0.5);
  }
  100% {
    box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  }
}

.cart-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.cart-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cart-text {
  font-size: 1.6rem;
  font-weight: 700;
}

.cart-price {
  font-size: 2.2rem;
  font-weight: 900;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.reset-btn {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 20px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(108, 117, 125, 0.3);
}

.reset-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a6268, #495057);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(108, 117, 125, 0.4);
}

.reset-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 16px 64px rgba(44, 85, 48, 0.15);
  border: 1px solid rgba(34, 139, 34, 0.1);
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.4s ease;
  max-height: calc(100vh - 6rem); /* ✅ Altura máxima del card */
}

.summary-card.collapsed {
  box-shadow: 0 8px 32px rgba(44, 85, 48, 0.12);
  max-height: 80px; /* ✅ Altura fija cuando está colapsado */
}

/* ✅ NUEVO: Mayor z-index cuando está expandido */
.summary-card:not(.collapsed) {
  z-index: 1200; /* ✅ Aún mayor prioridad cuando está expandido */
  position: relative;
  box-shadow: 0 20px 80px rgba(44, 85, 48, 0.25); /* ✅ Sombra más prominente */
  background: rgba(255, 255, 255, 0.98); /* ✅ Más opaco cuando expandido */
  border: 2px solid rgba(34, 139, 34, 0.2); /* ✅ Borde más visible */
}

.summary-content {
  color: #333;
  max-height: calc(100vh - 12rem); /* ✅ Altura máxima del contenido */
  overflow-y: auto; /* ✅ Scroll interno si el contenido es muy largo */
  padding: 0 1rem; /* ✅ Padding para el scroll */
}

/* ✅ NUEVO: Estilos mejorados para el scroll */
.summary-content::-webkit-scrollbar {
  width: 6px;
}

.summary-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.summary-content::-webkit-scrollbar-thumb {
  background: rgba(76, 175, 80, 0.3);
  border-radius: 10px;
}

.summary-content::-webkit-scrollbar-thumb:hover {
  background: rgba(76, 175, 80, 0.5);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  cursor: pointer;
  background: linear-gradient(135deg, #2c5530 0%, #3e6b42 100%);
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: inherit; /* ✅ Hereda el z-index del parent */
}

.summary-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s;
}

.summary-header:hover::before {
  left: 100%;
}

.summary-header:hover {
  background: linear-gradient(135deg, #3e6b42 0%, #4a7c59 100%);
}

.summary-header h3 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1.6rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.8rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
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
  color: #3b3b3b;
  font-size: 1.2rem;
  flex: 1;
}

.compact-price {
  color: #4caf50;
  font-weight: bold;
  font-size: 1.4rem;
}

.summary-content {
  padding: 1rem 1.5rem;
  margin-bottom: 0;
}

.summary-item {
  padding: 0.4rem 0;
  border-bottom: 1px solid #5d5a5a;
  line-height: 1.4;
  font-size: 1.2rem;
}

.summary-item:last-of-type {
  border-bottom: none;
}

/* ✅ NUEVO: Estilos para iconos del resumen */
.summary-icon {
  display: inline-block;
  font-size: 1.2em;
  margin-right: 0.3rem;
  position: relative;
  z-index: 10;
  background: none !important;
  -webkit-background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  background-clip: initial !important;
}

.summary-total {
  padding: 0.8rem 0;
  font-size: 1.4rem;
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
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 180px;
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

.juice-section {
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.05) 0%, rgba(255, 200, 87, 0.05) 100%);
  border-left: 4px solid #ffa500;
}

.cubiertos-section {
  background: linear-gradient(135deg, rgba(108, 117, 125, 0.05) 0%, rgba(134, 142, 150, 0.05) 100%);
  border-left: 4px solid #6c757d;
}

.comments-section {
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(108, 117, 125, 0.05) 100%);
  border-left: 4px solid #0d6efd;
}

.optional {
  color: #ffa500;
  font-size: 1.4rem;
  font-weight: 500;
  background: rgba(255, 165, 0, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.price-tag {
  color: #4caf50;
  font-size: 1.6rem;
  font-weight: 600;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.free-tag {
  color: #6c757d;
  font-size: 1.4rem;
  font-weight: 500;
  background: rgba(108, 117, 125, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.juice-toggle,
.cubiertos-toggle {
  margin-bottom: 1.5rem;
}

.toggle-option {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-weight: 500;
  font-size: 1.6rem;
}

.toggle-option:hover {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.05);
}

.toggle-input {
  margin-right: 1.5rem;
  transform: scale(1.5);
  accent-color: #4caf50;
}

.juice-note {
  background: rgba(255, 193, 7, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #ffc107;
  animation: slideDown 0.4s ease-out;
}

.juice-note p {
  margin: 0;
  color: #856404;
  font-style: italic;
  font-size: 1.4rem;
}

.comments-container {
  position: relative;
}

.comments-textarea {
  width: 100%;
  padding: 1.5rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  font-size: 1.4rem;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  height: 15rem;
  background: rgba(255, 255, 255, 0.9);
}

.comments-textarea:focus {
  outline: none;
  border-color: #4caf50;
  background: white;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.comments-textarea::placeholder {
  color: #999;
  font-style: italic;
}

.char-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  color: #6c757d;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 1px solid rgba(108, 117, 125, 0.2);
}

.juice-item {
  background: rgba(255, 165, 0, 0.1);
  border-left: 4px solid #ffa500;
  padding: 0.8rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cubiertos-item {
  background: rgba(108, 117, 125, 0.1);
  border-left: 4px solid #6c757d;
  padding: 0.8rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-item {
  background: rgba(13, 110, 253, 0.1);
  border-left: 4px solid #0d6efd;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
}

.comment-text {
  font-style: italic;
  color: #495057;
  font-size: 1.1rem;
  line-height: 1.4;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 0.5rem;
}

.item-price {
  color: #4caf50;
  font-weight: 600;
  font-size: 1.1rem;
}

.price-breakdown-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  border: 1px solid #dee2e6;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 1.3rem;
}

.breakdown-item:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}

.summary-total {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  margin-top: 1.5rem;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
}

.total-label {
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.total-amount {
  font-size: 3.2rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive para los nuevos elementos */
@media (max-width: 768px) {
  .toggle-option {
    font-size: 1.4rem;
    padding: 1.2rem 1.5rem;
  }

  .comments-textarea {
    font-size: 1.3rem;
    padding: 1.2rem;
  }

  .total-amount {
    font-size: 2.5rem;
  }

  .juice-item,
  .cubiertos-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .breakdown-item {
    font-size: 1.2rem;
  }
}

/* Eliminar estilos del price-display que ya no se usa */
.prepara-orden-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 50%, #e0f2eb 100%);
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
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
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59, #228b22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(44, 85, 48, 0.1);
}

.subtitle {
  font-size: 1.8rem;
  color: #5a6c57;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-section h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.4rem;
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
    font-size: 1.2rem;
  }

  .summary-header h3 {
    font-size: 1.4rem;
  }

  .compact-summary {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .category-section {
    padding: 1.5rem;
  }

  .category-title {
    font-size: 2rem;
  }

  .category-icon {
    font-size: 2.5rem;
  }

  .option-text {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .prepara-orden-container {
    padding: 0.5rem;
  }

  .header-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .price {
    font-size: 2rem;
  }

  .category-title {
    font-size: 1.8rem;
    flex-wrap: wrap;
  }

  /* ✅ NUEVO: Estilos responsivos mejorados para el resumen */
  .summary-section {
    bottom: 1rem;
    margin-top: 2rem;
    max-height: calc(100vh - 2rem);
  }

  .summary-card {
    border-radius: 16px;
    max-height: calc(100vh - 4rem);
  }

  .summary-card.collapsed {
    max-height: 70px;
  }

  .summary-content {
    max-height: calc(100vh - 8rem);
    padding: 1rem 0.75rem;
  }

  .summary-header {
    padding: 1rem;
  }

  .summary-title {
    font-size: 1.1rem;
  }

  .summary-toggle-icon {
    font-size: 1.2rem;
  }

  /* ✅ NUEVO: Asegurar z-index en móviles */
  .summary-section {
    z-index: 1100;
  }

  .summary-card:not(.collapsed) {
    z-index: 1200;
  }

  .category-icon {
    font-size: 2rem;
  }

  .option-card {
    padding: 1.2rem 1.5rem;
  }

  .option-text {
    font-size: 1.1rem;
  }

  .btn {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
}

/* ✅ NUEVO: Estilos del modal de contacto */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e0f2eb;
  position: relative;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.8rem;
  color: #2c5530;
  font-weight: 600;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f0f8f0;
  color: #2c5530;
}

.modal-body {
  padding: 1rem 2rem 2rem 2rem;
}

.modal-description {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-option {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-family: inherit;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.contact-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.contact-option:hover::before {
  left: 100%;
}

.whatsapp-option {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  box-shadow: 0 8px 32px rgba(37, 211, 102, 0.3);
}

.whatsapp-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(37, 211, 102, 0.4);
  background: linear-gradient(135deg, #38e577, #25d366);
}

.email-option {
  background: linear-gradient(135deg, #ff8a56, #ff6b35);
  color: white;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
}

.email-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(255, 107, 53, 0.4);
  background: linear-gradient(135deg, #ff9966, #ff8a56);
}

.option-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.option-text {
  flex: 1;
}

.option-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.option-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 400;
}

/* Responsive para el modal */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .modal-header h3 {
    font-size: 1.5rem;
  }

  .contact-option {
    padding: 1.2rem;
  }

  .option-icon {
    font-size: 2rem;
  }

  .option-title {
    font-size: 1.2rem;
  }

  .option-subtitle {
    font-size: 1rem;
  }
}

/* ✅ NUEVO: Estilos responsivos actualizados para la nueva interfaz */
@media (max-width: 768px) {
  .header-section h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .options-grid,
  .ingredientes-grid {
    grid-template-columns: 1fr;
  }

  .category-section {
    padding: 1.5rem;
  }

  .category-title {
    font-size: 2rem;
  }

  .category-icon {
    font-size: 2.5rem;
  }

  .option-text {
    font-size: 1.2rem;
  }

  .add-to-cart-section {
    padding: 1.5rem;
    margin: 3rem 0 1.5rem 0;
  }

  .add-to-cart-btn {
    min-width: 280px;
    padding: 1.8rem 2.5rem;
    font-size: 1.4rem;
  }

  .cart-text {
    font-size: 1.4rem;
  }

  .cart-price {
    font-size: 2rem;
  }

  .reset-btn {
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }

  .comments-textarea {
    font-size: 1.3rem;
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .prepara-orden-container {
    padding: 0.5rem;
  }

  .header-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .category-title {
    font-size: 1.8rem;
    flex-wrap: wrap;
  }

  .category-icon {
    font-size: 2rem;
  }

  .option-card {
    padding: 1.2rem 1.5rem;
  }

  .option-text {
    font-size: 1.1rem;
  }

  .add-to-cart-section {
    padding: 1rem;
    margin: 2rem 0 1rem 0;
  }

  .add-to-cart-btn {
    min-width: 260px;
    padding: 1.5rem 2rem;
    font-size: 1.2rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .cart-content {
    align-items: center;
  }

  .cart-text {
    font-size: 1.2rem;
  }

  .cart-price {
    font-size: 1.8rem;
  }

  .cart-icon {
    font-size: 2rem;
  }

  .reset-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
  }

  .comments-textarea {
    font-size: 1.2rem;
    padding: 1rem;
    min-height: 100px;
  }

  .char-counter {
    font-size: 1rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
