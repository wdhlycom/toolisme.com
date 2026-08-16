import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check, ExternalLink } from 'lucide-react'

type ResultId = 'ahaslides' | 'warmupinbox' | 'snovio' | 'comparison'

type ResultMeta = {
  name: string
  price: string
  url: string
  affiliate: boolean
  internal?: boolean
  headline: string
  points: string[]
  chip: string
  accent: string
}

const RESULT_META: Record<ResultId, ResultMeta> = {
  ahaslides: {
    name: 'AhaSlides',
    price: 'Free tier (50 participants)',
    url: 'https://ahaslides.com/?red=toolis&utm_source=toolis&utm_medium=revshare&utm_affiliate_network=reditus',
    affiliate: true,
    headline: 'Interactive demos, training & live audience feedback — without enterprise pricing',
    points: [
      'Free tier handles 50 participants',
      'Live polls, word clouds, and Q&A for everyday team use',
      'No reason to pay enterprise rates for features you touch twice a year',
    ],
    chip: 'bg-rose-500',
    accent: 'text-rose-700 dark:text-rose-400',
  },
  warmupinbox: {
    name: 'WarmupInbox',
    price: '7-day trial, no credit card',
    url: 'https://warmupinbox.com/?red=toolis',
    affiliate: true,
    headline: 'Cold email where deliverability matters more than volume',
    points: [
      'Warms sending domains through a real inbox network',
      'Pairs with email verification to protect sender reputation',
      'Steadier inbox rates than sending cold',
    ],
    chip: 'bg-amber-500',
    accent: 'text-amber-700 dark:text-amber-400',
  },
  snovio: {
    name: 'Snov.io',
    price: 'Free tier + paid plans',
    url: 'https://snov.io?fp_ref=hu82',
    affiliate: true,
    headline: 'B2B outreach needing verified leads at scale',
    points: [
      'Email search and verification in one flow',
      'Invalid addresses filtered before they hit your sender reputation',
      'Full breakdown in our Snov.io deep-dive',
    ],
    chip: 'bg-sky-500',
    accent: 'text-sky-700 dark:text-sky-400',
  },
  comparison: {
    name: 'TubeMagic vs Subscribr',
    price: 'Two angles — pick by cadence',
    url: '/comparisons/software/tubemagic-vs-subscribr-2026',
    affiliate: false,
    internal: true,
    headline: 'Video / YouTube scripts — you want AI-written',
    points: [
      'TubeMagic is built for batch production',
      'Subscribr is built for retention-focused hooks',
      "Don't subscribe to both — pick by your content cadence",
    ],
    chip: 'bg-violet-600',
    accent: 'text-violet-700 dark:text-violet-400',
  },
}

const OPTIONS: { label: string; desc: string; result: ResultId }[] = [
  {
    label: 'Interactive demos, training, or live audience feedback?',
    desc: 'Polls, word clouds, Q&A for team sessions — without enterprise rates.',
    result: 'ahaslides',
  },
  {
    label: 'Cold email — you care about landing in the inbox?',
    desc: 'Deliverability first, volume second. Warm the domain before you blast.',
    result: 'warmupinbox',
  },
  {
    label: 'B2B outreach — verified leads at scale?',
    desc: 'Email search + verification in one flow, reputation-safe.',
    result: 'snovio',
  },
  {
    label: 'Video / YouTube — you want AI-written scripts?',
    desc: 'Two tools, two angles. Compare before you commit to one.',
    result: 'comparison',
  },
]

type Step = { kind: 'start' } | { kind: 'q' } | { kind: 'result'; id: ResultId }

export default function SaasToolQuiz() {
  const [step, setStep] = useState<Step>({ kind: 'start' })

  if (step.kind === 'start') {
    return (
      <Shell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Tool Matcher
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Which tool fits your core need?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Match your #1 need to the right tool. One pick — we'll point you to the exact fit.
        </p>
        <button
          onClick={() => setStep({ kind: 'q' })}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-500 hover:shadow-lg active:scale-[0.98]"
        >
          Start
          <ArrowRight className="h-4 w-4" />
        </button>
      </Shell>
    )
  }

  if (step.kind === 'result') {
    const r = RESULT_META[step.id]
    return (
      <Shell>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${r.chip}`}>
            <Check className="h-3 w-3" />
            Your match
          </span>
          <p className="text-xs font-medium text-ink-400 dark:text-ink-500">Based on your need</p>
        </div>

        <h3 className={`mt-3 font-serif text-3xl font-medium tracking-tight ${r.accent}`}>{r.name}</h3>
        <p className="mt-1 text-sm font-semibold text-ink-700 dark:text-ink-200">{r.price}</p>
        <p className="mt-2 text-sm font-medium text-ink-600 dark:text-ink-300">{r.headline}</p>

        <ul className="mt-4 space-y-2">
          {r.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
              <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${r.accent}`} />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {r.affiliate && (
            <a
              href={r.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg active:scale-[0.98]"
            >
              🚀 Try {r.name} Free
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
          {r.internal && (
            <a
              href={r.url}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-100 dark:border-ink-600 dark:text-ink-300 dark:hover:bg-ink-800"
            >
              Compare the two
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            onClick={() => setStep({ kind: 'start' })}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            <RotateCcw className="h-4 w-4" />
            Retake
          </button>
        </div>
      </Shell>
    )
  }

  // question step
  return (
    <Shell>
      <h3 className="font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
        What's your #1 need right now?
      </h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">One pick — we'll match the right tool.</p>
      <div className="mt-5 grid gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setStep({ kind: 'result', id: opt.result })}
            className="group rounded-xl border border-ink-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-md dark:border-ink-700 dark:bg-ink-800/60 dark:hover:border-accent-600"
          >
            <span className="block text-sm font-semibold text-ink-900 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400">
              {opt.label}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              {opt.desc}
            </span>
          </button>
        ))}
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-ink-200 bg-gradient-to-b from-white to-ink-50/60 p-6 shadow-sm dark:border-ink-700 dark:from-ink-900 dark:to-ink-950 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-ink-500">
          Toolisme Picker
        </span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}
