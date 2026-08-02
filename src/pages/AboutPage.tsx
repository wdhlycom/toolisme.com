import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const milestones = [
  {
    year: '2023',
    title: 'The time tax',
    description:
      'Our founder kept paying the same tax — weeks lost testing, comparing, and switching between tools that all promised to save time. That frustration became the seed of Toolisme.',
  },
  {
    year: '2024',
    title: 'The review lab',
    description:
      'Those real-world tests and hard-won insights were organized into a personal lab: minimalist, self-funded, and ruthlessly honest about what works and what does not.',
  },
  {
    year: '2025',
    title: 'Toolisme, for everyone',
    description:
      'We opened the lab to the public — a warm, efficient harbor in a cluttered software market, built to help you find the tools that actually fit.',
  },
]

const testingPrinciples = [
  {
    title: 'Self-funded testing',
    description:
      'We buy every tool ourselves and use it long-term, just like a regular user. No vendor "paid praise," no sponsored scores.',
    icon: 'FlaskConical',
  },
  {
    title: 'Zero client data',
    description:
      'When we test SaaS and digital tools, we never use real customer or reader data — only our own mock data and internal files. Your privacy stays respected.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Minimalist, deep insights',
    description:
      'We skip the jargon and fluff, giving you straightforward results, side-by-side pros and cons, and ready-to-use recommendations.',
    icon: 'Feather',
  },
  {
    title: 'Affiliate transparency',
    description:
      'Some links earn us a small commission. It never influences our ratings, and every cent goes back into testing the next batch of tools.',
    icon: 'BadgeCheck',
  },
]

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Toolisme"
        title="We test tools so you don't have to"
        description="Toolisme is an independent review lab built on one idea — helping you stop wasting time choosing tools through real, self-funded testing, not hype."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Mission */}
      <section className="container-prose py-16">
        <div className="prose-toolisme">
          <h2>Our mission</h2>
          <p>
            The internet is flooded with software, and most "best tool" lists are anything
            but independent. Toolisme started from a simple frustration: too much time lost
            testing, comparing, and switching between tools that all promised to save it.
          </p>
          <p>
            We don't believe in one absolute "number one tool," and we don't chase the
            latest hyped release. Every tool that survives today's market exists for a
            reason and has its own strength — the right one depends on you. Our job is to
            cut through the marketing noise with hands-on, subjective testing and show you
            the real pros and cons. We don't define what's best; we help you find what's
            best for you.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-ink-200/70 bg-white py-20">
        <div className="container-page">
          <p className="eyebrow mb-3 text-center">Our testing promise</p>
          <h2 className="section-title text-center">How we test</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-ink-600 text-pretty">
            The same principles guide every review, so you always know what went into a score.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {testingPrinciples.map((value, i) => {
              const Icon = (Icons as unknown as Record<string, LucideIcon>)[value.icon] ?? Icons.ShieldCheck
              return (
                <div key={value.title} className="relative">
                  <span className="absolute -top-3 -left-1 font-serif text-5xl font-medium text-ink-100">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-medium text-ink-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page py-20">
        <p className="eyebrow mb-3">Our story</p>
        <h2 className="section-title">How we got here</h2>

        <div className="mt-12 space-y-8">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative flex gap-6 pb-8 last:pb-0">
              {i < milestones.length - 1 && (
                <div className="absolute left-[27px] top-14 bottom-0 w-px bg-ink-200" />
              )}
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-ink-900 font-serif text-sm font-medium text-white">
                {m.year}
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium text-ink-900">{m.title}</h3>
                <p className="mt-2 max-w-2xl text-ink-600 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-200/70 bg-ink-50 py-16">
        <div className="container-page text-center">
          <h2 className="section-title">Meet the people behind the reviews</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-600 text-pretty">
            A small, independent team of writers, researchers, and developers.
          </p>
          <Link to="/editorial-team" className="btn-primary mt-8">
            View the editorial team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
