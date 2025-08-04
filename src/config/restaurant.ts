// ========================================
// 📝 INSTRUCCIONES PARA ACTUALIZAR PRECIOS
// ========================================
// Para cambiar los precios base, modifica SOLO los números:
// - baseMenuPrice: Precio base de los platos del menú (actualmente 20)
// - baseSaladPrice: Precio base de las ensaladas (actualmente 21)
// - juicePrice: Precio adicional del refresco (actualmente 1)

// Configuración global del restaurante
export const RESTAURANT_CONFIG = {
  name: 'Arboreo Peru',
  baseMenuPrice: 20, // ← CAMBIAR AQUÍ: Precio base platos del menú
  baseSaladPrice: 21, // ← CAMBIAR AQUÍ: Precio base ensaladas
  currency: 'S/.',
  juicePrice: 1, // ← CAMBIAR AQUÍ: Precio adicional del refresco
  // ... resto de configuración sin cambios
  horario: 'Lun a Sab: 11:00 AM - 2:00 PM',
  socialMedia: {
    facebook: 'https://www.facebook.com/arboreo.peru/?locale=es_LA',
    twitter: 'https://x.com/arboreoperu',
    instagram: 'https://www.instagram.com/arboreo.peru/?hl=es',
    whatsapp: '927760986',
    email: 'arboreoperu@gmail.com',
  },
  location: {
    address: 'Juan Valer Sandoval 733-737, Pueblo Libre 15084',
    detail: 'Mercado Cueva - Segundo Piso',
    district: 'Pueblo Libre',
    city: 'Lima',
    country: 'Perú',
    zipCode: '15084',
    // URL para Google Maps (opcional)
    googleMapsUrl: 'https://maps.app.goo.gl/P35jwtN8tf4yTZj66',
    // Coordenadas (si las tienes)
    coordinates: {
      lat: -2.0775306,
      lng: -77.0746111,
    },
  },
}

// ✅ NUEVO: Opciones de entrada disponibles solo para platos del menú
export const ENTRADA_OPTIONS = [
  'Crema de Ocopa',
  'Ensalada de Frutas',
  'Ensalada Fresca',
  'Ensalada Cocida',
  'Sin entrada',
]

export const MENU_OPTIONS = [
  {
    name: 'Aji de Gallina',
    description:
      'Por defecto es arroz integral, se puede cambiar por verduras cocidas o arroz blanco (especificar por WhatsApp o Correo).',
    price: 20,
    includeEntrada: true, // ✅ Indica que este plato incluye entrada
    image: 'AjiDeGallina.jpeg',
  },
  {
    name: 'Seco a la Norteña de Pollo con Frejol',
    description:
      'Por defecto es arroz integral, se puede cambiar por verduras cocidas o arroz blanco (especificar por WhatsApp o Correo).',
    price: 20,
    includeEntrada: true,
    image: 'SecoNorteno.jpeg',
  },
  // ========================================
  // 📝 PARA AGREGAR UN NUEVO PLATO DEL MENÚ:
  // ========================================
  // 1. Descomenta las líneas de abajo (quita los //)
  // 2. Reemplaza los valores entre comillas y números
  // 3. Guarda el archivo
  //
  // {
  //   name: 'NOMBRE_DEL_PLATO',                    // ← Ej: 'Ceviche Mixto'
  //   description: 'DESCRIPCION_DEL_PLATO',       // ← Ej: 'Fresco ceviche con pescado y mariscos'
  //   price: 00,                                   // ← Ej: 28 (sin S/., solo número)
  //   includeEntrada: true,                        // ← true si incluye entrada, false si no
  // },
]

export const SALAD_OPTIONS = [
  {
    name: 'Chicken crispy',
    description:
      'Lechuga crespa, palta, choclo, zanahoria cocida y beterraga, pollo empanizado con vinagreta Honey mustard',
    price: 21,
    image: 'ChickenCrispy.jpg',
  },
  {
    name: 'César',
    description:
      'Lechuga crespa, queso parmesano, crutones y palta, pollo a la plancha con vinagreta César',
    price: 21,
    image: 'Cesar.jpg',
  },
  {
    name: 'Cocida',
    description:
      'Base de papa cocida en cubos, brócoli, zanahoria cocida, vainita, huevo y palta con pollo a la plancha con vinagreta de Mayonesa',
    price: 21,
    image: 'Cocida.jpg',
  },
  {
    name: 'Andina',
    description:
      'Mix de espinaca y lechuga, quinua, papa cocida en cubos, choclo desgranado, cebolla blanca, queso fresco y pollo empanizado, con vinagreta de limón',
    price: 21,
    image: 'Andina.jpg',
  },
  {
    name: 'Oriental',
    description:
      'Mix de espinaca y lechuga, palta en trozos, pepino, zanahoria rallada, wantán frito, semillas de ajonjolí y pollo empanizado acompañado de nuestra vinagreta oriental',
    price: 21,
    image: 'Oriental.jpg',
  },
  {
    name: 'Atun',
    description:
      'Lechuga crespa, palta, choclo desgranado, tomate, zanahoria rallada y filete de atún en conserva con nuestra vinagreta de Limón',
    price: 21,
    image: 'Atun.jpg',
  },
  // ========================================
  // 📝 PARA AGREGAR UNA NUEVA ENSALADA:
  // ========================================
  // 1. Descomenta las líneas de abajo (quita los //)
  // 2. Reemplaza los valores entre comillas y números
  // 3. Agrega la imagen en la carpeta public/images/
  // 4. Guarda el archivo
  //
  // {
  //   name: 'NOMBRE_DE_LA_ENSALADA',              // ← Ej: 'Mediterránea'
  //   description: 'DESCRIPCION_DE_LA_ENSALADA', // ← Ej: 'Lechuga, tomate, aceitunas...'
  //   price: 00,                                  // ← Ej: 23 (sin S/., solo número)
  //   image: 'NOMBRE_IMAGEN.jpg',                 // ← Ej: 'Mediterranea.jpg'
  // },
]

// ========================================
// 🥬 INSTRUCCIONES PARA INGREDIENTES DEL SALADBAR
// ========================================
// Para agregar ingredientes, simplemente añade el nombre entre comillas y coma al final:
// Ejemplo: 'Nuevo Ingrediente',

export const SALAD_INGREDIENTS = {
  // BASES (ingredientes principales)
  bases: [
    'Lechuga Crespa',
    'Mix Espinaca y lechuga',
    'Fideos',
    'Papa',
    // 'NUEVA_BASE',                              // ← Agregar aquí nuevas bases no olvidar la , al final
  ],

  // INGREDIENTES ADICIONALES
  ingredientes: [
    'Palta',
    'Aceitunas verdes',
    'Ajonjolí (Semillas)',
    'Beterraga',
    'Brócoli',
    'Cebolla blanca',
    'Choclo desgranado',
    'Crutones',
    'Huevos cocidos',
    'Papa',
    'Pepino',
    'Queso fresco',
    'Queso parmesano',
    'Quinua',
    'Tomate',
    'Vainita',
    'Wantán',
    'Zanahoria cocida',
    'Zanahoria rallada',
    // 'NUEVO_INGREDIENTE',                       // ← Agregar aquí nuevos ingredientes no olvidar la , al final
  ],

  // PROTEÍNAS
  proteinas: [
    'Pollo empanizado',
    'Pollo a la plancha',
    'Conserva de atún',
    // 'NUEVA_PROTEINA',                          // ← Agregar aquí nuevas proteínas no olvidar la , al final
  ],

  // VINAGRETAS
  vinagretas: [
    'Honey Mustard',
    'De limón',
    'De Mayonesa',
    'César',
    'Oriental',
    'Balsámica',
    'Finas Hierbas',
    // 'NUEVA_VINAGRETA',                         // ← Agregar aquí nuevas vinagretas  no olvidar la , al final
  ],
}

// ========================================
// ⚠️ NO MODIFICAR LO DE ABAJO
// ========================================
// Estas son funciones del sistema, no las cambies a menos que sepas programación

export const getMenuItemPrice = (item: (typeof MENU_OPTIONS)[0], includeRefresh = false) => {
  const basePrice = item.price ?? RESTAURANT_CONFIG.baseMenuPrice
  return basePrice + (includeRefresh ? RESTAURANT_CONFIG.juicePrice : 0)
}

export const getSaladItemPrice = (item: (typeof SALAD_OPTIONS)[0], includeRefresh = false) => {
  const basePrice = item.price ?? RESTAURANT_CONFIG.baseSaladPrice
  return basePrice + (includeRefresh ? RESTAURANT_CONFIG.juicePrice : 0)
}

export const getCustomSaladPrice = (includeRefresh = false) => {
  return RESTAURANT_CONFIG.baseSaladPrice + (includeRefresh ? RESTAURANT_CONFIG.juicePrice : 0)
}

// ✅ NUEVO: Función helper para verificar si un item incluye entrada
export const itemIncludesEntrada = (item: (typeof MENU_OPTIONS)[0]) => {
  return item.includeEntrada ?? false
}
