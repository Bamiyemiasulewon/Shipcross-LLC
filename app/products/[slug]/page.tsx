import { notFound } from 'next/navigation'
import { getProductBySlug, getProductsByCategory, products } from '@/lib/mock-data'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  )
}
