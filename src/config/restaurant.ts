// Configuración global del restaurante
export const RESTAURANT_CONFIG = {
  name: 'Arboreo Peru',
  whatsapp: '912447456',
  email: 'arboreo-peru@gmail.com',
  price: 21,
  currency: 'S/.',
  socialMedia: {
    facebook: 'https://facebook.com/saladbar',
    twitter: 'https://twitter.com/saladbar',
    instagram: 'https://instagram.com/saladbar',
  },
}

// Opciones del Salad Bar
export const SALAD_OPTIONS = {
  bases: ['Lechuga Crespa', 'Mix Espinaca y lechuga', 'Fideos'],
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
  proteinas: [
    'Pollo empanizado',
    'Pollo a la plancha',
    'Conserva de atún',
    'Champiñones al grill',
    'Jamón de pavita',
    'Conserva de atún',
  ],
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

// Carta del restaurante
export const MENU_ITEMS = [
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
