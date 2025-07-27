// Configuración global del restaurante
export const RESTAURANT_CONFIG = {
  name: 'Arboreo Peru',
  baseMenuPrice: 20,
  baseSaladPrice: 21,
  currency: 'S/.',
  juicePrice: 1,
  socialMedia: {
    facebook: 'https://facebook.com/saladbar',
    twitter: 'https://twitter.com/saladbar',
    instagram: 'https://instagram.com/saladbar',
    whatsapp: '957293769',
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
  'Sopa del día',
  'Crema de verduras',
  'Consomé de pollo',
  'Sopa de quinua',
  'Ensalada verde',
  'Sin entrada',
]

// ✅ NUEVO: Platos del día (menú principal del restaurante)
export const MENU_OPTIONS = [
  {
    name: 'Arroz con Pollo',
    description:
      'Delicioso arroz con pollo tradicional peruano, acompañado de verduras frescas y salsa criolla',
    price: 18,
    includeEntrada: true, // ✅ Indica que este plato incluye entrada
  },
  {
    name: 'Tallarines Verdes',
    description: 'Pasta en salsa de albahaca y espinaca, acompañada de bistec a lo pobre',
    price: 16,
    includeEntrada: true,
  },
  {
    name: 'Ají de Gallina',
    description: 'Tradicional ají de gallina con papa amarilla y aceitunas negras',
    price: 17,
    includeEntrada: true,
  },
  {
    name: 'Lomo Saltado',
    description: 'Clásico lomo saltado con papas fritas y arroz blanco',
    price: 22,
    includeEntrada: true,
  },
  {
    name: 'Seco de Cabrito',
    description: 'Tierno cabrito guisado en salsa de cilantro con frejoles y yuca',
    price: 25,
    includeEntrada: true,
  },
]

// ✅ RENOMBRADO: Ensaladas específicas de la carta (antes MENU_OPTIONS)
export const SALAD_OPTIONS = [
  {
    name: 'Chicken crispy',
    description:
      'Lechuga crespa, palta, choclo, zanahoria cocida y beterraga, pollo empanizado con vinagreta Honey mustard',
    price: 21,
  },
  {
    name: 'César',
    description:
      'Lechuga crespa, queso parmesano, crutones y palta, pollo a la plancha con vinagreta César',
    price: 21,
  },
  {
    name: 'Cocida',
    description:
      'Base de papa cocida en cubos, brócoli, zanahoria cocida, vainita, huevo y palta con pollo a la plancha con vinagreta de Mayonesa',
    price: 21,
  },
  {
    name: 'Andina',
    description:
      'Mix de espinaca y lechuga, quinua, papa cocida en cubos, choclo desgranado, cebolla blanca, queso fresco y pollo empanizado, con vinagreta de limón',
    price: 21,
  },
  {
    name: 'Oriental',
    description:
      'Mix de espinaca y lechuga, palta en trozos, pepino, zanahoria rallada, wantán frito, semillas de ajonjolí y pollo empanizado acompañado de nuestra vinagreta oriental',
    price: 21,
  },
  {
    name: 'Atun',
    description:
      'Lechuga crespa, palta, choclo desgranado, tomate, zanahoria rallada y filete de atún en conserva con nuestra vinagreta de Limón',
    price: 21,
  },
]

// ✅ RENOMBRADO: Ingredientes para personalizar ensaladas (antes SALAD_OPTIONS)
export const SALAD_INGREDIENTS = {
  bases: ['Lechuga Crespa', 'Mix Espinaca y lechuga', 'Fideos', 'Papa'],
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
  ],
  proteinas: ['Pollo empanizado', 'Pollo a la plancha', 'Conserva de atún'],
  vinagretas: [
    'Honey Mustard',
    'De limón',
    'De Mayonesa',
    'César',
    'Oriental',
    'Balsámica',
    'Finas Hierbas',
  ],
}

// ✅ Funciones helper para calcular precios
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
