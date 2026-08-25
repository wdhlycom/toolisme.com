import { useState } from 'react'
import { Mail, MessageSquare, Bug, Lightbulb, Send, CheckCircle2 } from 'lucide-react'

const topics = [
  { id: 'general', label: 'General inquiry', icon: MessageSquare },
  { id: 'suggestion', label: 'Tool suggestion', icon: Lightbulb },
  { id: 'correction', label: 'Correction', icon: Bug },
  { id: 'partnership', label: 'Partnership', icon: Mail },
]

const FORMSPREE_URL = 'https://formspree.io/f/xaqrabyn'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          _replyto: form.email,
          topic: form.topic,
          message: form.message,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please try again or email us directly.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <>
      {submitted ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-sage-200 bg-sage-50 p-12 text-center dark:border-sage-800 dark:bg-sage-950">
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
                className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100 dark:placeholder:text-ink-500"
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
                className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100 dark:placeholder:text-ink-500"
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
                        : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:bg-ink-700'
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
              className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100 dark:placeholder:text-ink-500"
              placeholder="Tell us what you need..."
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send message'}
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </>
  )
}
