import Hero from '@/components/home/Hero'
import CategoryGrid from '@/components/home/CategoryGrid'
import NewArrivals from '@/components/home/NewArrivals'
import BrandPhilosophy from '@/components/home/BrandPhilosophy'
import NewsletterSignup from '@/components/home/NewsletterSignup'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <BrandPhilosophy />
      <NewsletterSignup />
    </>
  )
}