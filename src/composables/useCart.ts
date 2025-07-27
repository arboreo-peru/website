import { ref, computed } from 'vue'
import { RESTAURANT_CONFIG } from '../config/restaurant'

export interface CartItem {
  id: string
  name: string
  price: number
  description?: string
  includeEntrada?: boolean
  selectedEntrada?: string
  includeJuice: boolean
  includeCubiertos: boolean
  quantity: number
  // Para ensaladas personalizadas
  isCustomSalad?: boolean
  customIngredients?: string[]
  customDressing?: string
}

export interface CustomerData {
  nombre: string
  telefono: string
  metodoPago: 'efectivo' | 'yape' | 'plin' | ''
  efectivoOpcion: 'exacto' | 'vuelto' | 'no-se' | ''
  montoEfectivo: number | null
  direccion: string
  referencias: string
  comentarios: string
}

// Estado global del carrito
const cartItems = ref<CartItem[]>([])
const customerData = ref<CustomerData>({
  nombre: '',
  telefono: '',
  metodoPago: '',
  efectivoOpcion: '',
  montoEfectivo: null,
  direccion: '',
  referencias: '',
  comentarios: '',
})

export function useCart() {
  // Generar ID único para cada item
  const generateId = () => {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Agregar item al carrito
  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const newItem: CartItem = {
      ...item,
      id: generateId(),
      quantity: 1,
    }
    cartItems.value.push(newItem)
  }

  // Remover item del carrito
  const removeFromCart = (itemId: string) => {
    const index = cartItems.value.findIndex((item) => item.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  // Actualizar cantidad de un item
  const updateQuantity = (itemId: string, quantity: number) => {
    const item = cartItems.value.find((item) => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  // Limpiar carrito
  const clearCart = () => {
    cartItems.value = []
  }

  // Limpiar datos del cliente
  const clearCustomerData = () => {
    customerData.value = {
      nombre: '',
      telefono: '',
      metodoPago: '',
      efectivoOpcion: '',
      montoEfectivo: null,
      direccion: '',
      referencias: '',
      comentarios: '',
    }
  }

  // Calcular subtotal de un item
  const getItemSubtotal = (item: CartItem) => {
    const basePrice = item.price
    const juicePrice = item.includeJuice ? RESTAURANT_CONFIG.juicePrice : 0
    return (basePrice + juicePrice) * item.quantity
  }

  // Computed properties
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + getItemSubtotal(item)
    }, 0)
  })

  const cartItemCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })

  const isCartEmpty = computed(() => {
    return cartItems.value.length === 0
  })

  // Validación del formulario del cliente
  const isCustomerDataValid = computed(() => {
    return (
      customerData.value.nombre.trim() !== '' &&
      customerData.value.telefono.trim() !== '' &&
      customerData.value.metodoPago !== '' &&
      customerData.value.direccion.trim() !== '' &&
      (customerData.value.metodoPago !== 'efectivo' || customerData.value.efectivoOpcion !== '')
    )
  })

  return {
    // Estado
    cartItems: computed(() => cartItems.value),
    customerData,

    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearCustomerData,

    // Helpers
    getItemSubtotal,
    generateId,

    // Computed
    cartTotal,
    cartItemCount,
    isCartEmpty,
    isCustomerDataValid,
  }
}
