import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">BRAND</h3>
            <p className="text-sm opacity-80">
              Luxury fashion for the discerning individual.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=tops" className="hover:text-accent transition-colors">Tops</Link></li>
              <li><Link href="/products?category=bottoms" className="hover:text-accent transition-colors">Bottoms</Link></li>
              <li><Link href="/products?category=shoes" className="hover:text-accent transition-colors">Shoes</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-accent transition-colors">Size Guide</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2026 JShands Shops. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}