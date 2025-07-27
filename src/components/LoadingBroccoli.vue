<template>
  <div v-if="isVisible" class="loading-overlay">
    <div class="loading-container">
      <!-- Brócoli animado -->
      <div class="broccoli-animation">
        <div class="broccoli">🥦</div>
        <div class="bounce-shadow"></div>
      </div>

      <!-- Texto de carga -->
      <div class="loading-text">
        <span class="loading-message">{{ loadingMessage }}</span>
        <div class="loading-dots">
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  isVisible: boolean
}>()

const loadingMessages = [
  'Preparando ingredientes frescos',
  'Mezclando sabores deliciosos',
  'Cortando verduras al momento',
  'Agregando amor a tu pedido',
  'Seleccionando los mejores productos',
]

const loadingMessage = ref('')

onMounted(() => {
  // Rotar mensajes cada 2 segundos
  const rotateMessages = () => {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length)
    loadingMessage.value = loadingMessages[randomIndex]
  }

  rotateMessages() // Mensaje inicial

  const interval = setInterval(() => {
    if (props.isVisible) {
      rotateMessages()
    }
  }, 2000)

  // Limpiar intervalo cuando el componente se desmonte
  return () => clearInterval(interval)
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8fffe 0%, #ecf7f5 50%, #e0f2eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-container {
  text-align: center;
  padding: 2rem;
}

.broccoli-animation {
  position: relative;
  margin-bottom: 2rem;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.broccoli {
  font-size: 4rem;
  animation: bounce 1.2s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(44, 85, 48, 0.3));
  position: relative;
  z-index: 2;
  will-change: transform;
  backface-visibility: hidden;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-30px) scale(1.1);
  }
  60% {
    transform: translateY(-15px) scale(1.05);
  }
}

/* Animación más sutil para móviles */
@media (max-width: 480px) {
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0) scale(1);
    }
    40% {
      transform: translateY(-20px) scale(1.08);
    }
    60% {
      transform: translateY(-10px) scale(1.04);
    }
  }
}

@media (max-width: 360px) {
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0) scale(1);
    }
    40% {
      transform: translateY(-15px) scale(1.06);
    }
    60% {
      transform: translateY(-8px) scale(1.03);
    }
  }
}

.bounce-shadow {
  position: absolute;
  bottom: 10px;
  width: 60px;
  height: 20px;
  background: radial-gradient(ellipse, rgba(44, 85, 48, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: shadow-pulse 1.2s ease-in-out infinite;
  z-index: 1;
}

@keyframes shadow-pulse {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  40% {
    transform: scale(0.7);
    opacity: 0.6;
  }
  60% {
    transform: scale(0.85);
    opacity: 0.45;
  }
}

/* Sombra más sutil para móviles */
@media (max-width: 480px) {
  @keyframes shadow-pulse {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: scale(1);
      opacity: 0.25;
    }
    40% {
      transform: scale(0.75);
      opacity: 0.5;
    }
    60% {
      transform: scale(0.88);
      opacity: 0.35;
    }
  }
}

@media (max-width: 360px) {
  @keyframes shadow-pulse {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: scale(1);
      opacity: 0.2;
    }
    40% {
      transform: scale(0.8);
      opacity: 0.4;
    }
    60% {
      transform: scale(0.9);
      opacity: 0.3;
    }
  }
}

.loading-text {
  color: #2c5530;
  font-family: inherit;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.loading-message {
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  opacity: 0.9;
  animation: textFade 2s ease-in-out infinite;
  word-wrap: break-word;
  text-align: center;
}

@keyframes textFade {
  0%,
  100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.6;
  }
}

.loading-dots {
  display: inline-flex;
  gap: 0.2rem;
}

.dot {
  font-size: 2rem;
  font-weight: bold;
  color: #4a7c59;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  30% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Efectos adicionales para hacer más dinámico */
.broccoli-animation::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 3px solid transparent;
  border-top-color: #4a7c59;
  border-right-color: #4a7c59;
  border-radius: 50%;
  animation: rotate 3s linear infinite;
  opacity: 0.3;
  will-change: transform;
  backface-visibility: hidden;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .loading-container {
    padding: 1.5rem;
  }

  .broccoli {
    font-size: 3rem;
  }

  .loading-message {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  .broccoli-animation {
    height: 90px;
    margin-bottom: 1.5rem;
  }

  .broccoli-animation::before {
    width: 90px;
    height: 90px;
    border-width: 2px;
  }

  .bounce-shadow {
    width: 45px;
    height: 15px;
    bottom: 8px;
  }

  .dot {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .loading-overlay {
    padding: 1rem;
  }

  .loading-container {
    padding: 1rem;
    max-width: 280px;
    margin: 0 auto;
  }

  .broccoli {
    font-size: 2.2rem;
  }

  .loading-message {
    font-size: 1rem;
    margin-bottom: 0.6rem;
    line-height: 1.3;
    padding: 0 0.5rem;
  }

  .broccoli-animation {
    height: 70px;
    margin-bottom: 1rem;
  }

  .broccoli-animation::before {
    width: 70px;
    height: 70px;
    border-width: 2px;
  }

  .bounce-shadow {
    width: 35px;
    height: 12px;
    bottom: 6px;
  }

  .dot {
    font-size: 1.2rem;
    gap: 0.1rem;
  }

  .loading-dots {
    gap: 0.1rem;
  }
}

@media (max-width: 360px) {
  .loading-container {
    padding: 0.8rem;
    max-width: 240px;
  }

  .broccoli {
    font-size: 1.8rem;
  }

  .loading-message {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .broccoli-animation {
    height: 60px;
    margin-bottom: 0.8rem;
  }

  .broccoli-animation::before {
    width: 60px;
    height: 60px;
    border-width: 1px;
  }

  .bounce-shadow {
    width: 28px;
    height: 10px;
    bottom: 5px;
  }

  .dot {
    font-size: 1rem;
  }
}

/* Para pantallas muy angostas (iPhone SE, etc.) */
@media (max-width: 320px) {
  .loading-overlay {
    padding: 0.5rem;
  }

  .loading-container {
    padding: 0.5rem;
    max-width: 200px;
  }

  .broccoli {
    font-size: 1.5rem;
  }

  .loading-message {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }

  .broccoli-animation {
    height: 50px;
    margin-bottom: 0.6rem;
  }

  .broccoli-animation::before {
    width: 50px;
    height: 50px;
    border-width: 1px;
  }

  .bounce-shadow {
    width: 22px;
    height: 8px;
    bottom: 4px;
  }

  .dot {
    font-size: 0.9rem;
  }

  .loading-dots {
    gap: 0.05rem;
  }
}

/* Animación extra sutil para pantallas muy pequeñas */
@media (max-width: 320px) {
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0) scale(1);
    }
    40% {
      transform: translateY(-10px) scale(1.04);
    }
    60% {
      transform: translateY(-5px) scale(1.02);
    }
  }

  @keyframes shadow-pulse {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: scale(1);
      opacity: 0.15;
    }
    40% {
      transform: scale(0.85);
      opacity: 0.3;
    }
    60% {
      transform: scale(0.92);
      opacity: 0.22;
    }
  }
}
</style>
