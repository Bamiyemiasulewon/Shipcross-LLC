import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Fashion hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 leading-tight uppercase tracking-wider">
          Dress the Moment
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 font-light">
          Discover timeless pieces crafted for the modern wardrobe. Luxury fashion that speaks to your style.
        </p>
      </div>
    </section>
  )
}