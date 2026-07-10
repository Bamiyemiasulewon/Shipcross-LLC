export interface Product {
  id: string
  slug: string
  name: string
  category: 'tops' | 'bottoms' | 'shoes' | 'accessories'
  price: number
  originalPrice?: number
  colors: { hex: string; label: string }[]
  sizes: string[]
  images: string[]
  description: string
  details: string
  isNew: boolean
  isBestseller: boolean
}

export const products: Product[] = [
  // Tops (3)
  {
    id: '2',
    slug: 'cashmere-sweater',
    name: 'Cashmere Sweater',
    category: 'tops',
    price: 24,
    colors: [{ hex: '#F5F5F5', label: 'Cream' }, { hex: '#8B4513', label: 'Brown' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
        'https://plus.unsplash.com/premium_photo-1697753121099-f2988a868ecf?w=800&h=1000&fit=crop',
        'https://plus.unsplash.com/premium_photo-1697753121099-f2988a868ecf?w=800&h=1000&fit=crop',
    ],
    description: 'Luxurious cashmere sweater for ultimate comfort.',
    details: '100% cashmere. Hand wash cold.',
    isNew: false,
    isBestseller: true,
  },
  {
    id: '3',
    slug: 'linen-shirt',
    name: 'Linen Shirt',
    category: 'tops',
    price: 18,
    colors: [{ hex: '#4169E1', label: 'Royal Blue' }, { hex: '#FFFFFF', label: 'White' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
        'https://images.unsplash.com/photo-1617117475026-2eb3e68b63cf?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1617117475026-2eb3e68b63cf?w=800&h=1000&fit=crop',
    ],
    description: 'Breathable linen shirt perfect for summer.',
    details: '100% linen. Machine washable.',
    isNew: false,
    isBestseller: false,
  },
  {
    id: '5',
    slug: 'cotton-t-shirt',
    name: 'Cotton T-Shirt',
    category: 'tops',
    price: 12,
    colors: [{ hex: '#FF0000', label: 'Red' }, { hex: '#0000FF', label: 'Blue' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
    ],
    description: 'Classic cotton t-shirt with minimalist design.',
    details: '100% organic cotton. Machine wash.',
    isNew: false,
    isBestseller: true,
  },
  // Bottoms (3)
  {
    id: '7',
    slug: 'tailored-trousers',
    name: 'Tailored Trousers',
    category: 'bottoms',
    price: 23,
    colors: [{ hex: '#000000', label: 'Black' }, { hex: '#FFFFFF', label: 'White' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
        'https://images.unsplash.com/photo-1775831727278-d95ed34edf81?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1775831727278-d95ed34edf81?w=800&h=1000&fit=crop',
    ],
    description: 'Professional tailored trousers with perfect fit.',
    details: 'Wool blend. Dry clean only.',
    isNew: false,
    isBestseller: true,
  },
  {
    id: '9',
    slug: 'silk-skirt',
    name: 'Silk Skirt',
    category: 'bottoms',
    price: 21,
    colors: [{ hex: '#FF69B4', label: 'Hot Pink' }, { hex: '#000000', label: 'Black' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://plus.unsplash.com/premium_photo-1671379102281-7225f3d3d97d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop',
    ],
    description: 'Flowy silk skirt with elegant drape.',
    details: '100% silk. Dry clean.',
    isNew: true,
    isBestseller: false,
  },
  {
    id: '12',
    slug: 'cotton-chinos',
    name: 'Cotton Chinos',
    category: 'bottoms',
    price: 17,
    colors: [{ hex: '#8B4513', label: 'Tan' }, { hex: '#000080', label: 'Navy' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1711443813147-def27861b9af?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1000&fit=crop',
    ],
    description: 'Versatile cotton chinos for everyday style.',
    details: '100% cotton. Machine wash.',
    isNew: true,
    isBestseller: false,
  },
  // Shoes (3)
  {
    id: '13',
    slug: 'leather-loafers',
    name: 'Leather Loafers',
    category: 'shoes',
    price: 24,
    colors: [{ hex: '#8B4513', label: 'Brown' }, { hex: '#000000', label: 'Black' }],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46'],
    images: [
        'https://plus.unsplash.com/premium_photo-1670984281009-863453504c52?w=800&h=1000&fit=crop',
        'https://plus.unsplash.com/premium_photo-1670984281009-863453504c52?w=800&h=1000&fit=crop',
    ],
    description: 'Classic leather loafers with tassel detail.',
    details: 'Genuine leather upper. Leather sole.',
    isNew: false,
    isBestseller: true,
  },
  {
    id: '14',
    slug: 'sneakers',
    name: 'Canvas Sneakers',
    category: 'shoes',
    price: 14,
    colors: [{ hex: '#FFFFFF', label: 'White' }, { hex: '#000000', label: 'Black' }],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46'],
    images: [
      'https://images.unsplash.com/photo-1562105962-2fbaaf107fe3?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop',
    ],
    description: 'Comfortable canvas sneakers for casual wear.',
    details: 'Canvas upper. Rubber sole.',
    isNew: true,
    isBestseller: false,
  },
  {
    id: '16',
    slug: 'espadrilles',
    name: 'Espadrilles',
    category: 'shoes',
    price: 11,
    colors: [{ hex: '#F5DEB3', label: 'Beige' }, { hex: '#000000', label: 'Black' }],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    images: [
        'https://images.unsplash.com/photo-1597423913783-c53b15744c83?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.0',
        'https://images.unsplash.com/photo-1597423913783-c53b15744c83?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.0',
    ],
    description: 'Summer espadrilles with rope sole.',
    details: 'Cotton canvas upper. Jute rope sole.',
    isNew: true,
    isBestseller: false,
  },
  // Accessories (2)
  {
    id: '18',
    slug: 'canvas-tote-bag',
    name: 'Canvas Tote Bag',
    category: 'accessories',
    price: 19,
    colors: [{ hex: '#FFFFFF', label: 'Natural' }, { hex: '#000000', label: 'Black' }],
    sizes: ['One Size'],
    images: [
        'https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?w=800&h=1000&fit=crop',
        'https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?w=800&h=1000&fit=crop',
    ],
    description: 'Spacious canvas tote bag for everyday essentials.',
    details: '100% cotton canvas. Machine wash cold. Reinforced straps.',
    isNew: true,
    isBestseller: false,
  },
  {
    id: '19',
    slug: 'sunglasses',
    name: 'Sunglasses',
    category: 'accessories',
    price: 16,
    colors: [{ hex: '#000000', label: 'Black' }, { hex: '#8B4513', label: 'Tortoise' }],
    sizes: ['One Size'],
    images: [
      'https://plus.unsplash.com/premium_photo-1692340973681-e96b10bda346?w=800&h=1000&fit=crop',
      'https://plus.unsplash.com/premium_photo-1692340973681-e96b10bda346?w=800&h=1000&fit=crop',
    ],
    description: 'Stylish sunglasses with UV protection.',
    details: 'Polycarbonate lenses. Adjustable nose pads. Includes protective pouch.',
    isNew: true,
    isBestseller: false,
  },
]

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug)

export const getProductsByCategory = (category: string) => products.filter(p => p.category === category)

export const getNewArrivals = () => products.filter(p => p.isNew).slice(0, 6)

export const getBestsellers = () => products.filter(p => p.isBestseller)