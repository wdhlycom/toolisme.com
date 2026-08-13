import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react'

type ToolId = 'tubemagic' | 'subscribr' | 'invideo' | 'neither'

type ToolMeta = {
  name: string
  url?: string
  headline: string
  points: string[]
  accent: string
  chip: string
  button: string
}

const TOOL_META: Record<ToolId, ToolMeta> = {
  tubemagic: {
    name: 'TubeMagic',
    url: 'https://tubemagic.com/ds#aff=toolisme',
    headline: 'Fast scripts + all-in-one SEO, in your channel voice',
    points: [
      'Voice cloning — paste your channel link, it learns your register',
      'Scripts, titles, descriptions, tags and thumbnails in one subscription',
      '30-day money-back, monthly or yearly billing',
    ],
    accent: 'text-accent-700 dark:text-accent-400',
    chip: 'bg-accent-600',
    button: 'bg-accent-600 hover:bg-accent-500',
  },
  subscribr: {
    name: 'Subscribr',
    url: 'https://subscribr.ai?via=hu-liangyu',
    headline: 'Outlier-driven ideas + retention-first scripts',
    points: [
      'Finds the 2x–10x outlier videos in your niche and breaks them down',
      'Hook–Setup–Payoff templates that read planned, not generated',
      'Competitor tracking with a weekly trend digest',
    ],
    accent: 'text-violet-700 dark:text-violet-400',
    chip: 'bg-violet-600',
    button: 'bg-violet-600 hover:bg-violet-500',
  },
  invideo: {
    name: 'InVideo',
    url: 'https://invideo.io',
    headline: 'A finished video from a single prompt',
    points: [
      'Voiceover, stock and captions generated from one prompt',
      'Free watermarked tier to start',
      'Fastest on-ramp for a brand-new faceless channel',
    ],
    accent: 'text-emerald-700 dark:text-emerald-400',
    chip: 'bg-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-500',
  },
  neither: {
    name: 'Skip both — for now',
    headline: 'At 1–2 videos a month, neither tool pays for itself yet',
    points: [
      'Lean on InVideo\u2019s free allowance or hand-written ChatGPT drafts',
      'Revisit once you publish consistently for a few months',
      'Then pick one tool matched to your real bottleneck',
    ],
    accent: 'text-ink-600 dark:text-ink-300',
    chip: 'bg-ink-500',
    button: 'bg-ink-700 hover:bg-ink-600',
  },
}

type Step =
  | { kind: 'start' }
  | { kind: 'q'; n: 1 | 2 | 3 }
  | { kind: 'result'; tool: ToolId }

export default function TubeMagicQuiz() {
  const [step, setStep] = useState<Step>({ kind: 'start' })

  if (step.kind === 'start') {
    return (
      <QuizShell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Interactive picker
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Which AI script tool fits you?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Three questions, one honest answer — TubeMagic, Subscribr, InVideo, or neither. No sign-up needed.
        </p>
        <button
          onClick={() => setStep({ kind: 'q', n: 1 })}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 shadow-md shadow-amber-400/30 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg hover:shadow-accent-600/30 active:scale-[0.98]"
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
          <p className="text-xs font-medium text-ink-400 dark:text-ink-500">Based on your answers</p>
        </div>
        <h3 className={`mt-3 font-serif text-3xl font-medium tracking-tight ${tool.accent}`}>{tool.name}</h3>
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
          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-lg active:scale-[0.98] ${tool.button}`}
            >
              Visit {tool.name}
              <ArrowRight className="h-4 w-4" />
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
      </QuizShell>
    )
  }

  const q = step as Extract<Step, { kind: 'q' }>
  const configs: Record<1 | 2 | 3, { title: string; intro: string; options: { label: string; desc: string; next: Step }[] }> = {
    1: {
      title: 'Do you edit your own footage?',
      intro: 'This decides whether these script tools even apply to you.',
      options: [
        {
          label: 'Yes — I edit, I just hate scripts and SEO',
          desc: 'Video editing is fine; writing and optimization is the black box.',
          next: { kind: 'q', n: 2 },
        },
        {
          label: 'No — I want a finished video from one prompt',
          desc: 'Voiceover, stock, captions — all generated for me.',
          next: { kind: 'result', tool: 'invideo' },
        },
      ],
    },
    2: {
      title: 'What\u2019s your real bottleneck?',
      intro: 'Both tools write scripts — they just fix different halves of the problem.',
      options: [
        {
          label: 'Writing fast + SEO in one pass',
          desc: 'Channel voice cloning, titles, tags — paste and upload.',
          next: { kind: 'result', tool: 'tubemagic' },
        },
        {
          label: 'Getting people to watch till the end',
          desc: 'Long-form content that lives and dies by watch time.',
          next: { kind: 'q', n: 3 },
        },
      ],
    },
    3: {
      title: 'How often do you publish?',
      intro: 'The last fork: a committed channel, or a side hobby.',
      options: [
        {
          label: 'Weekly or more',
          desc: 'Consistent enough that a paid tool earns its keep.',
          next: { kind: 'result', tool: 'subscribr' },
        },
        {
          label: '1–2 videos a month (side hobby)',
          desc: 'The annual fee won\u2019t pay for itself yet.',
          next: { kind: 'result', tool: 'neither' },
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
              className={`h-1.5 w-6 rounded-full ${n <= q.n ? 'bg-accent-600 dark:bg-accent-400' : 'bg-ink-200 dark:bg-ink-700'}`}
            />
          ))}
        </div>
      </div>
      <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">{cfg.title}</h3>
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
            <span className="mt-1 block text-xs leading-relaxed text-ink-500 dark:text-ink-400">{opt.desc}</span>
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
