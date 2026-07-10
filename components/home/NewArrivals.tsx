import ProductCard from '@/components/ui/ProductCard'
import { getNewArrivals } from '@/lib/mock-data'

export default function NewArrivals() {
  const newArrivals = getNewArrivals()

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">New Arrivals</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {newArrivals.map((product) => (
            <div key={product.id} className="flex-none w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}