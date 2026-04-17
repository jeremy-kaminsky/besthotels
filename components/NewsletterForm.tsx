'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="newsletter" id="contact">
      <p className="newsletter-eyebrow">Stay Connected</p>
      <h2 className="newsletter-title">Never Miss a Discovery</h2>
      <p className="newsletter-sub">
        Join 700K+ travelers who receive our curated picks, exclusive reviews, and visual journeys from the world&apos;s finest hotels.
      </p>
      {submitted ? (
        <p style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: '1.2rem' }}>
          Thank you — you&apos;re on the list.
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
    </section>
  )
}
