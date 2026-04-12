'use client'

import type { Metadata } from 'next'
import { useState } from 'react'

const FORMSPREE =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/REPLACE'

const subjectOptions = [
  'General enquiry',
  'Error report',
  'Press / media',
  'Partnership',
]

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
      >
        <div className="text-2xl mb-2">✓</div>
        <p className="font-medium" style={{ color: '#16a34a' }}>
          Message sent!
        </p>
        <p className="text-sm mt-1" style={{ color: '#57534e' }}>
          We&apos;ll get back to you at {formData.email || 'your email'} shortly.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '0.625rem 0.75rem',
    border: '1px solid #e7e5e4',
    borderRadius: '0.5rem',
    backgroundColor: '#ffffff',
    color: '#1c1917',
    fontSize: '0.9375rem',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '0.375rem',
    color: '#1c1917',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" style={labelStyle}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" style={labelStyle}>
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select a subject…</option>
          {subjectOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Your message…"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#dc2626' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: '#ea580c' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-xs text-center" style={{ color: '#a8a29e' }}>
        Your data is handled in accordance with our{' '}
        <a href="/privacy" style={{ color: '#ea580c' }}>
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div
      className="max-w-content mx-auto px-4 py-8"
      style={{ maxWidth: '680px' }}
    >
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1c1917' }}>
        Contact
      </h1>
      <p className="mb-8" style={{ color: '#57534e' }}>
        Have a question, spotted an error, or want to get in touch? We&apos;d
        love to hear from you.
      </p>

      <div
        className="rounded-xl border p-5 mb-8"
        style={{ backgroundColor: '#fafaf9', borderColor: '#e7e5e4' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: '#1c1917' }}>
          Email us directly:
        </p>
        <a
          href="mailto:contact@seedoilcalculator.com"
          className="font-medium"
          style={{ color: '#ea580c' }}
        >
          contact@seedoilcalculator.com
        </a>
      </div>

      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: '#ffffff', borderColor: '#e7e5e4' }}
      >
        <h2 className="text-lg font-semibold mb-5" style={{ color: '#1c1917' }}>
          Send a Message
        </h2>
        <ContactForm />
      </div>
    </div>
  )
}
