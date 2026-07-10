'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '@/components/ui/ProductCard'
import FilterSidebar from '@/components/ui/FilterSidebar'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '@/lib/mock-data'

type FilterKey = 'category' | 'size' | 'color' | 'priceRange' | 'sort'

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [visibleProducts, setVisibleProducts] = useState(12)

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    size: '',
    color: '',
    priceRange: [0, 1000] as [number, number],
    sort: 'newest',
  })

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false
      if (filters.size && !product.sizes.includes(filters.size)) return false
      if (filters.color && !product.colors.some(c => c.hex === filters.color)) return false
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
      return true
    })

    switch (filters.sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return filtered
  }, [filters])

  const activeFilters = useMemo(() => {
    const active: string[] = []
    if (filters.category) active.push(`Category: ${filters.category}`)
    if (filters.size) active.push(`Size: ${filters.size}`)
    if (filters.color) {
      const colorLabel = products.find(p => p.colors.some(c => c.hex === filters.color))?.colors.find(c => c.hex === filters.color)?.label
      active.push(`Color: ${colorLabel}`)
    }
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) active.push(`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`)
    return active
  }, [filters])

  const handleFilterChange = (key: FilterKey, value: string | [number, number]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    const params = new URLSearchParams()
    if (newFilters.category) params.set('category', newFilters.category)
    router.push(`/products?${params.toString()}`)
  }

  const handleRemoveFilter = (filter: string) => {
    if (filter.startsWith('Category:')) {
      handleFilterChange('category', '')
    } else if (filter.startsWith('Size:')) {
      handleFilterChange('size', '')
    } else if (filter.startsWith('Color:')) {
      handleFilterChange('color', '')
    } else if (filter.startsWith('Price:')) {
      handleFilterChange('priceRange', [0, 1000])
    }
  }

  const loadMore = () => {
    setVisibleProducts(prev => prev + 12)
    if (visibleProducts + 12 >= filteredProducts.length) {
      setShowLoadMore(false)
    }
  }

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: searchParams.get('category') || '',
    }))
  }, [searchParams])

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">Products</h1>
            <p className="text-gray-600 mt-1">{filteredProducts.length} items</p>
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center gap-2 bg-accent text-white px-4 py-2 rounded"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <div className="hidden md:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
            />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {showLoadMore && visibleProducts < filteredProducts.length && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="bg-accent text-white px-8 py-3 font-semibold hover:bg-accent/90 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
      />
    </div>
  )
}
