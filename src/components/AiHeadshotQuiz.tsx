import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react'

type ToolId = 'headshotpro' | 'aragon' | 'betterpic' | 'proshoot'

type ToolMeta = {
  name: string
  url: string
  headline: string
  points: string[]
  accent: string // text color for the result headline
  chip: string // colored chip classes for the result
  button: string // buy button gradient
  dot: string // small dot for progress
}

const TOOL_META: Record<ToolId, ToolMeta> = {
  headshotpro: {
    name: 'HeadshotPro',
    url: 'https://www.headshotpro.com/?via=toolisme',
    headline: 'B2B consistency + a 14-day Profile-Worthy refund',
    points: [
      'One consistent style across your whole team',
      'Team Edition unifies HR, execs and new hires',
      'SOC 2 Type II, photos auto-deleted in 7–30 days',
    ],
    accent: 'text-blue-700 dark:text-blue-400',
    chip: 'bg-blue-600',
    button: 'bg-blue-600 hover:bg-blue-500',
    dot: 'bg-blue-600',
  },
  aragon: {
    name: 'Aragon.ai',
    url: 'https://www.aragon.ai/?via=toolisme',
    headline: 'Fastest in class — 6 selfies, results in ~15–30 min',
    points: [
      'Lowest entry bar: just 6 selfies',
      'Remix editor included free — swap outfits and backgrounds',
      'Highest Trustpilot score in the lineup (4.9)',
    ],
    accent: 'text-emerald-700 dark:text-emerald-400',
    chip: 'bg-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-500',
    dot: 'bg-emerald-600',
  },
  betterpic: {
    name: 'BetterPic',
    url: 'https://betterpic.link/hu-liangyu',
    headline: 'True 4K, human-grade retouching — no wax face',
    points: [
      'Every tier ships real 4K resolution',
      'Expert plan adds unlimited human retouching',
      'Skin texture and lighting hold up under zoom',
    ],
    accent: 'text-violet-700 dark:text-violet-400',
    chip: 'bg-violet-600',
    button: 'bg-violet-600 hover:bg-violet-500',
    dot: 'bg-violet-600',
  },
  proshoot: {
    name: 'Proshoot',
    url: 'https://www.proshoot.co?ref=toolisme',
    headline: 'Built to keep it looking like you',
    points: [
      'Hairline, dimples and moles stay yours',
      'Often ranks first on independent likeness tests',
      'Preview watermarked shots before you pay',
    ],
    accent: 'text-orange-700 dark:text-orange-400',
    chip: 'bg-orange-600',
    button: 'bg-orange-600 hover:bg-orange-500',
    dot: 'bg-orange-600',
  },
}

type Step =
  | { kind: 'start' }
  | { kind: 'q'; n: 1 | 2 | 3 }
  | { kind: 'result'; tool: ToolId }

export default function AiHeadshotQuiz() {
  const [step, setStep] = useState<Step>({ kind: 'start' })

  if (step.kind === 'start') {
    return (
      <QuizShell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Interactive picker
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Which AI headshot tool?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Three quick questions, one honest answer. No sign-up, no ads — just the tool that
          matches your brief.
        </p>
        <button
          onClick={() => setStep({ kind: 'q', n: 1 })}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-500 hover:shadow-lg active:scale-[0.98]"
        >
          Start the quiz
          <ArrowRight className="h-4 w-4" />
        </button>
      </QuizShell>
    )
  }

  if (step.kind === 'result') {
    const tool = TOOL_META[step.tool]
    return (
      <QuizShell>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${tool.chip}`}>
            <Check className="h-3 w-3" />
            Your match
          </span>
          <p className="text-xs font-medium text-ink-400 dark:text-ink-500">
            Based on your answers
          </p>
        </div>
        <h3 className={`mt-3 font-serif text-3xl font-medium tracking-tight ${tool.accent}`}>
          {tool.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-ink-700 dark:text-ink-200">{tool.headline}</p>
        <ul className="mt-4 space-y-2">
          {tool.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
              <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tool.accent}`} />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-[0.98] ${tool.button}`}
          >
            Buy {tool.name}
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
      </QuizShell>
    )
  }

  // Question steps
  const q = step as Extract<Step, { kind: 'q' }>
  const configs: Record<
    1 | 2 | 3,
    { title: string; intro: string; options: { label: string; desc: string; next: Step }[] }
  > = {
    1: {
      title: "Who's buying the headshots?",
      intro: 'This decides whether you need a team system or a fast individual fix.',
      options: [
        {
          label: 'HR team or executive with budget',
          desc: 'We need one consistent look across the company.',
          next: { kind: 'result', tool: 'headshotpro' },
        },
        {
          label: 'Individual — I want results fast',
          desc: 'Personal headshots, minimal fuss.',
          next: { kind: 'q', n: 2 },
        },
      ],
    },
    2: {
      title: 'What matters most in the final photos?',
      intro: 'Speed and convenience, or maximum quality?',
      options: [
        {
          label: 'Speed — few selfies, done in ~30 minutes',
          desc: 'I have a handful of photos and a deadline.',
          next: { kind: 'result', tool: 'aragon' },
        },
        {
          label: 'Quality — true 4K, no wax face',
          desc: 'I hate that smooth plastic AI look.',
          next: { kind: 'q', n: 3 },
        },
      ],
    },
    3: {
      title: 'About facial details…',
      intro: 'The last fork: your real features vs. polished retouching.',
      options: [
        {
          label: 'Must look like ME',
          desc: 'Hairline, dimples, moles — keep them all.',
          next: { kind: 'result', tool: 'proshoot' },
        },
        {
          label: 'Professional retouch, true 4K texture',
          desc: 'Refined skin, real texture, studio finish.',
          next: { kind: 'result', tool: 'betterpic' },
        },
      ],
    },
  }
  const cfg = configs[q.n]

  return (
    <QuizShell>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-ink-500">
          Question {q.n} of 3
        </span>
        <div className="ml-1 flex gap-1">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-1.5 w-6 rounded-full ${
                n <= q.n ? 'bg-accent-600 dark:bg-accent-400' : 'bg-ink-200 dark:bg-ink-700'
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
        {cfg.title}
      </h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{cfg.intro}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {cfg.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setStep(opt.next)}
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
    </QuizShell>
  )
}

function QuizShell({ children }: { children: React.ReactNode }) {
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
