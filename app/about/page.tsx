import { Shield, Leaf, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-gray-700">
            JSHANDS SHOPS is a premium fashion house devoted to timeless craftsmanship and refined silhouettes. We curate wardrobe essentials with exquisite fabrics, attentive tailoring, and a quiet luxury spirit that elevates everyday dressing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <div className="border border-background/80 bg-white p-8 rounded-xl shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-serif font-semibold mb-3">Quality</h2>
            <p className="text-gray-700 leading-relaxed">
              Each piece is crafted with premium materials and meticulous attention to detail for enduring elegance.
            </p>
          </div>

          <div className="border border-background/80 bg-white p-8 rounded-xl shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white mb-6">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-serif font-semibold mb-3">Sustainability</h2>
            <p className="text-gray-700 leading-relaxed">
              We embrace thoughtful sourcing and responsible production to create pieces that look good and feel right.
            </p>
          </div>

          <div className="border border-background/80 bg-white p-8 rounded-xl shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-serif font-semibold mb-3">Style</h2>
            <p className="text-gray-700 leading-relaxed">
              Our collections blend modern refinement with editorial polish for a wardrobe built to impress.
            </p>
          </div>
        </div>

        <section className="rounded-[2rem] bg-foreground px-8 py-16 text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6">Mission</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Designed for those who appreciate luxury without compromise.
          </h2>
          <p className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed opacity-90">
            We believe in creating wardrobe essentials that honor craftsmanship, elevate personal style, and make every moment feel undeniably special.
          </p>
        </section>
      </section>
    </div>
  )
}
