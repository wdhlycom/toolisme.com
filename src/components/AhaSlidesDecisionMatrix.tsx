import { ArrowRight } from 'lucide-react'

const AFFILIATE_URL =
  'https://ahaslides.com/?red=toolis&utm_source=toolis&utm_medium=revshare&utm_affiliate_network=reditus'

// 3-card decision matrix. AhaSlides is the hero card (highlighted border + badge),
// the other two are honest alternatives — every card carries exactly 3 core selling
// points so readers self-identify in seconds (from the decision-matrix brief).
const MATRIX = [
  {
    id: 'ahaslides',
    name: 'AhaSlides',
    badge: '🏆 Best Value / Editors\u2019 Pick',
    tagline: 'For: budget-conscious teams and teachers who want flexible plans and all-in-one interaction',
    hero: true,
    features: [
      'Pay monthly or per-event — zero long-term subscription pressure',
      'Free plan unlocks word clouds, spinner wheel, AI quizzes and more',
      'Embeds into PowerPoint & Google Slides without tab-hopping',
    ],
    cta: 'Try AhaSlides Free',
    url: AFFILIATE_URL,
    sponsored: true,
  },
  {
    id: 'mentimeter',
    name: 'Mentimeter',
    badge: '🏢 Enterprise Pick',
    tagline: 'For: teams that need enterprise security, compliance and huge all-hands',
    hero: false,
    features: [
      'SOC 2 / GDPR-grade data privacy and compliance',
      'Enterprise SSO and deep API integrations',
      'Rock-solid stability with thousands of voters online',
    ],
    cta: 'Visit Mentimeter',
    url: 'https://www.mentimeter.com',
    sponsored: false,
  },
  {
    id: 'kahoot',
    name: 'Kahoot!',
    badge: '🎮 Gamified Fun',
    tagline: 'For: K-12 classrooms and high-energy training sessions',
    hero: false,
    features: [
      'Signature sound effects and countdowns',
      'Huge public question bank, one-click import',
      'Game-first competition for students and teams',
    ],
    cta: 'Visit Kahoot!',
    url: 'https://kahoot.com',
    sponsored: false,
  },
]

export default function AhaSlidesDecisionMatrix() {
  return (
    <div className="not-prose my-8">
      <div className="mb-6 text-center">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
          Quick decision: which tool fits you?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          Budget, team size, live-event style — find your match in 30 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
        {MATRIX.map((item) => (
          <div
            key={item.id}
            className={`relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 ${
              item.hero
                ? 'border-2 border-accent-500 bg-white shadow-xl shadow-accent-500/10 md:-translate-y-2 dark:bg-ink-900'
                : 'border border-ink-200 bg-white hover:border-accent-300 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-accent-700'
            }`}
          >
            <div>
              <div className="mb-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.hero
                      ? 'bg-accent-100 text-accent-800 ring-1 ring-accent-300 dark:bg-accent-900/60 dark:text-accent-300 dark:ring-accent-700'
                      : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400'
                  }`}
                >
                  {item.badge}
                </span>
              </div>
              <h4 className="text-lg font-bold text-ink-900 dark:text-ink-100">{item.name}</h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">{item.tagline}</p>
              <ul className="mt-4 space-y-2.5">
                {item.features.map((f) => (
                  <li key={f} className="flex items-start text-xs text-ink-700 dark:text-ink-200">
                    <svg
                      className={`mt-0.5 mr-2 h-4 w-4 flex-shrink-0 ${item.hero ? 'text-accent-600 dark:text-accent-400' : 'text-sage-600'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel={item.sponsored ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
              className={`mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                item.hero
                  ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/30 hover:bg-accent-500'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700'
              }`}
            >
              {item.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
