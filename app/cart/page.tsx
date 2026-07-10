'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <div className="min-h-screen pt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16 bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-serif text-foreground">Your bag is empty</h1>
            <p className="text-gray-600 text-lg">Discover our latest collection</p>
            <Link
              href="/products"
              className="inline-block bg-accent text-white px-8 py-3 font-semibold hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-foreground mb-2">Your Bag</h1>
          <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your bag</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-6 pb-8 border-b border-gray-300"
              >
                {/* Product Image */}
                <div className="w-24 h-32 relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-serif text-foreground">{item.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>Size: {item.size}</span>
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.color }}
                        title="Color"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-50 text-sm"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-50 text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-foreground transition-colors group"
                  >
                    <Trash2 className="h-4 w-4 group-hover:text-accent" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white border border-gray-300 p-8 space-y-6">
              <h2 className="text-2xl font-serif text-foreground">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold text-accent">Free</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 pt-6">
                {/* Total */}
                <div className="flex justify-between mb-8">
                  <span className="text-lg font-serif text-foreground">Total</span>
                  <span className="text-2xl font-semibold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-accent text-white py-3 px-6 font-semibold hover:bg-accent/90 transition-colors">
                  Proceed to Checkout
                </button>

                {/* Continue Shopping Link */}
                <Link
                  href="/products"
                  className="block text-center mt-4 text-accent hover:text-accent/80 transition-colors text-sm font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Info Box */}
              <div className="pt-6 border-t border-gray-300 space-y-3 text-sm text-gray-600">
                <p>✓ Free shipping on all orders</p>
                <p>✓ Easy returns within 30 days</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
