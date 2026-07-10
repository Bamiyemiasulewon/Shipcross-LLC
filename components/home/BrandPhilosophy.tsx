import Image from 'next/image'

export default function BrandPhilosophy() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=800&h=1000&fit=crop"
              alt="Brand philosophy"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold">Our Philosophy</h2>
            <p className="text-lg leading-relaxed">
              We believe in fashion that transcends trends. Each piece is crafted with meticulous attention to detail,
              using the finest materials and sustainable practices. Our collections are designed for those who appreciate
              timeless elegance and uncompromising quality.
            </p>
            <p className="text-lg leading-relaxed">
              From the runway to your wardrobe, we curate pieces that tell a story and make a statement.
              Join us in celebrating fashion as an art form.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}