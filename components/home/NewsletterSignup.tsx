'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock signup - just clear the form
    setEmail('')
    alert('Thank you for subscribing!')
  }

  return (
    <section className="py-16 px-4 bg-foreground text-background">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Stay in Style</h2>
        <p className="text-lg mb-8 opacity-90">
          Subscribe to our newsletter for exclusive access to new arrivals, styling tips, and special offers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-foreground"
            required
          />
          <button
            type="submit"
            className="bg-accent text-white px-6 py-3 font-semibold hover:bg-accent/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}