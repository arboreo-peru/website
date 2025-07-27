<template>
  <div v-if="isVisible" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🛒 Carrito de Compras</h2>
        <button @click="cerrarModal" class="close-btn">✕</button>
      </div>

      <!-- Lista de items en el carrito -->
      <div class="cart-items">
        <h3>📋 Tus pedidos ({{ cartItemCount }} items)</h3>

        <div v-if="isCartEmpty" class="empty-cart">
          <p>Tu carrito está vacío</p>
          <button @click="cerrarModal" class="btn-continue">Continuar comprando</button>
        </div>

        <div v-else>
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-info">
              <div class="item-header">
                <h4 class="item-name">{{ item.name }}</h4>
                <button @click="removeFromCart(item.id)" class="remove-btn" title="Eliminar item">
                  🗑️
                </button>
              </div>

              <div class="item-details">
                <p class="item-price">{{ RESTAURANT_CONFIG.currency }}{{ item.price }}</p>

                <!-- Entrada seleccionada -->
                <div v-if="item.includeEntrada && item.selectedEntrada" class="item-extra">
                  🍲 Entrada: {{ item.selectedEntrada }}
                </div>

                <!-- Extras -->
                <div v-if="item.includeJuice" class="item-extra">
                  🥤 Refresco: {{ RESTAURANT_CONFIG.currency }}{{ RESTAURANT_CONFIG.juicePrice }}
                </div>

                <div v-if="item.includeCubiertos" class="item-extra">🍴 Cubiertos incluidos</div>

                <!-- Para ensaladas personalizadas -->
                <div v-if="item.isCustomSalad" class="custom-salad-details">
                  <div
                    v-if="item.customIngredients && item.customIngredients.length > 0"
                    class="item-extra"
                  >
                    🥗 Ingredientes: {{ item.customIngredients.join(', ') }}
                  </div>
                  <div v-if="item.customDressing" class="item-extra">
                    🥄 Aderezo: {{ item.customDressing }}
                  </div>
                </div>
              </div>

              <div class="quantity-controls">
                <button @click="updateQuantity(item.id, item.quantity - 1)" class="qty-btn">
                  -
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)" class="qty-btn">
                  +
                </button>
                <span class="subtotal"
                  >{{ RESTAURANT_CONFIG.currency }}{{ getItemSubtotal(item) }}</span
                >
              </div>
            </div>
          </div>

          <div class="cart-total">
            <strong>Total: {{ RESTAURANT_CONFIG.currency }}{{ cartTotal }}</strong>
          </div>
        </div>
      </div>

      <!-- Formulario de datos del cliente (solo si hay items) -->
      <div v-if="!isCartEmpty" class="customer-form">
        <!-- Datos personales -->
        <div class="form-section">
          <h4>👤 Datos personales</h4>
          <div class="form-group">
            <label for="nombre">Nombre completo <span class="required">*</span></label>
            <input
              id="nombre"
              v-model="customerData.nombre"
              type="text"
              required
              placeholder="Tu nombre completo"
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono <span class="required">*</span></label>
            <input
              id="telefono"
              v-model="customerData.telefono"
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
              <input v-model="customerData.metodoPago" type="radio" value="efectivo" required />
              <span class="payment-label">
                💵 Efectivo
                <small>Elige tu opción de vuelto</small>
              </span>
            </label>
            <label class="payment-option">
              <input v-model="customerData.metodoPago" type="radio" value="yape" required />
              <span class="payment-label">📱 Yape</span>
            </label>
            <label class="payment-option">
              <input v-model="customerData.metodoPago" type="radio" value="plin" required />
              <span class="payment-label">📲 Plin</span>
            </label>
          </div>

          <!-- Opciones de efectivo -->
          <div v-if="customerData.metodoPago === 'efectivo'" class="efectivo-options">
            <label for="efectivoOpcion">Opción de vuelto <span class="required">*</span>:</label>
            <select
              id="efectivoOpcion"
              v-model="customerData.efectivoOpcion"
              required
              class="styled-select"
            >
              <option value="">Selecciona una opción</option>
              <option value="exacto">Pago exacto</option>
              <option value="vuelto">Traiga vuelto</option>
              <option value="no-se">No lo sé aún</option>
            </select>

            <div v-if="customerData.efectivoOpcion === 'vuelto'" class="form-group">
              <label for="montoEfectivo"
                >¿Con cuánto vas a pagar? <span class="optional">(opcional)</span></label
              >
              <input
                id="montoEfectivo"
                v-model="customerData.montoEfectivo"
                type="number"
                min="0"
                step="0.1"
                placeholder="Ejemplo: 25.00"
              />
            </div>
          </div>
        </div>

        <!-- Dirección de entrega -->
        <div class="form-section">
          <h4>📍 Dirección de entrega</h4>
          <div class="form-group">
            <label for="direccion">Dirección completa <span class="required">*</span></label>
            <textarea
              id="direccion"
              v-model="customerData.direccion"
              required
              placeholder="Calle, número, distrito, departamento/casa"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="referencias">Referencias <span class="optional">(opcional)</span></label>
            <textarea
              id="referencias"
              v-model="customerData.referencias"
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
              v-model="customerData.comentarios"
              placeholder="Alguna indicación especial, alergias, preferencias, etc."
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="cerrarModal" class="btn-cancel">Continuar comprando</button>
          <div class="submit-buttons">
            <button
              type="button"
              @click="enviarPorWhatsApp"
              class="btn-whatsapp"
              :disabled="!isCustomerDataValid"
              :class="{ 'btn-disabled': !isCustomerDataValid }"
            >
              📱 Enviar por WhatsApp
            </button>
            <button
              type="button"
              @click="enviarPorEmail"
              class="btn-email"
              :disabled="!isCustomerDataValid"
              :class="{ 'btn-disabled': !isCustomerDataValid }"
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
import { computed } from 'vue'
import { useCart } from '../composables/useCart'
import { RESTAURANT_CONFIG } from '../config/restaurant'

const props = defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const {
  cartItems,
  customerData,
  removeFromCart,
  updateQuantity,
  clearCart,
  clearCustomerData,
  getItemSubtotal,
  cartTotal,
  cartItemCount,
  isCartEmpty,
  isCustomerDataValid,
} = useCart()

const cerrarModal = () => {
  emit('close')
}

const generarMensajePedido = () => {
  if (isCartEmpty.value) return ''

  // Generar texto del método de pago
  let metodoPagoTexto = ''
  if (customerData.value.metodoPago === 'efectivo') {
    metodoPagoTexto = '💵 Efectivo'
    if (customerData.value.efectivoOpcion === 'exacto') {
      metodoPagoTexto += ' (Pago exacto)'
    } else if (customerData.value.efectivoOpcion === 'vuelto') {
      const montoSolicitado = customerData.value.montoEfectivo || 0
      metodoPagoTexto += ` (Solicitó vuelto de S/${montoSolicitado})`
    } else if (customerData.value.efectivoOpcion === 'no-se') {
      metodoPagoTexto += ' (Aún no sabe si tiene exacto)'
    }
  } else if (customerData.value.metodoPago === 'yape') {
    metodoPagoTexto = '📱 Yape'
  } else if (customerData.value.metodoPago === 'plin') {
    metodoPagoTexto = '📲 Plin'
  }

  let mensaje = `🍽️ NUEVO PEDIDO MÚLTIPLE

👤 ${customerData.value.nombre}
📞 ${customerData.value.telefono}

🛒 PEDIDOS (${cartItemCount.value} items):`

  // Agregar cada item del carrito
  cartItems.value.forEach((item, index) => {
    mensaje += `

${index + 1}. ${item.name} (x${item.quantity})
   💰 ${RESTAURANT_CONFIG.currency}${item.price} c/u`

    if (item.includeEntrada && item.selectedEntrada) {
      mensaje += `
   🍲 Entrada: ${item.selectedEntrada}`
    }

    if (item.includeJuice) {
      mensaje += `
   🥤 Refresco (+${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.juicePrice})`
    }

    if (item.isCustomSalad) {
      if (item.customIngredients && item.customIngredients.length > 0) {
        mensaje += `
   🥗 Ingredientes: ${item.customIngredients.join(', ')}`
      }
      if (item.customDressing) {
        mensaje += `
   🥄 Aderezo: ${item.customDressing}`
      }
    }

    mensaje += `
   🍴 Cubiertos: ${item.includeCubiertos ? 'Sí' : 'No'}
   💵 Subtotal: ${RESTAURANT_CONFIG.currency}${getItemSubtotal(item)}`
  })

  mensaje += `

💳 PAGO: ${metodoPagoTexto}

📍 ENTREGA:
${customerData.value.direccion}`

  if (customerData.value.referencias) {
    mensaje += `
📌 Ref: ${customerData.value.referencias}`
  }

  if (customerData.value.comentarios) {
    mensaje += `

💬 COMENTARIOS:
${customerData.value.comentarios}`
  }

  mensaje += `

💰 TOTAL: ${RESTAURANT_CONFIG.currency}${cartTotal.value}

¡Gracias por tu pedido! 🌟`

  return mensaje
}

const enviarPorWhatsApp = () => {
  if (isCartEmpty.value || !isCustomerDataValid.value) {
    alert('❌ Por favor completa todos los campos requeridos antes de enviar el pedido.')
    return
  }

  const mensaje = generarMensajePedido()
  const whatsappUrl = `https://wa.me/51${RESTAURANT_CONFIG.socialMedia.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(whatsappUrl, '_blank')

  // Limpiar carrito y datos después del envío
  clearCart()
  clearCustomerData()
  cerrarModal()
}

const enviarPorEmail = () => {
  if (isCartEmpty.value || !isCustomerDataValid.value) {
    alert('❌ Por favor completa todos los campos requeridos antes de enviar el pedido.')
    return
  }

  // Generar información de método de pago
  let metodoPagoInfo: string = customerData.value.metodoPago || ''
  if (customerData.value.metodoPago === 'efectivo') {
    metodoPagoInfo = 'Efectivo'
    if (customerData.value.efectivoOpcion === 'exacto') {
      metodoPagoInfo += ' (Pago exacto)'
    } else if (customerData.value.efectivoOpcion === 'vuelto') {
      metodoPagoInfo += ` (Solicita vuelto de S/${customerData.value.montoEfectivo || 0})`
    } else if (customerData.value.efectivoOpcion === 'no-se') {
      metodoPagoInfo += ' (Aun no sabe si tiene exacto)'
    }
  } else if (customerData.value.metodoPago === 'yape') {
    metodoPagoInfo = 'Yape'
  } else if (customerData.value.metodoPago === 'plin') {
    metodoPagoInfo = 'Plin'
  }

  const subject = `Pedido Multiple - ${cartItemCount.value} items`
  let body = `Hola, me gustaria hacer un pedido multiple:

CLIENTE:
- Nombre: ${customerData.value.nombre}
- Telefono: ${customerData.value.telefono}

PRODUCTOS (${cartItemCount.value} items):`

  // Agregar cada item del carrito
  cartItems.value.forEach((item, index) => {
    body += `

${index + 1}. ${item.name} x${item.quantity}
- Precio: ${RESTAURANT_CONFIG.currency}${item.price} c/u`

    if (item.includeEntrada && item.selectedEntrada) {
      body += `
- Entrada: ${item.selectedEntrada}`
    }

    if (item.includeJuice) {
      body += `
- Refresco: ${RESTAURANT_CONFIG.currency}${RESTAURANT_CONFIG.juicePrice}`
    }

    if (item.isCustomSalad) {
      if (item.customIngredients && item.customIngredients.length > 0) {
        body += `
- Ingredientes: ${item.customIngredients.join(', ')}`
      }
      if (item.customDressing) {
        body += `
- Aderezo: ${item.customDressing}`
      }
    }

    body += `
- Cubiertos: ${item.includeCubiertos ? 'Si' : 'No'}
- Subtotal: ${RESTAURANT_CONFIG.currency}${getItemSubtotal(item)}`
  })

  body += `

PAGO: ${metodoPagoInfo}

ENTREGA:
- Direccion: ${customerData.value.direccion}`

  if (customerData.value.referencias) {
    body += `
- Referencias: ${customerData.value.referencias}`
  }

  if (customerData.value.comentarios) {
    body += `

COMENTARIOS:
${customerData.value.comentarios}`
  }

  body += `

TOTAL: ${RESTAURANT_CONFIG.currency}${cartTotal.value}

Gracias!`

  const mailtoUrl = `mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoUrl

  // Limpiar carrito y datos después del envío
  clearCart()
  clearCustomerData()
  cerrarModal()
}
</script>

<style scoped>
/* Reutilizar estilos del CheckoutModal original */
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
  max-width: 700px;
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

.cart-items {
  padding: 2rem 2.5rem;
  background: #f8fffe;
  border-bottom: 1px solid #e0e0e0;
}

.cart-items h3 {
  margin: 0 0 1.5rem 0;
  color: #2c5530;
  font-size: 1.8rem;
  font-weight: 600;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.empty-cart p {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.btn-continue {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4a7c59, #2c5530);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-continue:hover {
  background: linear-gradient(135deg, #5c8a6a, #4a7c59);
  transform: translateY(-2px);
}

.cart-item {
  background: white;
  border-radius: 12px;
  border: 1px solid #e8f5e8;
  margin-bottom: 1rem;
  overflow: hidden;
}

.item-info {
  padding: 1.5rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-name {
  margin: 0;
  color: #2c5530;
  font-size: 1.6rem;
  font-weight: 600;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.6rem;
  color: #e74c3c;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #ffe6e6;
  transform: scale(1.1);
}

.item-details {
  margin-bottom: 1rem;
}

.item-price {
  font-weight: 600;
  color: #228b22;
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
}

.item-extra {
  font-size: 1.2rem;
  color: #666;
  margin: 0.3rem 0;
}

.custom-salad-details {
  background: #f0f8f0;
  padding: 0.8rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}

.qty-btn {
  background: #4a7c59;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #2c5530;
  transform: scale(1.1);
}

.quantity {
  font-weight: 600;
  font-size: 1.4rem;
  color: #2c5530;
  min-width: 20px;
  text-align: center;
}

.subtotal {
  font-weight: 700;
  color: #228b22;
  font-size: 1.4rem;
}

.cart-total {
  text-align: right;
  margin-top: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #2c5530, #4a7c59);
  color: white;
  border-radius: 12px;
  font-size: 1.8rem;
}

.customer-form {
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

.required {
  color: #e74c3c;
  font-weight: 700;
  font-size: 1.4rem;
  margin-left: 0.2rem;
}

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

.btn-email:hover:not(.btn-disabled) {
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

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
    max-height: 95vh;
  }

  .modal-header,
  .cart-items,
  .customer-form {
    padding: 1.5rem;
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

  .quantity-controls {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .modal-header,
  .cart-items,
  .customer-form {
    padding: 1rem;
  }

  .item-info {
    padding: 1rem;
  }
}
</style>
