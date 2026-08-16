import { useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react'

type Structure = 'gasket' | 'tray'
type Connection = 'tri' | 'single'
type Switch = 'linear' | 'tactile'
type Step = 'start' | 'q1' | 'q2' | 'q3' | 'result'

interface Answers {
  structure?: Structure
  connection?: Connection
  sw?: Switch
}

const STRUCTURE_OPTS = [
  {
    value: 'gasket' as Structure,
    label: 'Gasket mount',
    desc: 'Plate-cushioned feel — softer, cleaner sound. The custom-world default for heavy typers.',
  },
  {
    value: 'tray' as Structure,
    label: 'Tray mount',
    desc: 'Firm and loud, but cheap and bulletproof. Fine if you type occasionally and budget matters.',
  },
]

const CONNECTION_OPTS = [
  {
    value: 'tri' as Connection,
    label: 'Tri-mode (BT + 2.4G + wired)',
    desc: 'Flip between laptop, desktop, and tablet with one keypress. Multi-device people: get this.',
  },
  {
    value: 'single' as Connection,
    label: 'Single connection',
    desc: 'One device only? Save the money and skip the wireless tax.',
  },
]

const SWITCH_OPTS = [
  {
    value: 'linear' as Switch,
    label: 'Linear',
    desc: 'Smooth, quiet-ish. Built for long typing sessions and shared spaces.',
  },
  {
    value: 'tactile' as Switch,
    label: 'Tactile',
    desc: 'A bump halfway down — satisfying feedback, louder, slightly more fatigue on marathons.',
  },
]

const AMAZON_URL = 'https://amzn.to/3S4Rxjf'

export default function HardwareKeyboardQuiz() {
  const [step, setStep] = useState<Step>('start')
  const [answers, setAnswers] = useState<Answers>({})

  const choose = (key: keyof Answers, val: Structure | Connection | Switch) => {
    setAnswers((prev) => ({ ...prev, [key]: val }))
    if (key === 'structure') setStep('q2')
    else if (key === 'connection') setStep('q3')
    else setStep('result')
  }

  const back = () => {
    setStep((s) => (s === 'q3' ? 'q2' : s === 'q2' ? 'q1' : 'start'))
  }

  if (step === 'start') {
    return (
      <Shell>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Keyboard Picker
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Build your keyboard in 3 questions
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Structure → connection → switch. Answer in order and you've locked in the right board.
        </p>
        <button
          onClick={() => setStep('q1')}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-500 hover:shadow-lg active:scale-[0.98]"
        >
          Start
          <ArrowRight className="h-4 w-4" />
        </button>
      </Shell>
    )
  }

  if (step === 'result') {
    const structureLabel = answers.structure === 'gasket' ? 'Gasket mount' : 'Tray mount'
    const connectionLabel = answers.connection === 'tri' ? 'Tri-mode' : 'Single connection'
    const switchLabel = answers.sw === 'linear' ? 'Linear' : 'Tactile'

    const structureNote =
      answers.structure === 'gasket'
        ? 'Gasket gives your fingers a soft landing on long typing days.'
        : 'Tray is honest and cheap — don\'t let spec sheets bully you into paying more.'
    const connectionNote =
      answers.connection === 'tri'
        ? 'Tri-mode earns its keep the moment you touch a second device.'
        : 'Single connection saves the wireless premium if you never leave one desk.'
    const switchNote =
      answers.sw === 'linear'
        ? 'Linear stays quiet in shared spaces and marathons alike.'
        : 'Tactile rewards every keystroke with feedback — worth the extra noise.'

    return (
      <Shell>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
            <Check className="h-3 w-3" />
            Your match
          </span>
          {[structureLabel, connectionLabel, switchLabel].map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          A board that covers it: Keychron Q1 Max
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Aluminum, gasket, tri-mode, and hot-swappable — so it delivers your structure + connection
          out of the box and you can still try both switch types later. We took a real test run and
          broke down feel, build, and battery life in the review.
        </p>

        <ul className="mt-4 space-y-2">
          {[structureNote, connectionNote, switchNote].map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg active:scale-[0.98]"
          >
            👉 Check Keychron Q1 Max Price (Amazon)
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => {
              setAnswers({})
              setStep('start')
            }}
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
  const meta =
    step === 'q1'
      ? { title: 'Structure: gasket or tray?', sub: 'Sets the floor for feel.', opts: STRUCTURE_OPTS, key: 'structure' as const }
      : step === 'q2'
        ? { title: 'Connection: how many devices?', sub: 'Tri-mode is basically a requirement for remote work.', opts: CONNECTION_OPTS, key: 'connection' as const }
        : { title: 'Switches: linear or tactile?', sub: 'The cheapest thing to experiment with on the desk.', opts: SWITCH_OPTS, key: 'sw' as const }

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          {meta.title}
        </h3>
        <span className="text-xs font-medium text-ink-400 dark:text-ink-500">
          {step === 'q1' ? '1 / 3' : step === 'q2' ? '2 / 3' : '3 / 3'}
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{meta.sub}</p>
      <div className="mt-5 grid gap-3">
        {meta.opts.map((opt) => (
          <button
            key={opt.value}
            onClick={() => choose(meta.key, opt.value)}
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
      {step !== 'q1' && (
        <button
          onClick={back}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink-500 transition-colors hover:text-ink-900 dark:hover:text-ink-200"
        >
          ← Back
        </button>
      )}
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
