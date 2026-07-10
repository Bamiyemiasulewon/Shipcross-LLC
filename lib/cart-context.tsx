"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      setItems(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size && i.color === item.color)
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === item.size && i.color === item.color ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string, size: string, color: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)))
  }

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size, color)
      return
    }
    setItems(prev => prev.map(i => i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}