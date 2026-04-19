'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section
        className="page-hero"
        style={{
          height: 420,
          backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/670805de01d1edffaa39132b/06-FINAL-LOBBY-DEI-DOGI-Post-M/0x0.jpg?format=jpg&width=1920')",
          backgroundSize: 'cover', backgroundPosition: 'center 75%',
        }}
      >
        <div className="page-hero-content">
          <p className="page-eyebrow">Get in Touch</p>
          <h1 className="page-title">Contact <em>Us</em></h1>
        </div>
      </section>

      <div className="contact-layout">
        {/* INFO */}
        <div className="contact-info">
          <div className="info-eyebrow">We&apos;d Love to Hear From You</div>
          <h2 className="info-heading">Let&apos;s Work <em>Together</em></h2>
          <p className="info-body">
            Whether you&apos;re a hotel looking to partner, a brand interested in collaboration, or a press outlet seeking editorial insights — we&apos;re here.
          </p>
          <div className="contact-channels">
            <div className="channel">
              <div className="channel-icon">
                <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'var(--gold)', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className="channel-label">Email</div>
                <div className="channel-value"><a href="mailto:press@explorebesthotels.com">press@explorebesthotels.com</a></div>
              </div>
            </div>
            <div className="channel">
              <div className="channel-icon">
                <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'var(--gold)', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div>
                <div className="channel-label">Instagram</div>
                <div className="channel-value"><a href="https://www.instagram.com/besthotels/" target="_blank" rel="noreferrer">@besthotels</a></div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success show">
              <div className="success-icon">✦</div>
              <div className="success-title">Message Received</div>
              <p className="success-text">Thank you for reaching out. We&apos;ll get back to you within 2–3 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="form-heading">Send a <em>Message</em></h3>
              <div className="form-row">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" placeholder="First name" required />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" placeholder="Last name" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="inquiry">Inquiry Type</label>
                <select id="inquiry" defaultValue="">
                  <option value="" disabled>Select inquiry type</option>
                  <option>Hotel Partnership</option>
                  <option>Brand Collaboration</option>
                  <option>Press &amp; Media</option>
                  <option>General</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Tell us about your inquiry…" required />
              </div>
              <button type="submit" className="btn-submit">Send Message</button>
              <p className="form-note">We respond to all inquiries within 2–3 business days.</p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
