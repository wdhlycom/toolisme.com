import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ListOrdered,
  Target,
  Filter,
  FlaskConical,
  ClipboardList,
  Calculator,
  BadgeDollarSign,
  ShieldCheck,
  PenLine,
  Mail,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import RubricTable, { type RubricDimension } from '@/components/RubricTable'

const TOC_SECTIONS = [
  { id: 'mission', label: 'Our Mission', icon: Target },
  { id: 'selection', label: 'How We Choose What to Review', icon: Filter },
  { id: 'testing', label: 'How We Test', icon: FlaskConical },
  { id: 'rubric', label: 'Our Rating Rubric', icon: ClipboardList },
  { id: 'scoring-formula', label: 'How the Final Score is Calculated', icon: Calculator },
  { id: 'affiliate-disclosure', label: 'Affiliate Disclosure', icon: BadgeDollarSign },
  { id: 'independence', label: 'Independence & Corrections', icon: ShieldCheck },
  { id: 'authors', label: 'Who Writes', icon: PenLine },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const RUBRIC_DIMENSIONS: RubricDimension[] = [
  {
    dimension: 'Features',
    weight: 25,
    description: 'Does it do the job, and do the headline capabilities actually work?',
  },
  {
    dimension: 'Ease of Use',
    weight: 20,
    description: 'Setup, onboarding, and daily friction.',
  },
  {
    dimension: 'Pricing & Value',
    weight: 20,
    description: 'What you get for the money, across plans, not just the cheapest tier.',
  },
  {
    dimension: 'Customer Support',
    weight: 15,
    description: 'Response speed and resolution quality from tickets we file ourselves.',
  },
  {
    dimension: 'Security & Privacy',
    weight: 10,
    description: 'Data handling, encryption, and policy transparency.',
  },
  {
    dimension: 'Integrations',
    weight: 10,
    description: 'How well it fits the rest of your stack.',
  },
]

const CONTACT_EMAILS = [
  { label: 'Editorial', address: 'hello@toolisme.com' },
  { label: 'Corrections', address: 'corrections@toolisme.com' },
  { label: 'Tips & suggestions', address: 'master@toolisme.com' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://toolisme.com/#organization',
      name: 'Toolisme',
      description:
        'An independent review site that tests SaaS, AI, creator, security, and hardware tools hands-on against a published scoring rubric. Reader-supported through affiliate commissions — no pay-for-play reviews.',
      url: 'https://toolisme.com',
      sameAs: [
        'https://twitter.com/toolisme',
        'https://github.com/toolisme',
        'https://www.linkedin.com/company/toolisme',
      ],
    },
    {
      '@type': 'AboutPage',
      '@id': 'https://toolisme.com/methodology#aboutpage',
      name: 'How We Review',
      description:
        'How Toolisme selects, tests, and scores SaaS, AI, creator, security, and hardware tools. Our editorial standards, scoring rubric, and affiliate disclosure.',
      about: { '@id': 'https://toolisme.com/#organization' },
      isPartOf: { '@id': 'https://toolisme.com/#website' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://toolisme.com/methodology#webpage',
      name: 'How We Review',
      url: 'https://toolisme.com/methodology',
      description:
        'Toolisme editorial methodology: tool selection criteria, hands-on testing process, six-dimension scoring rubric, weighted score formula, affiliate disclosure, and corrections policy.',
      isPartOf: { '@id': 'https://toolisme.com/#website' },
      about: { '@id': 'https://toolisme.com/#organization' },
      lastReviewedBy: {
        '@type': 'Organization',
        '@id': 'https://toolisme.com/#editorial-team',
        name: 'Toolisme Editorial Team',
      },
      reviewedBy: {
        '@type': 'Organization',
        '@id': 'https://toolisme.com/#editorial-team',
        name: 'Toolisme Editorial Team',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://toolisme.com/#website',
      url: 'https://toolisme.com',
      name: 'Toolisme',
      publisher: { '@id': 'https://toolisme.com/#organization' },
    },
  ],
}

export default function MethodologyPage() {
  const [activeSection, setActiveSection] = useState('mission')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    )
    TOC_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Editorial Standards"
        title="How We Review"
        description="How we select, test, and score every tool we review — and how affiliate relationships do (and don't) affect our recommendations."
        breadcrumbs={[{ label: 'Methodology' }]}
      />

      {/* Main content with sticky TOC */}
      <section className="container-page py-16">
        <div className="mx-auto flex max-w-6xl gap-10">
          {/* Sticky Table of Contents */}
          <aside className="hidden w-60 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <div className="flex items-center gap-2">
                <ListOrdered className="h-4 w-4 text-accent-600" />
                <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  Contents
                </h2>
              </div>
              <nav
                aria-label="On this page"
                className="mt-4 space-y-1 border-l border-ink-200 dark:border-ink-700"
              >
                {TOC_SECTIONS.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      aria-current={activeSection === s.id ? 'true' : undefined}
                      className={`flex w-full items-center gap-2 border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                        activeSection === s.id
                          ? 'border-accent-500 font-semibold text-accent-700 dark:text-accent-400'
                          : 'border-transparent text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                      {s.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Article body */}
          <div className="min-w-0 flex-1">
            <div className="prose-toolisme max-w-none dark:prose-invert">
              {/* Mission */}
              <div id="mission" className="scroll-mt-24">
                <h2>Our Mission</h2>
                <p>
                  Toolisme exists for one reason: to help you spend less time second-guessing
                  software and more time actually using it. The internet is flooded with "top 10"
                  lists written by people who never opened the product. We're not interested in
                  adding to that noise.
                </p>
                <p>
                  We cover SaaS, AI, creator, security, and hardware tools for an English-speaking
                  global audience — solo founders, small teams, and everyday makers who need to
                  make a buying call without a procurement department. If a tool can save you
                  money, time, or a headache, we want to tell you whether it actually delivers.
                </p>
              </div>

              {/* Selection */}
              <div id="selection" className="scroll-mt-24">
                <h2>How We Choose What to Review</h2>
                <p>
                  We review tools our readers are already asking about or actively shopping for.
                  Search demand, reader requests, and gaps in honest coverage drive our queue —
                  not sponsor interest. If a vendor offers to pay for a review, we politely
                  decline. Reviews are never for sale.
                </p>
                <p>
                  We draw clear category boundaries so comparisons stay fair. A password manager is
                  scored against password managers, not full endpoint security suites. When a tool
                  blurs categories, we state which lens we're using and why, so you're never
                  comparing apples to billing software.
                </p>
              </div>

              {/* Testing */}
              <div id="testing" className="scroll-mt-24">
                <h2>How We Test</h2>
                <p>
                  Every tool on Toolisme is used hands-on by a real person, on real accounts we pay
                  for ourselves. No vendor-supplied demos, no press kits standing in for
                  experience.
                </p>
                <p>
                  Our test environment mirrors a working reader's setup: a current Windows and
                  macOS machine, a modern Chromium browser, and standard home or small-office
                  networking. For mobile tools we test on recent iOS and Android devices. Security
                  and privacy tools get extra scrutiny on a clean virtual machine so we can
                  observe network behavior without contaminating our main systems.
                </p>
                <p>
                  We live with each tool for at least two full weeks of daily use before scoring.
                  Longer for steep learning curves or seasonal use. During that window we collect
                  hard evidence: dated screenshots of core workflows, exported outputs, tickets
                  we file ourselves, and billing receipts. If we claim a feature is broken, slow, or
                  exceptional, there's a screenshot or log behind it.
                </p>
              </div>

              {/* Rubric */}
              <div id="rubric" className="scroll-mt-24">
                <h2>Our Rating Rubric</h2>
                <p>
                  Each tool is scored across six dimensions, every one on a 0–10 scale. The
                  weights reflect what matters most to a real buying decision:
                </p>
                <div className="not-prose mt-8">
                  <RubricTable dimensions={RUBRIC_DIMENSIONS} />
                </div>
              </div>

              {/* Scoring formula */}
              <div id="scoring-formula" className="scroll-mt-24">
                <h2>How the Final Score is Calculated</h2>
                <p>
                  The final score is a weighted average of the six dimension scores. Multiply each
                  score (0–10) by its weight, sum the results, and round to one decimal:
                </p>
                <div className="not-prose mt-6 overflow-x-auto rounded-2xl bg-ink-900 p-6 dark:bg-ink-800">
                  <p className="whitespace-nowrap text-center font-serif text-sm text-white sm:text-base">
                    Final Score = (Features &times; 0.25) + (Ease of Use &times; 0.20) + (Pricing
                    &amp; Value &times; 0.20) + (Customer Support &times; 0.15) + (Security &amp;
                    Privacy &times; 0.10) + (Integrations &times; 0.10)
                  </p>
                </div>
                <p>
                  That produces a number from 0.0 to 10.0, shown alongside the individual dimension
                  bars so you can see exactly where a tool won or lost. Rankings within a category
                  sort by this score, with ties broken by Pricing &amp; Value — because a close
                  call should favor the better deal.
                </p>
              </div>

              {/* Affiliate disclosure */}
              <div id="affiliate-disclosure" className="scroll-mt-24">
                <h2>Affiliate Disclosure</h2>
                <p>
                  Some links on Toolisme are affiliate links. If you click one and buy, we may earn
                  a commission at no extra cost to you. That's how we keep the lights on without
                  putting articles behind a paywall.
                </p>
                <p>
                  <strong>Here's the line we won't cross:</strong> affiliate relationships never
                  affect scores or rankings. Commissions are earned on clicks and conversions, not
                  on favorable write-ups. A tool can pay us zero and still out-rank one that pays
                  us plenty, because the score is math, not a negotiation.
                </p>
                <p>
                  For the full disclosure, see our{' '}
                  <Link to="/disclosure" className="link-underline">
                    affiliate disclosure page
                  </Link>
                  .
                </p>
              </div>

              {/* Independence & corrections */}
              <div id="independence" className="scroll-mt-24">
                <h2>Independence &amp; Corrections</h2>
                <p>
                  We get things wrong sometimes, and we'd rather fix it fast than defend it
                  forever. Found an error, a stale claim, or a tool that changed since we
                  published? Email{' '}
                  <a href="mailto:corrections@toolisme.com" className="link-underline">
                    corrections@toolisme.com
                  </a>{' '}
                  and we'll verify and update.
                </p>
                <p>
                  We revisit every review on a rolling basis — at minimum every six months, or
                  sooner when a tool ships a major change. Every substantive edit is logged in a
                  public changelog on the review page so you can see what changed and when. No
                  silent rewrites.
                </p>
              </div>

              {/* Authors */}
              <div id="authors" className="scroll-mt-24">
                <h2>Who Writes</h2>
                <p>
                  Toolisme reviews are written by editors with domain experience — people who have used or deeply researched the tools they write about, and who aggregate real user feedback where direct testing isn't possible.
                  Many come from engineering, security, or creative production backgrounds rather than marketing.
                </p>
                <p>
                  Every review carries the author's name and the date it was last verified. That
                  name is a real accountability marker, not a byline decoration: if the methodology
                  slipped, the person responsible is right there.
                </p>
                <p>
                  You can meet the full team on our{' '}
                  <Link to="/editorial-team" className="link-underline">
                    editorial team page
                  </Link>
                  .
                </p>
              </div>

              {/* Contact */}
              <div id="contact" className="scroll-mt-24">
                <h2>Contact</h2>
                <p>
                  Questions, tips, or a tool you think we're missing? Reach the editorial team at:
                </p>
                <div className="not-prose mt-6 space-y-3">
                  {CONTACT_EMAILS.map((c) => (
                    <div
                      key={c.address}
                      className="flex items-center gap-3 rounded-xl border border-ink-200/70 bg-white p-4 dark:border-ink-700 dark:bg-ink-900"
                    >
                      <Mail className="h-5 w-5 flex-shrink-0 text-accent-600" />
                      <span className="text-sm font-medium text-ink-900 dark:text-ink-100">
                        {c.label}:
                      </span>
                      <a
                        href={`mailto:${c.address}`}
                        className="text-sm text-accent-700 transition-colors hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300"
                      >
                        {c.address}
                      </a>
                    </div>
                  ))}
                </div>
                <p>
                  We read every message, even if we can't reply to all of them. If you caught
                  something we missed, you're exactly who we want hearing from.
                </p>
                <div className="not-prose mt-8">
                  <Link to="/about#contact" className="btn-primary">
                    Get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
