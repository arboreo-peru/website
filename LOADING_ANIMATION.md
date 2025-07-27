# 🥦 Animación de Loading con Brócoli

## Descripción

Implementación de una animación de carga personalizada con un brócoli saltando que aparece durante las transiciones entre páginas y la carga inicial de la aplicación.

## Componentes Implementados

### 1. `LoadingBroccoli.vue`

Componente principal que muestra la animación de loading.

**Características:**

- 🥦 Brócoli animado con efecto de rebote
- 💫 Sombra dinámica que sincroniza con el salto
- 🔄 Anillo giratorio de fondo
- 📝 Mensajes dinámicos que rotan cada 2 segundos
- ⚡ Puntos animados con efecto de pulso
- 📱 Completamente responsive

**Mensajes Incluidos:**

- "Preparando ingredientes frescos"
- "Mezclando sabores deliciosos"
- "Cortando verduras al momento"
- "Agregando amor a tu pedido"
- "Seleccionando los mejores productos"

### 2. `useLoading.ts` (Composable)

Hook de Vue para manejar el estado global de loading.

**Funciones:**

- `showLoading(minDuration)`: Muestra el loading por un tiempo mínimo
- `hideLoading()`: Oculta el loading inmediatamente
- `withLoading(promise, minDuration)`: Envuelve promesas con loading
- `isLoading`: Estado reactivo del loading

### 3. Integración con Vue Router

El loading se activa automáticamente en las siguientes situaciones:

**Navegación entre páginas:**

- Se activa en `router.beforeEach()`
- Duración mínima de 1 segundo
- Solo si la ruta de destino es diferente

**Enlaces actualizados:**

- NavBar: Todos los enlaces de navegación
- HomeView: Botones CTA y enlaces del footer
- CartaView: Enlace a ensaladas
- SaladView: Enlace a personalización

**Carga inicial:**

- Se activa automáticamente al cargar la aplicación
- Duración de 800ms para la primera carga

## Animaciones CSS

### Brócoli Principal

```css
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
```

### Sombra Dinámica

```css
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
```

### Anillo Giratorio

```css
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

### Puntos de Carga

```css
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
```

## Personalización

### Duración del Loading

```typescript
// Cambiar duración por defecto en router/index.ts
showLoading(1500) // 1.5 segundos

// O en enlaces específicos
navigateWithLoading('/ruta', 2000) // 2 segundos
```

### Mensajes Personalizados

Editar el array `loadingMessages` en `LoadingBroccoli.vue`:

```typescript
const loadingMessages = [
  'Tu mensaje personalizado 1',
  'Tu mensaje personalizado 2',
  // ... más mensajes
]
```

### Colores y Estilos

Los colores siguen el tema del restaurante:

- Verde principal: `#2c5530`, `#4a7c59`
- Fondo gradiente: `#f8fffe` → `#ecf7f5` → `#e0f2eb`
- Sombras con tema verde natural

## Responsive Design

### Desktop (>768px)

- Brócoli: 4rem (64px)
- Texto: 1.4rem
- Anillo: 120px

### Tablet (768px)

- Brócoli: 3rem (48px)
- Texto: 1.2rem
- Anillo: 100px

### Mobile (480px)

- Brócoli: 2.5rem (40px)
- Texto: 1.1rem
- Padding reducido

## Uso Avanzado

### Loading Manual

```typescript
import { useLoading } from '@/composables/useLoading'

const { showLoading, hideLoading } = useLoading()

// Mostrar loading manual
showLoading(2000)

// Ocultar loading manual
hideLoading()
```

### Loading con Promesas

```typescript
const { withLoading } = useLoading()

// Envolver una operación async
const resultado = await withLoading(
  fetch('/api/datos'),
  1500, // mínimo 1.5 segundos
)
```

## Mejoras Futuras Sugeridas

1. **Múltiples Animaciones**: Rotación de diferentes vegetales
2. **Sonidos**: Efectos de sonido opcionales
3. **Progreso**: Barra de progreso para cargas largas
4. **Temas**: Diferentes colores según la sección
5. **Persistencia**: Recordar preferencias del usuario

## Performance

- **Peso**: Mínimo (solo CSS y emojis)
- **Renderizado**: Optimizado con `transform` y `opacity`
- **Memoria**: Estado global compartido
- **Animaciones**: Hardware-accelerated con `will-change`

El sistema de loading mejora significativamente la experiencia del usuario proporcionando feedback visual durante las transiciones, manteniendo el tema natural y divertido del restaurante de ensaladas.
