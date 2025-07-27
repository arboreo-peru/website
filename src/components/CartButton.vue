<template>
  <div class="cart-button-container">
    <button
      v-if="cartItemCount > 0"
      @click="openCart"
      class="cart-button"
      :class="{ bounce: justAdded }"
    >
      🛒
      <span class="cart-count">{{ cartItemCount }}</span>
      <span class="cart-total">{{ RESTAURANT_CONFIG.currency }}{{ cartTotal }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCart } from '../composables/useCart'
import { RESTAURANT_CONFIG } from '../config/restaurant'

const emit = defineEmits<{
  openCart: []
}>()

const { cartItemCount, cartTotal } = useCart()
const justAdded = ref(false)

// Animación cuando se agrega un item
watch(cartItemCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    justAdded.value = true
    setTimeout(() => {
      justAdded.value = false
    }, 600)
  }
})

const openCart = () => {
  emit('openCart')
}
</script>

<style scoped>
.cart-button-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}

.cart-button {
  background: linear-gradient(135deg, #4a7c59, #2c5530);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 1.5rem;
  font-size: 1.8rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(74, 124, 89, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 120px;
  justify-content: center;
}

.cart-button:hover {
  background: linear-gradient(135deg, #5c8a6a, #4a7c59);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(74, 124, 89, 0.5);
}

.cart-button.bounce {
  animation: bounce 0.6s ease-in-out;
}

.cart-count {
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -8px;
  border: 2px solid white;
}

.cart-total {
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .cart-button-container {
    bottom: 1rem;
    right: 1rem;
  }

  .cart-button {
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    min-width: 100px;
  }

  .cart-total {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .cart-button {
    padding: 0.7rem 1rem;
    font-size: 1.4rem;
    min-width: 80px;
  }

  .cart-total {
    font-size: 1rem;
  }

  .cart-count {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
}
</style>
