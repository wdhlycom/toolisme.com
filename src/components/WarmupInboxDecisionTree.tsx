import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check, AlertTriangle } from 'lucide-react'

type ResultId = 'basic' | 'pro' | 'agency' | 'newDomain' | 'diagnostics'

type ResultMeta = {
  name: string
  price: string
  url: string | null
  affiliate: boolean
  headline: string
  points: string[]
  warning?: string
  altLinks?: { label: string; url: string }[]
  chip: string
  accent: string
}

const RESULT_META: Record<ResultId, ResultMeta> = {
  basic: {
    name: 'WarmupInbox Basic',
    price: '$15/inbox/mo (annual $180/yr)',
    url: 'https://www.warmupinbox.com/?red=toolis',
    affiliate: true,
    headline: 'Best for 1–2 established mailboxes on a tight budget',
    points: [
      'Lowest entry in the category — credit-card-free 7-day trial',
      '75 warmup/day cap, 25% reply rate — enough for solo sellers',
      'Real 30,000+ inbox network, not synthetic accounts',
    ],
    chip: 'bg-emerald-500',
    accent: 'text-emerald-700 dark:text-emerald-400',
  },
  pro: {
    name: 'WarmupInbox Pro',
    price: '$49/inbox/mo (annual $588/yr)',
    url: 'https://www.warmupinbox.com/?red=toolis',
    affiliate: true,
    headline: 'Best for multilingual outreach or mostly-Gmail prospects',
    points: [
      'ESP targeting — aim warmup at Gmail, Outlook, or Yahoo specifically',
      '12-language AI-written content with human oversight',
      '250 warmup/day, 45% reply rate — serious volume',
    ],
    chip: 'bg-blue-600',
    accent: 'text-blue-700 dark:text-blue-400',
  },
  agency: {
    name: 'MailReach',
    price: '~$19–25/inbox/mo',
    url: null,
    affiliate: false,
    headline: 'Per-inbox pricing kills at scale — look beyond WarmupInbox',
    points: [
      'Unlimited mailboxes regardless of count',
      'Strong Spam Test + deeper diagnostics than WarmupInbox',
      'Flat-rate billing wins when you warm 10+ mailboxes',
    ],
    altLinks: [{ label: 'Visit MailReach', url: 'https://mailreach.co' }],
    chip: 'bg-slate-500',
    accent: 'text-slate-700 dark:text-slate-300',
  },
  newDomain: {
    name: 'WarmupInbox (with caution)',
    price: '$15–$79/inbox/mo (any plan)',
    url: 'https://www.warmupinbox.com/?red=toolis',
    affiliate: true,
    headline: 'You can use it — but dial the starting volume way down',
    points: [
      'Start at ~10 emails/day, ramp to ~30 over weeks (not days)',
      'Set reply rate to 20% initially, raise slowly',
      'The tool works fine; the problem is aggressive defaults on fresh domains',
    ],
    warning: 'High risk with default settings. New domains (<6 months) get suspended if you blast at recommended volumes.',
    chip: 'bg-orange-500',
    accent: 'text-orange-700 dark:text-orange-400',
  },
  diagnostics: {
    name: 'MailReach or InboxAlly',
    price: 'Varies by plan',
    url: null,
    affiliate: false,
    headline: 'WarmupInbox has no health score or DNS monitoring',
    points: [
      'MailReach: strongest Spam Test + unlimited mailboxes',
      'InboxAlly: reputation-focused diagnostics',
      'If sender health is your #1 concern, pick one of these instead',
    ],
    altLinks: [
      { label: 'Visit MailReach', url: 'https://mailreach.co' },
      { label: 'Visit InboxAlly', url: 'https://inboxally.com' },
    ],
    chip: 'bg-violet-600',
    accent: 'text-violet-700 dark:text-violet-400',
  },
}

const OPTIONS: { label: string; desc: string; result: ResultId }[] = [
  {
    label: 'Warming 1–2 mature inboxes on a tight budget? Just need the basics.',
    desc: 'Lowest cost, credit-card-free trial, real inbox network.',
    result: 'basic',
  },
  {
    label: 'Sending multilingual cold mail? 95%+ recipients on Gmail or Outlook?',
    desc: 'ESP targeting and 12-language support earn their keep here.',
    result: 'pro',
  },
  {
    label: 'Agency warming 10+ inboxes? Per-inbox pricing adds up fast.',
    desc: 'Do the math first — flat-rate tools win at this scale.',
    result: 'agency',
  },
  {
    label: 'New domain (<6 months old)? High risk with default settings.',
    desc: 'You can still use it, but start slow (~10/day) and ramp over weeks.',
    result: 'newDomain',
  },
  {
    label: 'Need a sender health score or continuous DNS monitoring?',
    desc: 'WarmupInbox can\'t deliver deeper diagnostics — look elsewhere.',
    result: 'diagnostics',
  },
]

type Step = { kind: 'start' } | { kind: 'q' } | { kind: 'result'; id: ResultId }

export default function WarmupInboxDecisionTree() {
  const [step, setStep] = useState<Step>({ kind: 'start' })

  if (step.kind === 'start') {
    return (
      <Shell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Decision Guide
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Which Plan (or Tool) Fits You?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Pick your situation — we'll match the right tier or tell you which tool actually fits.
        </p>
        <button
          onClick={() => setStep({ kind: 'q' })}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-500 hover:shadow-lg active:scale-[0.98]"
        >
          Start Picker
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
          <p className="text-xs font-medium text-ink-400 dark:text-ink-500">Based on your situation</p>
        </div>

        {r.warning && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800/60 dark:bg-orange-950/30">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
            <p className="text-sm font-medium text-orange-800 dark:text-orange-300">{r.warning}</p>
          </div>
        )}

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
          {r.affiliate && r.url && (
            <a
              href={r.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg active:scale-[0.98]"
            >
              🚀 Try WarmupInbox Free (7 Days, No Credit Card)
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
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink-700 transition-colors border border-ink-200 hover:bg-ink-100 dark:text-ink-300 dark:border-ink-600 dark:hover:bg-ink-800"
              >
                {link.label}
                <ExternalLinkIcon />
              </a>
            ))}
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
        What's your situation?
      </h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">One pick — we'll match the right plan or tool.</p>
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

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
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
