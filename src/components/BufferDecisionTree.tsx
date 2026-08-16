import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check, AlertTriangle } from 'lucide-react'

const BUFFER_URL =
  'https://buffer.com/join/beb27da0b4a7a09a714ec970ea7d33fe7b0d88cca79a42e348185a86c18dfb93'

type ResultId =
  | 'freePlan'
  | 'essentials'
  | 'essentialsShare'
  | 'teamPlan'
  | 'skipBuffer'
  | 'dontPick'

type ResultMeta = {
  name: string
  price: string
  headline: string
  points: string[]
  affiliate: boolean
  altLinks?: { label: string; url: string }[]
  chip: string
  accent: string
  cta?: string
  warning?: string
}

const RESULT_META: Record<ResultId, ResultMeta> = {
  freePlan: {
    name: 'Start on the Free plan',
    price: 'Free · 3 channels, 10 posts each',
    headline: 'You manage a few accounts and want to test the waters first.',
    points: [
      '3 channels, 10 scheduled posts each — enough to run a real week',
      'AI assistant included, no credit card required',
      'Upgrade only when you actually feel the limit',
    ],
    affiliate: true,
    cta: '🚀 Try Buffer Free for 14 Days',
    chip: 'bg-emerald-500',
    accent: 'text-emerald-700 dark:text-emerald-400',
  },
  essentials: {
    name: 'Go with Essentials',
    price: '$6/channel/mo ($5 billed annually)',
    headline: 'You schedule a lot but don’t need enterprise reporting.',
    points: [
      'Unlimited posts, unlimited AI, advanced analytics, engagement inbox',
      'Best fit for 4–6 channels before per-channel billing stings',
      'No listening or competitor tracking — pair with another tool if needed',
    ],
    affiliate: true,
    cta: '🚀 Try Buffer Free for 14 Days',
    chip: 'bg-blue-600',
    accent: 'text-blue-700 dark:text-blue-400',
  },
  essentialsShare: {
    name: 'Essentials is enough',
    price: '$6/channel/mo ($5 billed annually)',
    headline: 'You collaborate but don’t need approval flows.',
    points: [
      'Essentials covers scheduling + AI for the whole team',
      'Just share the login — no Team plan required yet',
      'Move to Team only when permissions become a real pain',
    ],
    affiliate: true,
    cta: '🚀 Try Buffer Free for 14 Days',
    chip: 'bg-blue-600',
    accent: 'text-blue-700 dark:text-blue-400',
  },
  teamPlan: {
    name: 'Pick the Team plan',
    price: '$12/channel/mo ($10 billed annually)',
    headline: 'You need approval flows and granular permissions.',
    points: [
      'Unlimited members, approval chains, custom permissions',
      'Branded reports for client-facing work',
      'Worth it once collaboration is more than “share the login”',
    ],
    affiliate: true,
    cta: '🚀 Try Buffer Free for 14 Days',
    chip: 'bg-violet-600',
    accent: 'text-violet-700 dark:text-violet-400',
  },
  skipBuffer: {
    name: 'Skip Buffer — go enterprise',
    price: 'Hootsuite / Sprout Social',
    headline: 'You need listening, competitor tracking, or deep reports.',
    points: [
      'Buffer has no social listening or cross-channel benchmarks',
      'Hootsuite and Sprout own the analytics + approvals turf',
      'Pay more, but get the reporting you actually need',
    ],
    affiliate: false,
    altLinks: [
      { label: 'Visit Hootsuite', url: 'https://hootsuite.com' },
      { label: 'Visit Sprout Social', url: 'https://sproutsocial.com' },
    ],
    chip: 'bg-slate-500',
    accent: 'text-slate-700 dark:text-slate-300',
  },
  dontPick: {
    name: 'Look at flat-rate rivals',
    price: 'Publer / Metricool / SocialPilot',
    headline: 'At 7+ channels, Buffer’s per-channel billing is the worst deal.',
    points: [
      '8 channels = $40+/mo, 10 channels = $50+/mo on Buffer',
      'Flat-rate tools bill once regardless of channel count',
      'You outgrow the “simple” pitch the moment scale kicks in',
    ],
    affiliate: false,
    warning:
      'Per-channel pricing makes Buffer the most expensive option at 7+ channels. A flat-rate rival will almost always win here.',
    altLinks: [
      { label: 'Visit Publer', url: 'https://publer.io' },
      { label: 'Visit Metricool', url: 'https://metricool.com' },
      { label: 'Visit SocialPilot', url: 'https://socialpilot.co' },
    ],
    chip: 'bg-orange-500',
    accent: 'text-orange-700 dark:text-orange-400',
  },
}

type Next = { q: 'q2' | 'q3' | 'q4' } | { result: ResultId }

type Question = {
  title: string
  subtitle: string
  options: { label: string; desc: string; next: Next }[]
}

const QUESTIONS: Record<'q1' | 'q2' | 'q3' | 'q4', Question> = {
  q1: {
    title: 'How many channels do you manage?',
    subtitle: 'This decides whether Buffer’s per-channel pricing works for you.',
    options: [
      {
        label: '1–3 channels',
        desc: 'A handful of accounts — Buffer’s sweet spot.',
        next: { q: 'q2' },
      },
      {
        label: '4–6 channels',
        desc: 'Growing, but still manageable on per-channel billing.',
        next: { q: 'q3' },
      },
      {
        label: '7+ channels',
        desc: 'Scale where per-channel pricing starts to hurt.',
        next: { result: 'dontPick' },
      },
    ],
  },
  q2: {
    title: 'Solo, or working with a team?',
    subtitle: 'Collaboration changes which plan makes sense.',
    options: [
      {
        label: 'Solo',
        desc: 'Just you — or you wear every hat.',
        next: { result: 'freePlan' },
      },
      {
        label: 'Team (needs collaboration)',
        desc: 'Others post or approve alongside you.',
        next: { q: 'q4' },
      },
    ],
  },
  q3: {
    title: 'Do you need deep analytics or listening?',
    subtitle: 'Buffer’s weak spot — be honest about this one.',
    options: [
      {
        label: 'Scheduling + basic numbers only',
        desc: '“How did this post do?” is enough.',
        next: { result: 'essentials' },
      },
      {
        label: 'Listening, competitor views, deep reports',
        desc: 'You live on analytics and benchmarks.',
        next: { result: 'skipBuffer' },
      },
    ],
  },
  q4: {
    title: 'Do you need approval flows?',
    subtitle: 'The line between Essentials and Team.',
    options: [
      {
        label: 'Yes — approvals & permissions matter',
        desc: 'Client work or a real org structure.',
        next: { result: 'teamPlan' },
      },
      {
        label: 'No — sharing the login is fine',
        desc: 'Light collaboration, no red tape.',
        next: { result: 'essentialsShare' },
      },
    ],
  },
}

type Step = 'start' | 'q1' | 'q2' | 'q3' | 'q4' | { kind: 'result'; id: ResultId }

export default function BufferDecisionTree() {
  const [step, setStep] = useState<Step>('start')

  if (step === 'start') {
    return (
      <Shell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Decision Guide
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Which Buffer Plan Fits You?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Answer a few questions and we'll point you to the right plan — or tell you
          when a rival is the smarter pick.
        </p>
        <button
          onClick={() => setStep('q1')}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-500 hover:shadow-lg active:scale-[0.98]"
        >
          Start Picker
          <ArrowRight className="h-4 w-4" />
        </button>
      </Shell>
    )
  }

  if (typeof step === 'object' && 'kind' in step && step.kind === 'result') {
    const r = RESULT_META[step.id]
    return (
      <Shell>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${r.chip}`}
          >
            <Check className="h-3 w-3" />
            Your match
          </span>
          <p className="text-xs font-medium text-ink-400 dark:text-ink-500">
            Based on your answers
          </p>
        </div>

        {r.warning && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800/60 dark:bg-orange-950/30">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
            <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
              {r.warning}
            </p>
          </div>
        )}

        <h3 className={`mt-3 font-serif text-3xl font-medium tracking-tight ${r.accent}`}>
          {r.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-ink-700 dark:text-ink-200">{r.price}</p>
        <p className="mt-2 text-sm font-medium text-ink-600 dark:text-ink-300">{r.headline}</p>

        <ul className="mt-4 space-y-2">
          {r.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300"
            >
              <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${r.accent}`} />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {r.affiliate && r.cta && (
            <a
              href={BUFFER_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg active:scale-[0.98]"
            >
              {r.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
          {!r.affiliate &&
            r.altLinks?.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-100 dark:border-ink-600 dark:text-ink-300 dark:hover:bg-ink-800"
              >
                {link.label}
                <ExternalLinkIcon />
              </a>
            ))}
          <button
            onClick={() => setStep('start')}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            <RotateCcw className="h-4 w-4" />
            Retake
          </button>
        </div>
      </Shell>
    )
  }
  // question steps
  const q = QUESTIONS[step as 'q1' | 'q2' | 'q3' | 'q4']
  return (
    <Shell>
      <h3 className="font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
        {q.title}
      </h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{q.subtitle}</p>
      <div className="mt-5 grid gap-3">
        {q.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() =>
              'q' in opt.next
                ? setStep(opt.next.q)
                : setStep({ kind: 'result', id: opt.next.result })
            }
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
      <button
        onClick={() => setStep('start')}
        className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-ink-400 transition-colors hover:text-ink-600 dark:hover:text-ink-200"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Start over
      </button>
    </Shell>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-70"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
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
