import { ref, readonly } from 'vue'

// Estado global de carga
const isLoading = ref(false)
const loadingTimeout = ref<number | null>(null)

export const useLoading = () => {
  // Mostrar loading con duración mínima
  const showLoading = (minDuration = 800) => {
    isLoading.value = true

    // Limpiar timeout anterior si existe
    if (loadingTimeout.value) {
      clearTimeout(loadingTimeout.value)
    }

    // Establecer duración mínima
    loadingTimeout.value = setTimeout(() => {
      isLoading.value = false
    }, minDuration)
  }

  // Ocultar loading inmediatamente
  const hideLoading = () => {
    if (loadingTimeout.value) {
      clearTimeout(loadingTimeout.value)
    }
    isLoading.value = false
  }

  // Mostrar loading con promesa (útil para navegación)
  const withLoading = async <T>(promise: Promise<T>, minDuration = 800): Promise<T> => {
    showLoading(minDuration)

    try {
      const result = await promise
      return result
    } finally {
      // El timeout se encargará de ocultar el loading después de minDuration
    }
  }

  return {
    isLoading: readonly(isLoading),
    showLoading,
    hideLoading,
    withLoading,
  }
}
