'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSend = () => {
    if (!submitted) {
      setSubmitted(true)
    }
  }

  return (
    <div className="rounded-xl border border-background/80 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-2">Send a Message</h2>
        <p className="text-gray-700 leading-relaxed">
          Share your inquiry and we’ll respond within one business day.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-gray-300 bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Send Message
        </button>

        {submitted && (
          <div className="rounded-lg bg-foreground/5 border border-accent/20 px-4 py-4 text-sm text-foreground">
            Thank you! Your message has been sent.
          </div>
        )}
      </div>
    </div>
  )
}
