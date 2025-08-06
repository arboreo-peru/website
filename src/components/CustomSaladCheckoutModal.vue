<template>
  <div v-if="isVisible" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🛒 Finalizar Ensalada Personalizada</h2>
        <button @click="cerrarModal" class="close-btn">✕</button>
      </div>

      <!-- Resumen del pedido -->
      <div class="order-summary">
        <h3>📋 Resumen de tu ensalada personalizada</h3>

        <div class="order-details">
          <div class="detail-item">
            <span class="label">🥬 Base:</span>
            <span class="value">{{ saladData.selectedBase }}</span>
          </div>
          <div class="detail-item">
            <span class="label">🥩 Proteína:</span>
            <span class="value">{{ saladData.selectedProteina }}</span>
          </div>
          <div class="detail-item">
            <span class="label">🫒 Vinagreta:</span>
            <span class="value">{{ saladData.selectedVinagreta }}</span>
          </div>
          <div class="detail-item">
            <span class="label">🥕 Ingredientes:</span>
            <span class="value">{{ saladData.selectedIngredientes.join(', ') }}</span>
          </div>
        </div>

        <!-- Extras seleccionados -->
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
            <label for="nombre">Nombre completo *</label>
            <input
              id="nombre"
              v-model="formData.nombre"
              type="text"
              required
              placeholder="Tu nombre completo"
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono *</label>
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
            <label for="efectivoOpcion">Opción de vuelto:</label>
            <select id="efectivoOpcion" v-model="formData.efectivoOpcion" required>
              <option value="">Selecciona una opción</option>
              <option value="exacto">Pago exacto</option>
              <option value="vuelto">Llevaré vuelto</option>
              <option value="no-se">No lo sé aún</option>
            </select>

            <div v-if="formData.efectivoOpcion === 'vuelto'" class="form-group">
              <label for="montoEfectivo">¿Con cuánto vas a pagar?</label>
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
            <label for="direccion">Dirección completa *</label>
            <textarea
              id="direccion"
              v-model="formData.direccion"
              required
              placeholder="Calle, número, distrito, departamento/casa"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="referencias">Referencias (opcional)</label>
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
            <label for="comentarios">Comentarios (opcional)</label>
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
            <button type="button" @click="enviarPorEmail" class="btn-email">
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
import { RESTAURANT_CONFIG } from '../config/restaurant'

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
}

interface SaladData {
  selectedBase: string
  selectedProteina: string
  selectedVinagreta: string
  selectedIngredientes: string[]
  totalPrice: number
  comentarios?: string
}

const props = defineProps<{
  isVisible: boolean
  saladData: SaladData
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
  includeCubiertos: true,
})

// Computed para calcular el precio total
const totalPrice = computed(() => {
  const basePrice = props.saladData.totalPrice
  const juicePrice = formData.value.includeJuice ? RESTAURANT_CONFIG.juicePrice : 0
  return basePrice + juicePrice
})

// Computed para el enlace de email directo
const mailtoLink = computed(() => {
  const subject = `Pedido Ensalada Personalizada`
  const body = `Hola, me gustaría hacer un pedido de una ensalada personalizada:

🥬 Base: ${props.saladData.selectedBase || 'Por definir'}
🥩 Proteína: ${props.saladData.selectedProteina || 'Por definir'}
🫒 Vinagreta: ${props.saladData.selectedVinagreta || 'Por definir'}
🥕 Ingredientes: ${props.saladData.selectedIngredientes?.join(', ') || 'Por definir'}

💰 Precio base: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.baseSaladPrice}

Por favor, respóndeme para coordinar los detalles de entrega y pago.

¡Gracias!`

  return `mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
      }
    }
  },
)

const cerrarModal = () => {
  emit('close')
}

const generarMensajePedido = () => {
  const metodoPagoTexto = {
    efectivo: `💵 Efectivo${
      formData.value.efectivoOpcion === 'exacto'
        ? ' (Pago exacto)'
        : formData.value.efectivoOpcion === 'vuelto'
          ? ` (Con S/${formData.value.montoEfectivo}, vuelto: S/${(formData.value.montoEfectivo || 0) - totalPrice.value})`
          : ' (Aún no sé si tengo exacto)'
    }`,
    yape: 'Yape',
    plin: 'Plin',
  }

  // Validar que el método de pago esté seleccionado
  const metodoPagoSeleccionado = formData.value.metodoPago
    ? metodoPagoTexto[formData.value.metodoPago as keyof typeof metodoPagoTexto]
    : 'Metodo de pago no seleccionado'

  let mensaje = `NUEVO PEDIDO - ENSALADA PERSONALIZADA

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre: ${formData.value.nombre || 'No especificado'}
• Telefono: ${formData.value.telefono || 'No especificado'}

DETALLE DE LA ENSALADA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Base: ${props.saladData.selectedBase}
Ingredientes: ${props.saladData.selectedIngredientes.join(', ')}
Proteina: ${props.saladData.selectedProteina}
Vinagreta: ${props.saladData.selectedVinagreta}`

  if (formData.value.includeJuice) {
    mensaje += `\nBebida: Incluida (+S/${RESTAURANT_CONFIG.juicePrice})`
  }

  if (formData.value.includeCubiertos) {
    mensaje += `\nCubiertos: Incluidos`
  }

  if (props.saladData.comentarios) {
    mensaje += `\nComentarios del pedido: ${props.saladData.comentarios}`
  }

  mensaje += `

METODO DE PAGO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${metodoPagoSeleccionado}

DIRECCION DE ENTREGA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.value.direccion || 'No especificada'}`

  if (formData.value.referencias) {
    mensaje += `
Referencias: ${formData.value.referencias}`
  }

  if (formData.value.comentarios) {
    mensaje += `

COMENTARIOS ADICIONALES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.value.comentarios}`
  }

  mensaje += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL A PAGAR: ${RESTAURANT_CONFIG.currency}${totalPrice.value}

¡Gracias por tu pedido personalizado!`

  return mensaje
}

// Computed para validar si el formulario está completo
const isFormValid = computed(() => {
  return (
    formData.value.nombre.trim() !== '' &&
    formData.value.telefono.trim() !== '' &&
    formData.value.metodoPago !== '' &&
    formData.value.direccion.trim() !== '' &&
    (formData.value.metodoPago !== 'efectivo' || formData.value.efectivoOpcion !== '')
  )
})

const enviarPorWhatsApp = () => {
  if (!isFormValid.value) {
    alert('Por favor completa todos los campos requeridos antes de enviar el pedido.')
    return
  }

  const mensaje = generarMensajePedido()
  const whatsappUrl = `https://wa.me/51${RESTAURANT_CONFIG.socialMedia.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(whatsappUrl, '_blank')
  cerrarModal()
}

const enviarPorEmail = () => {
  // Para email, siempre usamos un mensaje corto y simple
  if (isFormValid.value) {
    // Formulario completo - mensaje simplificado
    const subject = `Pedido Ensalada Personalizada`
    const body = `Hola, me gustaria hacer un pedido de ensalada personalizada:

BASE: ${props.saladData.selectedBase || 'Por definir'}
INGREDIENTES: ${props.saladData.selectedIngredientes?.join(', ') || 'Por definir'}
PROTEINA: ${props.saladData.selectedProteina || 'Por definir'}
VINAGRETA: ${props.saladData.selectedVinagreta || 'Por definir'}
${formData.value.includeJuice ? `REFRESCO: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.juicePrice}` : ''}

CLIENTE: ${formData.value.nombre}
TELEFONO: ${formData.value.telefono}
PAGO: ${formData.value.metodoPago}
DIRECCION: ${formData.value.direccion}

PRECIO: ${RESTAURANT_CONFIG.currency}${totalPrice.value}

Gracias!`

    const mailtoUrl = `mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
  } else {
    // Formulario incompleto - email básico
    const subject = `Pedido Ensalada Personalizada`
    const body = `Hola, me gustaria hacer un pedido de ensalada personalizada:

BASE: ${props.saladData.selectedBase || 'Por definir'}
INGREDIENTES: ${props.saladData.selectedIngredientes?.join(', ') || 'Por definir'}
PROTEINA: ${props.saladData.selectedProteina || 'Por definir'}
VINAGRETA: ${props.saladData.selectedVinagreta || 'Por definir'}

PRECIO: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.baseSaladPrice}

Por favor, respondeme para coordinar los detalles.

Gracias!`

    const mailtoUrl = `mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
  }

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
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(74, 124, 89, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e8f5e8;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 100%);
  border-radius: 20px 20px 0 0;
}

.modal-header h2 {
  color: #2c5530;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7b68;
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

.close-btn:hover {
  background: #ff6b35;
  color: white;
  transform: rotate(90deg);
}

.order-summary {
  padding: 1.5rem 2rem;
  background: #f8fffe;
  border-bottom: 1px solid #e8f5e8;
}

.order-summary h3 {
  color: #2c5530;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.6rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
}

.detail-item .label {
  font-weight: 600;
  color: #2c5530;
  min-width: 120px;
}

.detail-item .value {
  color: #4a7c59;
  text-align: right;
  flex: 1;
  font-weight: 500;
}

.total {
  text-align: right;
  font-size: 1.2rem;
  color: #2c5530;
  padding-top: 0.8rem;
  border-top: 2px solid #4a7c59;
}

.checkout-form {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h4 {
  color: #2c5530;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c5530;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e8f5e8;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a7c59;
  box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e8f5e8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-option:hover {
  border-color: #4a7c59;
  background: #f8fffe;
}

.payment-option input[type='radio'] {
  margin-right: 1rem;
  width: auto;
  transform: scale(1.2);
}

.payment-option input[type='radio']:checked + .payment-label {
  color: #4a7c59;
  font-weight: 600;
}

.payment-label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
}

.payment-label small {
  color: #6b7b68;
  font-size: 0.85rem;
}

.efectivo-options {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fffe;
  border-radius: 10px;
  border: 1px solid #e8f5e8;
}

.efectivo-options select {
  background: white;
  border: 2px solid #e8f5e8;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  color: #2c5530;
  font-family: inherit;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.efectivo-options select:focus {
  outline: none;
  border-color: #4a7c59;
  box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
}

.efectivo-options select option {
  background: white;
  color: #2c5530;
  padding: 0.5rem;
}

.efectivo-options label {
  color: #2c5530;
  font-weight: 600;
  margin-bottom: 0.8rem;
  display: block;
}

.order-extras {
  margin: 1rem 0;
  padding: 0.8rem;
  background: #f0f8f0;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
}

.extra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.95rem;
  color: #4a7c59;
}

.extra-item:not(:last-child) {
  border-bottom: 1px solid #e8f5e8;
  margin-bottom: 0.3rem;
  padding-bottom: 0.6rem;
}

.additional-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-checkbox {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e8f5e8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-checkbox:hover {
  border-color: #4a7c59;
  background: #f8fffe;
}

.option-checkbox input[type='checkbox'] {
  margin-right: 1rem;
  width: auto;
  transform: scale(1.3);
  cursor: pointer;
  accent-color: #4a7c59;
}

.checkbox-label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
  cursor: pointer;
}

.checkbox-label small {
  color: #6b7b68;
  font-size: 0.85rem;
  font-weight: 400;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e8f5e8;
}

.submit-buttons {
  display: flex;
  gap: 1rem;
}

.btn-cancel,
.btn-whatsapp,
.btn-email {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
}

.btn-cancel {
  background: #f1f1f1;
  color: #6b7b68;
}

.btn-cancel:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.btn-whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  background: linear-gradient(135deg, #38e577, #25d366);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
}

.btn-email {
  background: linear-gradient(135deg, #ff8a56, #ff6b35);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.btn-email:hover {
  background: linear-gradient(135deg, #ff9966, #ff8a56);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
}

/* Estilos para botón-enlace de email */
.btn-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: none;
}

/* Estilos para botones deshabilitados */
.btn-disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
}

.btn-disabled:hover {
  transform: none !important;
  box-shadow: none !important;
  background: linear-gradient(135deg, #ccc, #999) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    margin: 0.5rem;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
  }

  .order-summary,
  .checkout-form {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .submit-buttons {
    flex-direction: column;
  }

  .detail-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.3rem;
  }

  .detail-item .label {
    min-width: auto;
  }

  .detail-item .value {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-header,
  .order-summary,
  .checkout-form {
    padding: 1rem;
  }

  .payment-options {
    gap: 0.5rem;
  }

  .payment-option {
    padding: 0.8rem;
  }

  .form-section {
    margin-bottom: 1.5rem;
  }
}
</style>
