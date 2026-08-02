import { useState } from 'react'
import { Mail, MessageSquare, Bug, Lightbulb, Send, CheckCircle2, MapPin, Clock } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { contactFaqs } from '@/data/content'

const topics = [
  { id: 'general', label: 'General inquiry', icon: MessageSquare },
  { id: 'suggestion', label: 'Tool suggestion', icon: Lightbulb },
  { id: 'correction', label: 'Correction', icon: Bug },
  { id: 'partnership', label: 'Partnership', icon: Mail },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Toolisme"
        description="Have a question, a tool to suggest, or a correction to flag? We read every message and respond within two business days."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-sage-200 bg-sage-50 p-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-sage-600" />
                <h2 className="mt-4 font-serif text-2xl font-medium text-ink-900">
                  Message sent
                </h2>
                <p className="mt-2 max-w-sm text-ink-600">
                  Thanks for reaching out, {form.name || 'there'}. We will get back to you
                  at {form.email || 'your email'} within two business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', topic: 'general', message: '' })
                  }}
                  className="btn-secondary mt-6"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-ink-700">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-ink-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink-700">
                    What is this about?
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {topics.map((topic) => {
                      const Icon = topic.icon
                      const active = form.topic === topic.id
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => update('topic', topic.id)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-semibold transition-all ${
                            active
                              ? 'border-ink-900 bg-ink-900 text-white'
                              : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {topic.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-ink-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink-900">Email us</h3>
                    <p className="text-sm text-ink-500">hello@toolisme.com</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-50 text-sage-700">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink-900">Response time</h3>
                    <p className="text-sm text-ink-500">Within 2 business days</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-50 text-sand-700">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink-900">Location</h3>
                    <p className="text-sm text-ink-500">Remote-first, operating globally</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-ink-900 p-6 text-white">
                <h3 className="font-serif text-lg font-medium">Press & partnerships</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  For media inquiries, syndication, or tool-maker partnerships, contact
                  us at partnerships@toolisme.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-200/70 bg-white py-16">
        <div className="container-prose">
          <p className="eyebrow mb-3">Quick answers</p>
          <h2 className="section-title">Frequently asked questions</h2>
          <div className="mt-10 space-y-4">
            {contactFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-ink-200 bg-white p-5 transition-colors open:bg-ink-50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-ink-900 marker:content-none">
                  {faq.question}
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500 transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
