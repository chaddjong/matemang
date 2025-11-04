export type SizeOption = { label: string; addPrice?: number };
export type ToppingOption = { label: string; addPrice: number };

export type MenuItem = {
  id: number;
  name: string;
  price: number; // base price
  image: string;
  category: string;
  subcategory?: string;

  // optional features
  sizes?: SizeOption[]; // single choice
  toppings?: ToppingOption[]; // single choice
  sugarLevels?: string[]; // optional, single choice
};

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 1,
    name: 'Hot Coffee',
    price: 5000,
    image: '/menu/kopi.jpg',
    category: 'Coffee',
    // example: no sizes/toppings for simple item
  },
  {
    id: 2,
    name: 'Coffee Milk',
    price: 10000,
    image: '/menu/kopi.jpg',
    category: 'Coffee',
    sizes: [
      { label: 'Small (Hot)' },
      { label: 'Medium (Ice)', addPrice: 2000 },
      { label: 'Large (Ice)', addPrice: 4000 },
    ],
    toppings: [
      { label: 'Pearl Boba', addPrice: 2000 },
      { label: 'Coconut Jelly', addPrice: 3000 },
      { label: 'Coffee Jelly', addPrice: 4000 },
    ],
    sugarLevels: ['Less Sugar', 'Normal Sugar'],
  },
  {
    id: 3,
    name: 'Kopi Susu Aren',
    price: 10000,
    image: '/menu/kopi.jpg',
    category: 'Coffee',
    sizes: [{ label: 'Regular' }, { label: 'Upsize', addPrice: 3000 }],
  },
  {
    id: 4,
    name: 'Hot Americano',
    price: 10000,
    image: '/menu/kopi.jpg',
    category: 'Coffee',
  },
  {
    id: 5,
    name: 'Ice Americano',
    price: 12000,
    image: '/menu/kopi.jpg',
    category: 'Coffee',
  },

  // Smoothie
  {
    id: 2,
    name: 'Mangga',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Smoothie',
  },
  {
    id: 3,
    name: 'Coklat',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Smoothie',
  },
  {
    id: 4,
    name: 'Mangga',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Smoothie',
  },
  {
    id: 5,
    name: 'Alpukat',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Smoothie',
  },
  {
    id: 6,
    name: 'Buah Naga',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Smoothie',
  },
  {
    id: 7,
    name: 'Oreo',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Smoothie',
  },

  // Snack
  {
    id: 8,
    name: 'Sosis',
    price: 15000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Tako Yaki',
  },
  {
    id: 9,
    name: 'Dumpling Keju',
    price: 15000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Tako Yaki',
  },
  {
    id: 10,
    name: 'Keju Mozarella',
    price: 15000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Tako Yaki',
  },
  {
    id: 11,
    name: 'Seafood',
    price: 15000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Tako Yaki',
  },
  {
    id: 12,
    name: 'Tako Mix',
    price: 20000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Tako Yaki',
  },
  {
    id: 13,
    name: 'Tako Vegan',
    price: 15000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Tako Yaki',
  },
  {
    id: 14,
    name: 'Pop Mie',
    price: 10000,
    image: '/menu/geprek.jpg',
    category: 'Snack',
    subcategory: 'Pop Mie',
  },

  // Mojito
  {
    id: 15,
    name: 'Melon',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Mojito',
  },
  {
    id: 16,
    name: 'Orange',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Mojito',
  },
  {
    id: 17,
    name: 'Nanas',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Mojito',
  },
  {
    id: 18,
    name: 'Cocopandan',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Mojito',
  },

  // Milkshake
  {
    id: 19,
    name: 'Red Velvet',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Milkshake',
  },
  {
    id: 20,
    name: 'Chocolate',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Milkshake',
  },
  {
    id: 21,
    name: 'Matcha',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Milkshake',
  },
  {
    id: 22,
    name: 'Oreo',
    price: 15000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Milkshake',
  },

  // Es Jomblo
  {
    id: 23,
    name: 'Strawberry',
    price: 10000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Es Jomblo',
  },
  {
    id: 24,
    name: 'Mangga',
    price: 10000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Es Jomblo',
  },
  {
    id: 25,
    name: 'Melon',
    price: 10000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Es Jomblo',
  },
  {
    id: 26,
    name: 'Orange',
    price: 10000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Es Jomblo',
  },
  {
    id: 27,
    name: 'Anggur',
    price: 10000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Es Jomblo',
  },

  // Es Jelly Susu
  {
    id: 28,
    name: 'Es Jelly Susu',
    price: 10000,
    image: '/menu/mangga.jpg',
    category: 'Special Beverage',
    subcategory: 'Es Jelly Susu',
  },
];
