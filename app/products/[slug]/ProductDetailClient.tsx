'use client'

import { useState } from 'react'
import { Heart, Plus, Minus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import ImageGallery from '@/components/ui/ImageGallery'
import SizeGuideModal from '@/components/ui/SizeGuideModal'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/lib/mock-data'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.hex,
    })
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details & Care' },
    { id: 'shipping', label: 'Shipping' },
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.hex === color.hex ? 'border-accent' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">{selectedColor.label}</p>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold">Size</h3>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sm text-accent underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 text-sm ${
                      selectedSize === size ? 'border-accent bg-accent text-white' : 'border-gray-300 hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-accent text-white py-3 px-6 font-semibold hover:bg-accent/90 transition-colors"
              >
                Add to Bag
              </button>
              <button className="p-3 border border-gray-300 hover:border-accent transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t pt-8">
          <div className="flex gap-8 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 font-semibold ${
                  activeTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <p>{product.description}</p>
            )}
            {activeTab === 'details' && (
              <p>{product.details}</p>
            )}
            {activeTab === 'shipping' && (
              <div>
                <p className="mb-4">Free standard shipping on orders over $200.</p>
                <p className="mb-4">Express shipping available for $25.</p>
                <p>International shipping rates calculated at checkout.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  )
}
