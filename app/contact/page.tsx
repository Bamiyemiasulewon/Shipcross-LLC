import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Get in Touch</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-gray-700">
            Reach out to our team for styling advice, order inquiries, or bespoke service. We’re here to help with every refined detail.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />

          <aside className="rounded-xl border border-background/80 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-serif font-semibold mb-4">Email</h2>
              <p className="text-gray-700">hello@jshandsshops.com</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif font-semibold mb-4">Location</h2>
              <p className="text-gray-700">123 Luxe Avenue<br />New York, NY 10001</p>
            </div>

            <div>
              <h2 className="text-xl font-serif font-semibold mb-4">Business Hours</h2>
              <p className="text-gray-700">Mon–Fri: 9am–6pm<br />Sat: 10am–4pm</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
