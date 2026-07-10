import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    name: 'Tops',
    slug: 'tops',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=600&fit=crop',
  },
  {
    name: 'Bottoms',
    slug: 'bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
  },
  {
    name: 'Footwear',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden aspect-square"
            >
              <Image
                src={category.image}
                alt={category.slug === 'tops' ? 'Assorted folded shirts' : category.name}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}