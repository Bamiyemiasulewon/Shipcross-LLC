import { Suspense } from 'react'
import ProductsClient from './ProductsClient'

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">Loading products...</div>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  )
}
