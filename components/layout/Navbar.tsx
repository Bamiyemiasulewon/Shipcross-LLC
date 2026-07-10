'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isScrolled ? 'text-black' : 'text-white'}`}>
          <Link href="/" className="text-2xl font-serif font-bold uppercase tracking-[0.15em]">
            JSHANDS SHOPS
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 hover:text-accent">Home</Link>
              <Link href="/products" className="block px-3 py-2 hover:text-accent">Products</Link>
              <Link href="/about" className="block px-3 py-2 hover:text-accent">About</Link>
              <Link href="/contact" className="block px-3 py-2 hover:text-accent">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}