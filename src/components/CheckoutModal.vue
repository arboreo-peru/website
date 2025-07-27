<template>
  <div v-if="isVisible" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🛒 Finalizar Pedido</h2>
        <button @click="cerrarModal" class="close-btn">✕</button>
      </div>

      <!-- Resumen del pedido -->
      <div class="order-summary">
        <h3>📋 Resumen de tu pedido</h3>
        <div class="order-item">
          <span class="item-name">{{ selectedItem?.name }}</span>
          <span class="item-price">{{ RESTAURANT_CONFIG.currency }}{{ selectedItem?.price }}</span>
        </div>

        <!-- Entrada seleccionada (solo para menús) -->
        <div v-if="selectedItem?.includeEntrada && formData.selectedEntrada" class="order-extras">
          <div class="extra-item">
            <span>🍲 Entrada: {{ formData.selectedEntrada }}</span>
            <span>Incluida</span>
          </div>
        </div>

        <!-- Extras -->
        <div v-if="formData.includeJuice || formData.includeCubiertos" class="order-extras">
          <div v-if="formData.includeJuice" class="extra-item">
            <span>🥤 Refresco</span>
            <span>{{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.juicePrice }}</span>
          </div>
          <div v-if="formData.includeCubiertos" class="extra-item">
            <span>🍴 Cubiertos</span>
            <span>Incluido</span>
          </div>
        </div>

        <div class="total">
          <strong>Total: {{ RESTAURANT_CONFIG.currency }}{{ totalPrice }}</strong>
        </div>
      </div>

      <!-- Formulario de datos -->
      <div class="checkout-form">
        <!-- Datos personales -->
        <div class="form-section">
          <h4>👤 Datos personales</h4>
          <div class="form-group">
            <label for="nombre">Nombre completo <span class="required">*</span></label>
            <input
              id="nombre"
              v-model="formData.nombre"
              type="text"
              required
              placeholder="Tu nombre completo"
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono <span class="required">*</span></label>
            <input
              id="telefono"
              v-model="formData.telefono"
              type="tel"
              required
              placeholder="999 999 999"
            />
          </div>
        </div>

        <!-- Método de pago -->
        <div class="form-section">
          <h4>💳 Método de pago</h4>
          <div class="payment-options">
            <label class="payment-option">
              <input v-model="formData.metodoPago" type="radio" value="efectivo" required />
              <span class="payment-label">
                💵 Efectivo
                <small>Elige tu opción de vuelto</small>
              </span>
            </label>
            <label class="payment-option">
              <input v-model="formData.metodoPago" type="radio" value="yape" required />
              <span class="payment-label">📱 Yape</span>
            </label>
            <label class="payment-option">
              <input v-model="formData.metodoPago" type="radio" value="plin" required />
              <span class="payment-label">📲 Plin</span>
            </label>
          </div>

          <!-- Opciones de efectivo -->
          <div v-if="formData.metodoPago === 'efectivo'" class="efectivo-options">
            <label for="efectivoOpcion">Opción de vuelto <span class="required">*</span>:</label>
            <select
              id="efectivoOpcion"
              v-model="formData.efectivoOpcion"
              required
              class="styled-select"
            >
              <option value="">Selecciona una opción</option>
              <option value="exacto">Pago exacto</option>
              <option value="vuelto">Traiga vuelto</option>
              <option value="no-se">No lo sé aún</option>
            </select>

            <div v-if="formData.efectivoOpcion === 'vuelto'" class="form-group">
              <label for="montoEfectivo"
                >¿Con cuánto vas a pagar? <span class="optional">(opcional)</span></label
              >
              <input
                id="montoEfectivo"
                v-model="formData.montoEfectivo"
                type="number"
                min="0"
                step="0.1"
                placeholder="Ejemplo: 25.00"
              />
            </div>
          </div>
        </div>

        <!-- Selección de entrada (solo para menús) -->
        <div v-if="selectedItem?.includeEntrada" class="form-section">
          <h4>🍲 Selecciona tu entrada</h4>
          <div class="entrada-options">
            <label v-for="entrada in ENTRADA_OPTIONS" :key="entrada" class="payment-option">
              <input v-model="formData.selectedEntrada" type="radio" :value="entrada" required />
              <span class="payment-label">{{ entrada }}</span>
            </label>
          </div>
        </div>

        <!-- Opciones adicionales -->
        <div class="form-section">
          <h4>🍽️ Opciones adicionales</h4>

          <div class="additional-options">
            <label class="option-checkbox">
              <input v-model="formData.includeJuice" type="checkbox" />
              <span class="checkbox-label">
                🥤 Agregar refresco
                <small>+{{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.juicePrice }}</small>
              </span>
            </label>

            <label class="option-checkbox">
              <input v-model="formData.includeCubiertos" type="checkbox" />
              <span class="checkbox-label">
                🍴 Incluir cubiertos
                <small>Sin costo adicional</small>
              </span>
            </label>
          </div>
        </div>

        <!-- Dirección de entrega -->
        <div class="form-section">
          <h4>📍 Dirección de entrega</h4>
          <div class="form-group">
            <label for="direccion">Dirección completa <span class="required">*</span></label>
            <textarea
              id="direccion"
              v-model="formData.direccion"
              required
              placeholder="Calle, número, distrito, departamento/casa"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="referencias">Referencias <span class="optional">(opcional)</span></label>
            <textarea
              id="referencias"
              v-model="formData.referencias"
              placeholder="Frente al parque, casa color azul, puerta negra, etc."
              rows="2"
            ></textarea>
          </div>
        </div>

        <!-- Comentarios adicionales -->
        <div class="form-section">
          <h4>💬 Comentarios adicionales</h4>
          <div class="form-group">
            <label for="comentarios">Comentarios <span class="optional">(opcional)</span></label>
            <textarea
              id="comentarios"
              v-model="formData.comentarios"
              placeholder="Alguna indicación especial, alergias, preferencias, etc."
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="cerrarModal" class="btn-cancel">Cancelar</button>
          <div class="submit-buttons">
            <button
              type="button"
              @click="enviarPorWhatsApp"
              class="btn-whatsapp"
              :disabled="!isFormValid"
              :class="{ 'btn-disabled': !isFormValid }"
            >
              📱 Enviar por WhatsApp
            </button>
            <button
              type="button"
              @click="enviarPorEmail"
              class="btn-email"
              :disabled="!isFormValid"
              :class="{ 'btn-disabled': !isFormValid }"
            >
              📧 Enviar por Email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  RESTAURANT_CONFIG,
  ENTRADA_OPTIONS,
  MENU_OPTIONS,
  itemIncludesEntrada,
} from '../config/restaurant'

interface FormData {
  nombre: string
  telefono: string
  metodoPago: 'efectivo' | 'yape' | 'plin' | ''
  efectivoOpcion: 'exacto' | 'vuelto' | 'no-se' | ''
  montoEfectivo: number | null
  direccion: string
  referencias: string
  comentarios: string
  includeJuice: boolean
  includeCubiertos: boolean
  selectedEntrada: string // ✅ NUEVO: Para la entrada seleccionada
}

interface SelectedItem {
  name: string
  price: number
  description?: string
  includeEntrada?: boolean // ✅ NUEVO: Para indicar si incluye entrada
}

const props = defineProps<{
  isVisible: boolean
  selectedItem: SelectedItem | null
}>()

const emit = defineEmits<{
  close: []
}>()

const formData = ref<FormData>({
  nombre: '',
  telefono: '',
  metodoPago: '',
  efectivoOpcion: '',
  montoEfectivo: null,
  direccion: '',
  referencias: '',
  comentarios: '',
  includeJuice: false,
  includeCubiertos: true, // Por defecto incluir cubiertos
  selectedEntrada: '', // ✅ NUEVO: Entrada seleccionada
})

// Computed para calcular el precio total
const totalPrice = computed(() => {
  if (!props.selectedItem) return 0
  const basePrice = props.selectedItem.price
  const juicePrice = formData.value.includeJuice ? RESTAURANT_CONFIG.juicePrice : 0
  return basePrice + juicePrice
})

// Limpiar datos cuando se cierra el modal
watch(
  () => props.isVisible,
  (newVal) => {
    if (!newVal) {
      formData.value = {
        nombre: '',
        telefono: '',
        metodoPago: '',
        efectivoOpcion: '',
        montoEfectivo: null,
        direccion: '',
        referencias: '',
        comentarios: '',
        includeJuice: false,
        includeCubiertos: true,
        selectedEntrada: '', // ✅ NUEVO: Resetear entrada
      }
    }
  },
)

const cerrarModal = () => {
  emit('close')
}

const generarMensajePedido = () => {
  if (!props.selectedItem) return ''

  // Generar texto del método de pago con información de vuelto
  let metodoPagoTexto = ''
  if (formData.value.metodoPago === 'efectivo') {
    metodoPagoTexto = '💵 Efectivo'
    if (formData.value.efectivoOpcion === 'exacto') {
      metodoPagoTexto += ' (Pago exacto)'
    } else if (formData.value.efectivoOpcion === 'vuelto') {
      const montoSolicitado = formData.value.montoEfectivo || 0
      const vuelto = montoSolicitado - totalPrice.value
      metodoPagoTexto += ` (Solicitó vuelto de S/${montoSolicitado})`
    } else if (formData.value.efectivoOpcion === 'no-se') {
      metodoPagoTexto += ' (Aún no sabe si tiene exacto)'
    }
  } else if (formData.value.metodoPago === 'yape') {
    metodoPagoTexto = '📱 Yape'
  } else if (formData.value.metodoPago === 'plin') {
    metodoPagoTexto = '📲 Plin'
  }

  let mensaje = `🍽️ NUEVO PEDIDO

👤 ${formData.value.nombre}
📞 ${formData.value.telefono}

🛒 PEDIDO:
🍽️ ${props.selectedItem.name} - ${RESTAURANT_CONFIG.currency}${props.selectedItem.price}`

  // Agregar entrada si aplica
  if (props.selectedItem?.includeEntrada && formData.value.selectedEntrada) {
    mensaje += `
🍲 Entrada: ${formData.value.selectedEntrada}`
  }

  // Agregar extras
  if (formData.value.includeJuice) {
    mensaje += `
🥤 Refresco - ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.juicePrice}`
  }

  mensaje += `
🍴 Cubiertos: ${formData.value.includeCubiertos ? 'Sí' : 'No'}

💳 PAGO: ${metodoPagoTexto}

📍 ENTREGA:
${formData.value.direccion}`

  if (formData.value.referencias) {
    mensaje += `
📌 Ref: ${formData.value.referencias}`
  }

  if (formData.value.comentarios) {
    mensaje += `

💬 COMENTARIOS:
${formData.value.comentarios}`
  }

  mensaje += `

💰 TOTAL: ${RESTAURANT_CONFIG.currency}${totalPrice.value}

¡Gracias! 🌟`

  return mensaje
}

// Computed para validar si el formulario está completo
const isFormValid = computed(() => {
  const basicValidation =
    formData.value.nombre.trim() !== '' &&
    formData.value.telefono.trim() !== '' &&
    formData.value.metodoPago !== '' &&
    formData.value.direccion.trim() !== '' &&
    (formData.value.metodoPago !== 'efectivo' || formData.value.efectivoOpcion !== '')

  // Si el item incluye entrada, también validar que esté seleccionada
  const entradaValidation = props.selectedItem?.includeEntrada
    ? formData.value.selectedEntrada !== ''
    : true

  return basicValidation && entradaValidation
})

const enviarPorWhatsApp = () => {
  if (!props.selectedItem) return

  if (!isFormValid.value) {
    alert('❌ Por favor completa todos los campos requeridos antes de enviar el pedido.')
    return
  }

  const mensaje = generarMensajePedido()
  const whatsappUrl = `https://wa.me/51${RESTAURANT_CONFIG.socialMedia.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(whatsappUrl, '_blank')
  cerrarModal()
}

const enviarPorEmail = () => {
  if (!props.selectedItem) {
    return
  }

  // Ahora email también requiere formulario completo
  if (!isFormValid.value) {
    alert('❌ Por favor completa todos los campos requeridos antes de enviar el pedido.')
    return
  }

  // Generar información de método de pago
  let metodoPagoInfo: string = formData.value.metodoPago || ''
  if (formData.value.metodoPago === 'efectivo') {
    metodoPagoInfo = 'Efectivo'
    if (formData.value.efectivoOpcion === 'exacto') {
      metodoPagoInfo += ' (Pago exacto)'
    } else if (formData.value.efectivoOpcion === 'vuelto') {
      metodoPagoInfo += ` (Solicita vuelto de S/${formData.value.montoEfectivo || 0})`
    } else if (formData.value.efectivoOpcion === 'no-se') {
      metodoPagoInfo += ' (Aun no sabe si tiene exacto)'
    }
  } else if (formData.value.metodoPago === 'yape') {
    metodoPagoInfo = 'Yape'
  } else if (formData.value.metodoPago === 'plin') {
    metodoPagoInfo = 'Plin'
  }

  const subject = `Pedido - ${props.selectedItem.name}`
  let body = `Hola, me gustaria hacer un pedido:

CLIENTE:
- Nombre: ${formData.value.nombre}
- Telefono: ${formData.value.telefono}

PRODUCTO:
- ${props.selectedItem.name}
- Precio: ${RESTAURANT_CONFIG.currency}${props.selectedItem.price}`

  // Agregar entrada si aplica
  if (props.selectedItem?.includeEntrada && formData.value.selectedEntrada) {
    body += `
- Entrada: ${formData.value.selectedEntrada}`
  }

  // Agregar extras
  if (formData.value.includeJuice) {
    body += `
- Refresco: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.juicePrice}`
  }

  body += `
- Cubiertos: ${formData.value.includeCubiertos ? 'Si' : 'No'}

PAGO: ${metodoPagoInfo}

ENTREGA:
- Direccion: ${formData.value.direccion}`

  if (formData.value.referencias) {
    body += `
- Referencias: ${formData.value.referencias}`
  }

  if (formData.value.comentarios) {
    body += `

COMENTARIOS:
${formData.value.comentarios}`
  }

  body += `

TOTAL: ${RESTAURANT_CONFIG.currency}${totalPrice.value}

Gracias!`

  const mailtoUrl = `mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoUrl
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
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
  font-size: 2.2rem;
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

.order-summary {
  padding: 2rem 2.5rem;
  background: #f8fffe;
  border-bottom: 1px solid #e0e0e0;
}

.order-summary h3 {
  margin: 0 0 1.5rem 0;
  color: #2c5530;
  font-size: 1.8rem;
  font-weight: 600;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
}

.item-name {
  font-weight: 600;
  color: #2c5530;
  font-size: 1.4rem;
}

.item-price {
  font-weight: 700;
  color: #228b22;
  font-size: 1.4rem;
}

.order-extras {
  margin: 1rem 0;
}

.extra-item {
  display: flex;
  color: #333;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.total {
  text-align: right;
  margin-top: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  color: white;
  border-radius: 12px;
  font-size: 1.6rem;
}

.checkout-form {
  padding: 2rem 2.5rem;
}

.form-section {
  color: #666;
  margin-bottom: 2.5rem;
}

.form-section h4 {
  margin: 0 0 1.5rem 0;
  color: #2c5530;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f5e8;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c5530;
  font-weight: 600;
  font-size: 1.3rem;
}

/* Asterisco rojo para campos obligatorios */
.required {
  color: #e74c3c;
  font-weight: 700;
  font-size: 1.4rem;
  margin-left: 0.2rem;
}

/* Texto opcional en celeste bonito */
.optional {
  color: #3498db;
  font-weight: 500;
  font-size: 1.1rem;
  font-style: italic;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1.4rem;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a7c59;
  background: #f8fffe;
  box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
}

.payment-options {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.entrada-options {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.payment-option:hover {
  border-color: #4a7c59;
  background: #f8fffe;
}

.payment-option input[type='radio'] {
  margin-right: 1rem;
  transform: scale(1.2);
}

.payment-option input[type='radio']:checked + .payment-label {
  color: #2c5530;
  font-weight: 600;
}

.payment-option:has(input[type='radio']:checked) {
  border-color: #4a7c59;
  background: #f8fffe;
}

.payment-label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1.4rem;
}

.payment-label small {
  font-size: 1.1rem;
  color: #666;
  font-weight: 400;
}

.efectivo-options {
  background: #f8fffe;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
}

.efectivo-options label {
  display: block;
  margin-bottom: 0.8rem;
  color: #2c5530;
  font-weight: 600;
  font-size: 1.3rem;
}

/* Estilos especiales para el dropdown de opciones de vuelto */
.styled-select {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1.4rem;
  background: white;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a7c59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.styled-select:hover {
  border-color: #4a7c59;
  background-color: #f8fffe;
}

.styled-select:focus {
  outline: none;
  border-color: #4a7c59;
  background-color: #f8fffe;
  box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
}

.styled-select option {
  padding: 0.8rem;
  font-size: 1.4rem;
  color: #2c5530;
  background: white;
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
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1.4rem;
}

.checkbox-label small {
  font-size: 1.1rem;
  color: #666;
  font-weight: 400;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
  gap: 1rem;
}

.btn-cancel {
  padding: 1.2rem 2rem;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #e0e0e0;
  color: #333;
}

.submit-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-whatsapp,
.btn-email {
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
}

.btn-whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #38e577, #25d366);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.4);
}

.btn-email {
  background: linear-gradient(135deg, #ff8a56, #ff6b35);
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
}

.btn-email:hover {
  background: linear-gradient(135deg, #ff9966, #ff8a56);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 107, 53, 0.4);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #ccc !important;
  box-shadow: none !important;
  transform: none !important;
}

.btn-disabled:hover {
  background: #ccc !important;
  transform: none !important;
  box-shadow: none !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
    max-height: 95vh;
  }

  .modal-header,
  .order-summary,
  .checkout-form {
    padding: 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.8rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .submit-buttons {
    width: 100%;
    flex-direction: column;
  }

  .btn-whatsapp,
  .btn-email,
  .btn-cancel {
    width: 100%;
    justify-content: center;
  }

  .payment-options,
  .additional-options {
    gap: 0.8rem;
  }

  .payment-option,
  .option-checkbox {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .modal-header,
  .order-summary,
  .checkout-form {
    padding: 1rem;
  }

  .modal-header h2 {
    font-size: 1.6rem;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    font-size: 1.2rem;
    padding: 0.8rem 1rem;
  }

  .payment-label,
  .checkbox-label {
    font-size: 1.2rem;
  }
}
</style>
