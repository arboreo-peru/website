<template>
  <div v-if="isVisible" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>📋 Solicitar {{ selectedPlan?.name }}</h2>
        <button @click="cerrarModal" class="close-btn">✕</button>
      </div>

      <div v-if="selectedPlan" class="plan-summary">
        <div class="plan-info">
          <div class="plan-icon">{{ selectedPlan.icon }}</div>
          <div class="plan-details">
            <h3>{{ selectedPlan.name }}</h3>
            <div class="plan-price">{{ RESTAURANT_CONFIG.currency }}{{ selectedPlan.price }}</div>
            <div class="plan-benefits">
              <div v-for="benefit in selectedPlan.benefits" :key="benefit" class="benefit-item">
                ✓ {{ benefit }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-options">
        <h3>¿Cómo prefieres solicitar tu plan?</h3>
        <p class="contact-subtitle">Elige tu método de contacto preferido</p>

        <div class="contact-buttons">
          <button @click="enviarPorWhatsApp" class="contact-btn whatsapp-btn">
            <div class="btn-icon">📱</div>
            <div class="btn-content">
              <div class="btn-title">WhatsApp</div>
              <div class="btn-subtitle">Respuesta inmediata</div>
              <div class="btn-number">+51 {{ RESTAURANT_CONFIG.socialMedia.whatsapp }}</div>
            </div>
          </button>

          <button @click="enviarPorEmail" class="contact-btn email-btn">
            <div class="btn-icon">📧</div>
            <div class="btn-content">
              <div class="btn-title">Email</div>
              <div class="btn-subtitle">Respuesta en 24h</div>
              <div class="btn-email">{{ RESTAURANT_CONFIG.socialMedia.email }}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RESTAURANT_CONFIG } from '../config/restaurant'

// Props
const props = defineProps<{
  isVisible: boolean
  selectedPlan: {
    name: string
    price: number
    icon: string
    benefits: string[]
  } | null
}>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// Funciones
const cerrarModal = () => {
  emit('close')
}

const enviarPorWhatsApp = () => {
  if (!props.selectedPlan) return

  const mensaje = generarMensajePlan()
  const whatsappUrl = `https://wa.me/51${RESTAURANT_CONFIG.socialMedia.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(whatsappUrl, '_blank')
  cerrarModal()
}

const enviarPorEmail = () => {
  if (!props.selectedPlan) return

  const mensaje = generarMensajePlan()
  const subject = `Solicitud de ${props.selectedPlan.name} - Arbóreo Peru`
  const mailtoUrl = `mailto:${RESTAURANT_CONFIG.socialMedia.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mensaje)}`
  window.location.href = mailtoUrl
  cerrarModal()
}

const generarMensajePlan = () => {
  if (!props.selectedPlan) return ''

  return `¡Hola! Me interesa solicitar el siguiente plan de comidas:

 *${props.selectedPlan.name}*
 Precio: ${RESTAURANT_CONFIG.currency}${props.selectedPlan.price}

 *Beneficios incluidos:*
${props.selectedPlan.benefits.map((benefit) => `✓ ${benefit}`).join('\n')}

 *Ubicación del restaurante:*
${RESTAURANT_CONFIG.location.address}
${RESTAURANT_CONFIG.location.detail}
${RESTAURANT_CONFIG.location.district}, ${RESTAURANT_CONFIG.location.city}

Por favor, respóndeme para coordinar:
• Método de pago
• Fechas de entrega
• Detalles adicionales

¡Gracias por la atención!

*Arbóreo Peru - Comida saludable a tu medida*`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 2px solid #e8f5e8;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: 1.8rem;
  color: #2c5530;
  margin: 0;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
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
  background: #f5f5f5;
  color: #333;
  transform: scale(1.1);
}

.plan-summary {
  padding: 0 2rem 1.5rem;
  margin-bottom: 1.5rem;
}

.plan-info {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%);
  padding: 2rem;
  border-radius: 15px;
  border: 2px solid #e8f5e8;
}

.plan-icon {
  font-size: 3rem;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  flex-shrink: 0;
}

.plan-details h3 {
  font-size: 1.6rem;
  color: #2c5530;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.plan-price {
  font-size: 1.8rem;
  font-weight: 800;
  color: #4caf50;
  margin-bottom: 1rem;
}

.plan-benefits {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.benefit-item {
  color: #2c5530;
  font-size: 1.1rem;
  font-weight: 500;
}

.contact-options {
  padding: 0 2rem 2rem;
}

.contact-options h3 {
  font-size: 1.5rem;
  color: #2c5530;
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 700;
}

.contact-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  text-align: left;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.whatsapp-btn {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
}

.whatsapp-btn:hover {
  background: linear-gradient(135deg, #20b858, #0f6b5f);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
}

.email-btn {
  background: linear-gradient(135deg, #ea4335, #d33b2c);
  color: white;
}

.email-btn:hover {
  background: linear-gradient(135deg, #d33b2c, #b52d20);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(234, 67, 53, 0.4);
}

.btn-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.btn-content {
  flex: 1;
}

.btn-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.btn-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.3rem;
}

.btn-number,
.btn-email {
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.95;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
  }

  .plan-summary {
    padding: 0 1.5rem 1.5rem;
  }

  .plan-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }

  .plan-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .contact-options {
    padding: 0 1.5rem 1.5rem;
  }

  .contact-btn {
    padding: 1.2rem;
    gap: 1rem;
  }

  .btn-icon {
    font-size: 2rem;
  }

  .btn-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .plan-info {
    padding: 1rem;
  }

  .contact-btn {
    padding: 1rem;
    gap: 0.8rem;
  }

  .btn-icon {
    font-size: 1.8rem;
  }
}
</style>
