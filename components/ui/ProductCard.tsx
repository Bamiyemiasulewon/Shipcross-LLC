'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import Badge from './Badge'
import type { Product } from '@/lib/mock-data'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add with first color and size
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0].hex,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            priority={priority}
            onMouseEnter={() => product.images.length > 1 && setCurrentImageIndex(1)}
            onMouseLeave={() => setCurrentImageIndex(0)}
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge type="new" />}
            {product.isBestseller && <Badge type="bestseller" />}
          </div>
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-4 left-4 right-4 bg-accent text-white py-2 px-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-2'
            }`}
          >
            Quick Add
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-sm">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}