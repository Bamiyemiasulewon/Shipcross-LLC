'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

type FilterKey = 'category' | 'size' | 'color' | 'priceRange' | 'sort'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    category: string
    size: string
    color: string
    priceRange: [number, number]
    sort: string
  }
  onFilterChange: (key: FilterKey, value: string | [number, number]) => void
  activeFilters: string[]
  onRemoveFilter: (filter: string) => void
}

const categories = ['tops', 'bottoms', 'shoes', 'accessories']
const sizes = ['XS', 'S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43', '44', '45', '46']
const colors = [
  { hex: '#000000', label: 'Black' },
  { hex: '#FFFFFF', label: 'White' },
  { hex: '#FF0000', label: 'Red' },
  { hex: '#0000FF', label: 'Blue' },
  { hex: '#008000', label: 'Green' },
  { hex: '#FFFF00', label: 'Yellow' },
]
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  activeFilters,
  onRemoveFilter,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: false,
    color: false,
    price: false,
    sort: false,
  })

  type SectionKey = keyof typeof expandedSections

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const FilterSection = ({ title, children, sectionKey }: { title: string; children: React.ReactNode; sectionKey: SectionKey }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-semibold mb-3"
      >
        {title}
        {expandedSections[sectionKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static top-0 right-0 h-full md:h-auto w-full md:w-80 bg-white md:bg-transparent z-50 md:z-auto transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 md:p-0">
          <div className="flex items-center justify-between md:hidden mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <FilterSection title="Category" sectionKey="category">
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className="mr-2"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Size" sectionKey="size">
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onFilterChange('size', filters.size === size ? '' : size)}
                  className={`border px-3 py-2 text-sm ${
                    filters.size === size ? 'border-accent bg-accent text-white' : 'border-gray-300 hover:border-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Color" sectionKey="color">
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => onFilterChange('color', filters.color === color.hex ? '' : color.hex)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    filters.color === color.hex ? 'border-accent' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Price Range" sectionKey="price">
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Sort" sectionKey="sort">
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="w-full border border-gray-300 px-3 py-2"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FilterSection>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="bg-gray-100 px-3 py-1 text-sm rounded-full flex items-center gap-1"
                  >
                    {filter}
                    <button onClick={() => onRemoveFilter(filter)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}