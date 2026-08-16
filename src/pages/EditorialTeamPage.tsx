import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { teamMembers, editorialValues } from '@/data/content'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function EditorialTeamPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The people"
        title="Editorial Team"
        description="A small, independent team of writers, researchers, and developers who believe AI tools deserve honest, hands-on reviews."
        breadcrumbs={[{ label: 'Editorial Team' }]}
      />

      {/* Team grid */}
      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="card-hover group p-6">
              <div className="flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.initials}
                  className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-serif text-lg font-medium tracking-tight text-ink-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent-700">{member.role}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {member.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-100 pt-4 dark:border-ink-800">
                {member.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-900 hover:text-white dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-100 dark:hover:text-ink-900"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial standards */}
      <section className="border-y border-ink-200/70 bg-white py-20 dark:border-ink-700/70 dark:bg-ink-950">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Our standards</p>
            <h2 className="section-title">How the team works</h2>
            <p className="mt-4 text-ink-600 text-pretty">
              Every reviewer follows the same editorial guidelines. These are the
              principles that keep our reviews honest.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {editorialValues.map((value) => {
              const Icon = (Icons as unknown as Record<string, LucideIcon>)[value.icon] ?? Icons.ShieldCheck
              return (
                <div key={value.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-ink-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Review process steps */}
      <section className="container-page py-20">
        <p className="eyebrow mb-3">Behind every review</p>
        <h2 className="section-title">Our review process</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              step: '01',
              title: 'We use the tool',
              description:
                'A reviewer spends at least one week using the tool for real tasks — writing articles, generating images, editing video, or automating workflows.',
            },
            {
              step: '02',
              title: 'We score it',
              description:
                'Each tool is scored on features, ease of use, output quality, value, and support. The rubric is the same across every review.',
            },
            {
              step: '03',
              title: 'We publish and update',
              description:
                'The review goes live with pros, cons, pricing, and a rating. We re-test when there is a major update or at least every six months.',
            },
          ].map((item) => (
            <div key={item.step} className="card p-6">
              <span className="font-serif text-4xl font-medium text-ink-200">{item.step}</span>
              <h3 className="mt-3 font-serif text-lg font-medium text-ink-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-200/70 bg-ink-900 py-16 text-center text-white">
        <div className="container-page">
          <Mail className="mx-auto h-10 w-10 text-accent-400" />
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight">
            Want to join the team?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-300 text-pretty">
            We are always looking for reviewers who love testing new tools and writing
            honest assessments.
          </p>
          <Link to="/about#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-all hover:shadow-lg active:scale-[0.98]">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
