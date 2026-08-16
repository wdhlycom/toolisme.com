import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react'

type PlanId = 'starter' | 'proS' | 'proM' | 'ultra' | 'finder'

type PlanMeta = {
  name: string
  price: string
  url: string
  headline: string
  points: string[]
  chip: string
  accent: string
}

const PLAN_META: Record<PlanId, PlanMeta> = {
  starter: {
    name: 'Snov.io Starter',
    price: '$39/mo ($29.25 annual)',
    url: 'https://snov.io?fp_ref=hu82',
    headline: 'Best for newcomers & budget-first solo sellers',
    points: [
      'Burn the free 50 credits first, upgrade once comfortable',
      '1,000 credits + 3 warm-up slots included',
      'Unlimited follow-ups and a free CRM',
    ],
    chip: 'bg-amber-500',
    accent: 'text-amber-700 dark:text-amber-400',
  },
  proS: {
    name: 'Snov.io Pro S',
    price: '$99/mo ($74.25 annual)',
    url: 'https://snov.io?fp_ref=hu82',
    headline: 'Best for standard teams running omnichannel',
    points: [
      'Unlimited warm-up slots — the real value unlock',
      'Full feature set: A/B testing, Spintax, API',
      'Add LinkedIn automation ($69/mo slot) on top',
    ],
    chip: 'bg-accent-600',
    accent: 'text-accent-700 dark:text-accent-400',
  },
  proM: {
    name: 'Snov.io Pro M',
    price: '$189/mo ($141.75 annual)',
    url: 'https://snov.io?fp_ref=hu82',
    headline: 'Best for growing teams (5,000–50,000 contacts/mo)',
    points: [
      '20,000 credits/mo, 50,000 recipients',
      'Unlimited warm-up + team seats',
      'Room to scale before jumping to Ultra',
    ],
    chip: 'bg-violet-600',
    accent: 'text-violet-700 dark:text-violet-400',
  },
  ultra: {
    name: 'Snov.io Ultra',
    price: '$738/mo ($553.50 annual)',
    url: 'https://snov.io?fp_ref=hu82',
    headline: 'Best for high-volume agencies (50,000+ credits/mo)',
    points: [
      '100,000 credits/mo, 200,000 recipients',
      'Check credit-rollover terms on Custom',
      'Custom plans for very large teams',
    ],
    chip: 'bg-rose-600',
    accent: 'text-rose-700 dark:text-rose-400',
  },
  finder: {
    name: 'Snov.io as a Finder layer',
    price: 'From $39/mo',
    url: 'https://snov.io?fp_ref=hu82',
    headline: 'Best if your sending stack is already locked in',
    points: [
      'Use it purely for find + verify + CRM',
      'Decoupled — won’t disturb your Woodpecker flow',
      'One clean data layer, no tool switching',
    ],
    chip: 'bg-emerald-600',
    accent: 'text-emerald-700 dark:text-emerald-400',
  },
}

const OPTIONS: { label: string; desc: string; plan: PlanId }[] = [
  { label: 'New / small team, under 5,000 contacts/mo', desc: 'Budget-sensitive; just don’t waste credits on verification.', plan: 'starter' },
  { label: 'Standard team — LinkedIn + email omnichannel', desc: 'Add the $69/mo LinkedIn automation slot on top.', plan: 'proS' },
  { label: 'Growing team — 5,000–50,000 contacts/mo', desc: 'Need more credits and headroom to scale.', plan: 'proM' },
  { label: 'High-volume agency — 50,000+ credits/mo', desc: 'Scale to Ultra or a custom plan.', plan: 'ultra' },
  { label: 'Already on Woodpecker — only need to find emails', desc: 'Use Snov.io as a decoupled find + verify layer.', plan: 'finder' },
]

type Step = { kind: 'start' } | { kind: 'q' } | { kind: 'result'; plan: PlanId }

export default function SnovioDecisionTree() {
  const [step, setStep] = useState<Step>({ kind: 'start' })

  if (step.kind === 'start') {
    return (
      <Shell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          30-second picker
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Which Snov.io plan fits you?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Pick your cold-email stage — we’ll match the right tier and show the current price.
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
    const plan = PLAN_META[step.plan]
    return (
      <Shell>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${plan.chip}`}>
            <Check className="h-3 w-3" />
            Your match
          </span>
          <p className="text-xs font-medium text-ink-400 dark:text-ink-500">Based on your stage</p>
        </div>
        <h3 className={`mt-3 font-serif text-3xl font-medium tracking-tight ${plan.accent}`}>{plan.name}</h3>
        <p className="mt-1 text-sm font-semibold text-ink-700 dark:text-ink-200">{plan.price}</p>
        <p className="mt-2 text-sm font-medium text-ink-600 dark:text-ink-300">{plan.headline}</p>
        <ul className="mt-4 space-y-2">
          {plan.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
              <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.accent}`} />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={plan.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg active:scale-[0.98]"
          >
            🚀 Try Snov.io Free (50 Credits, No Credit Card)
            <ArrowRight className="h-4 w-4" />
          </a>
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
        What’s your cold-email stage?
      </h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">One pick — we’ll match the right tier.</p>
      <div className="mt-5 grid gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setStep({ kind: 'result', plan: opt.plan })}
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
