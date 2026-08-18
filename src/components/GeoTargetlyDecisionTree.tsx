import { useState } from 'react'
import { Rocket, RotateCcw, ArrowRight, Check, AlertTriangle } from 'lucide-react'

interface Step { kind: string }

interface Result {
  title: string
  plan: string
  price: string
  points: string[]
  affiliate: boolean
  url: string
  cta: string
  chip: string
  accent: string
  warning?: string
}

const RESULTS: Record<string, Result> = {
  dev: {
    title: 'Geo Targetly Dev Plan',
    plan: 'Dev — $9/mo billed annually',
    price: '$9/mo',
    points: [
      '500k pageviews/mo · Every feature unlocked',
      'Redirects, currency, popups, compliance blocks',
      'Unlimited domains · Test mode for every rule',
      '14-day free trial, no credit card required',
    ],
    affiliate: true,
    url: 'https://geotargetly.com/?red=toolis',
    cta: 'Start Your 14-Day Free Trial',
    chip: 'Best for small sites getting started',
    accent: 'bg-amber-400 text-ink-950',
  },
  growth: {
    title: 'Geo Targetly Growth Plan',
    plan: 'Growth — $39/mo billed annually ⭐ Best Value',
    price: '$39/mo',
    points: [
      'Steady order volume · 5M pageviews/mo',
      'All features: redirects, personalization, popups',
      'Agency-ready: unlimited domains per account',
      '14-day free trial, no credit card required',
    ],
    affiliate: true,
    url: 'https://geotargetly.com/?red=toolis',
    cta: 'Start Your 14-Day Free Trial',
    chip: 'Best value for growing stores',
    accent: 'bg-amber-400 text-ink-950',
  },
  business: {
    title: 'Geo Targetly Business Plan',
    plan: 'Business — $79/mo billed annually',
    price: '$79/mo',
    points: [
      'Multiple sites / agency clients · 15M pageviews',
      'Full toolkit across all client domains',
      'Priority support · Custom rule templates',
      '14-day free trial, no credit card required',
    ],
    affiliate: true,
    url: 'https://geotargetly.com/?red=toolis',
    cta: 'Start Your 14-Day Free Trial',
    chip: 'Best for agencies & multi-site owners',
    accent: 'bg-amber-400 text-ink-950',
  },
  shopify_app: {
    title: 'A Simple Redirect App May Suffice',
    plan: 'You only need country-level redirects',
    price: 'Free – $10/mo',
    points: [
      'GeoIP Redirect or country-redirect Shopify app',
      'Redirects only — no content/currency/popups',
      'Cheaper entry if that\'s all you need',
      'Upgrade to Geo Targetly when you need the full stack',
    ],
    affiliate: false,
    url: '#',
    cta: '',
    chip: 'Lightweight alternative',
    accent: 'bg-stone-200 text-ink-700',
  },
  weglot: {
    title: 'Translation-First? Try Weglot',
    plan: 'You only need language switching',
    price: '~$15/mo+',
    points: [
      'Weglot or Translation Lab for pure translation',
      'No location-driven redirects or popups',
      'Geo Targetly handles translation AND routing together',
      'Combine both if you need the complete package',
    ],
    affiliate: false,
    url: '#',
    cta: '',
    chip: 'Translation specialist',
    accent: 'bg-stone-200 text-ink-700',
  },
  skip_local: {
    title: 'You Probably Don\'t Need Geo Targetly',
    plan: 'Single-market sites don\'t benefit from geo-targeting',
    price: '—',
    points: [
      'If all your visitors see the same experience, save the $9/mo',
      'Revisit when you expand to a second country',
      'One line of code is easy to add later',
    ],
    affiliate: false,
    url: '#',
    cta: '',
    chip: 'Not needed yet',
    accent: 'bg-stone-200 text-ink-700',
  },
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-900">
      <div className="border-b border-ink-100 bg-ink-50 px-6 py-3 dark:border-ink-800 dark:bg-ink-950/50">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-500">
          Which tool fits your needs?
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default function GeoTargetlyDecisionTree() {
  const [step, setStep] = useState<Step>({ kind: 'start' })
  const [resultKey, setResultKey] = useState<string | null>(null)

  if (resultKey) {
    const r = RESULTS[resultKey]
    return (
      <Shell>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-ink-900">{r.title}</h3>
            <p className="mt-0.5 text-sm font-medium text-ink-500">{r.plan}</p>
          </div>

          {r.warning && (
            <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-900/20">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200">{r.warning}</p>
            </div>
          )}

          <ul className="space-y-2">
            {r.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-ink-700">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage-600" />
                {p}
              </li>
            ))}
          </ul>

          <span className="inline-block rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600 dark:bg-ink-800 dark:text-ink-300">
            {r.chip}
          </span>

          {r.affiliate ? (
            <a
              href={r.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className={`group inline-flex w-full items-center justify-between gap-3 rounded-xl ${r.accent} px-5 py-3.5 font-bold shadow-md transition-all active:scale-[0.98] sm:w-auto`}
            >
              <span className="flex items-center gap-2.5">
                <Rocket className="h-5 w-5" />
                🚀 {r.cta}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          ) : (
            <p className="text-xs text-ink-400">Neutral recommendation — no affiliate link.</p>
          )}

          <button
            onClick={() => { setResultKey(null); setStep({ kind: 'start' }) }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-600"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Retake
          </button>
        </div>
      </Shell>
    )
  }

  // Single question
  if (step.kind === 'question') {
    return (
      <Shell>
        <h3 className="font-serif text-base font-bold text-ink-900">What do you actually need?</h3>
        <p className="mt-1 text-sm text-ink-500">Be honest — the right tool depends on scope, not ambition.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Just country redirects', key: 'shopify_app', accent: 'bg-stone-200 text-ink-700 hover:bg-stone-300' },
            { label: 'Only language switching', key: 'weglot', accent: 'bg-stone-200 text-ink-700 hover:bg-stone-300' },
            { label: 'Full toolkit: redirects + currency + popups + compliance', key: 'growth', accent: 'bg-amber-400 text-ink-950 hover:bg-amber-500' },
            { label: 'Small site, just starting out (<500k PV)', key: 'dev', accent: 'bg-accent-600 text-white hover:bg-accent-700' },
            { label: 'Agency / multiple client sites', key: 'business', accent: 'bg-accent-600 text-white hover:bg-accent-700' },
            { label: 'Single market only — not sure I need this', key: 'skip_local', accent: 'bg-stone-200 text-ink-700 hover:bg-stone-300' },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setResultKey(opt.key)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all active:scale-[0.98] ${opt.accent}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Shell>
    )
  }

  // Start screen
  return (
    <Shell>
      <h3 className="font-serif text-lg font-bold text-ink-900">Find your geo-targeting fit</h3>
      <p className="mt-1.5 text-sm text-ink-500">One question. We'll point you to the right tool and plan — or tell you to save your money.</p>
      <button
        onClick={() => setStep({ kind: 'question' })}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-ink-950 shadow-md shadow-amber-400/30 transition-all hover:bg-accent-600 hover:text-white active:scale-[0.98]"
      >
        Start Quiz <ArrowRight className="h-4 w-4" />
      </button>
    </Shell>
  )
}
