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
  smart: {
    title: 'WiziShop Smart Plan',
    plan: 'Smart — €24.90/mo billed annually',
    price: '€24.90/mo',
    points: [
      '1,000 products · Unlimited AI content',
      'Pizi photo-to-product-page app included',
      '50 built-in SEO tools · 250+ apps',
      '7-day free trial, no credit card',
    ],
    affiliate: true,
    url: 'https://wizishop.com/plans?utm_source=wizishoppartners&utm_campaign=ourplansen&afmc=joz803',
    cta: 'Try Smart Free for 7 Days',
    chip: 'Best for solo sellers & small catalogs',
    accent: 'bg-amber-400 text-ink-950',
  },
  business: {
    title: 'WiziShop Business Plan',
    plan: 'Business — €99.90/mo billed annually',
    price: '€99.90/mo',
    points: [
      'Unlimited products · AI translation to 7 markets',
      '5,000 marketing emails/mo · 1% transaction fee',
      'Full AI suite + Business Coach support',
      '7-day free trial, no credit card',
    ],
    affiliate: true,
    url: 'https://wizishop.com/plans?utm_source=wizishoppartners&utm_campaign=ourplansen&afmc=joz803',
    cta: 'Try Business Free for 7 Days',
    chip: 'Best for multilingual & high-SKU sellers',
    accent: 'bg-amber-400 text-ink-950',
  },
  skip_asia: {
    title: 'Not the Right Fit — Skip WiziShop',
    plan: 'Language support stops at European languages',
    price: '—',
    points: [
      'No Chinese, Japanese, or Korean support',
      'EUR billing may complicate your accounting',
      'Consider Shopify (broader ecosystem) instead',
      'Or a local-first builder in your region',
    ],
    affiliate: false,
    url: '#',
    cta: '',
    chip: 'Hard no for Asian markets',
    accent: 'bg-stone-200 text-ink-700',
    warning: "If your target market is primarily Asia, WiziShop's language gap is a dealbreaker. Look at regional alternatives.",
  },
  skip_budget: {
    title: 'Tight Budget? Consider Alternatives',
    plan: 'Entry price above Shopify base tier',
    price: 'from €24.90/mo',
    points: [
      'Shopify starts from $29/mo with more apps',
      'WooCommerce is free (hosting extra)',
      'Wix ecommerce from ~$17/mo',
      'Only pick WiziShop if the AI suite justifies the premium',
    ],
    affiliate: false,
    url: '#',
    cta: '',
    chip: 'Budget-conscious path',
    accent: 'bg-stone-200 text-ink-700',
  },
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-900">
      <div className="border-b border-ink-100 bg-ink-50 px-6 py-3 dark:border-ink-800 dark:bg-ink-950/50">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-500">
          Which plan fits you?
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default function WiziShopDecisionTree() {
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
            <p className="text-xs text-ink-400">No affiliate link — this result is a neutral recommendation.</p>
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

  // Q1: Target market
  if (step.kind === 'q1') {
    return (
      <Shell>
        <h3 className="font-serif text-base font-bold text-ink-900">Q1: Is your target market US/Europe?</h3>
        <p className="mt-1 text-sm text-ink-500">WiziShop's language support covers European languages (FR/EN/DE/IT/ES/PT/NL). No Asian languages.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {[
            { label: 'Yes, US/EU focused', next: 'q2' as string, accent: 'bg-accent-600 text-white hover:bg-accent-700' },
            { label: 'Mixed / Global', next: 'q2' as string, accent: 'bg-amber-400 text-ink-950 hover:bg-amber-500' },
            { label: 'Primarily Asia', key: 'skip_asia', accent: 'bg-stone-200 text-ink-700 hover:bg-stone-300' },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => opt.key ? setResultKey(opt.key) : setStep({ kind: opt.next! })}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all active:scale-[0.98] ${opt.accent}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Shell>
    )
  }

  // Q2: SKU count
  if (step.kind === 'q2') {
    return (
      <Shell>
        <h3 className="font-serif text-base font-bold text-ink-900">Q2: How many SKUs do you manage?</h3>
        <p className="mt-1 text-sm text-ink-500">AI batch content scales with catalog size. Small catalogs may not justify the premium.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {[
            { label: '< 50 SKUs', key: 'skip_budget', accent: 'bg-stone-200 text-ink-700 hover:bg-stone-300' },
            { label: '50–500 SKUs', next: 'q3' as string, accent: 'bg-amber-400 text-ink-950 hover:bg-amber-500' },
            { label: '500+ SKUs', key: 'business', accent: 'bg-accent-600 text-white hover:bg-accent-700' },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => opt.key ? setResultKey(opt.key) : setStep({ kind: opt.next! })}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all active:scale-[0.98] ${opt.accent}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Shell>
    )
  }

  // Q3: Multilingual need
  if (step.kind === 'q3') {
    return (
      <Shell>
        <h3 className="font-serif text-base font-bold text-ink-900">Q3: Do you need multilingual translation?</h3>
        <p className="mt-1 text-sm text-ink-500">Business plan unlocks AI translation to 7 markets. Smart plan is English-only.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {[
            { label: 'Yes, I sell in multiple languages', key: 'business', accent: 'bg-accent-600 text-white hover:bg-accent-700' },
            { label: 'No, English-only is fine', key: 'smart', accent: 'bg-amber-400 text-ink-950 hover:bg-amber-500' },
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
      <h3 className="font-serif text-lg font-bold text-ink-900">Build your WiziShop plan in 3 questions</h3>
      <p className="mt-1.5 text-sm text-ink-500">Answer honestly — we'll match you to the right tier (or tell you to look elsewhere).</p>
      <button
        onClick={() => setStep({ kind: 'q1' })}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-ink-950 shadow-md shadow-amber-400/30 transition-all hover:bg-accent-600 hover:text-white active:scale-[0.98]"
      >
        Start Quiz <ArrowRight className="h-4 w-4" />
      </button>
    </Shell>
  )
}
