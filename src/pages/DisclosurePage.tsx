import { Link } from 'react-router-dom'
import { ShieldCheck, ExternalLink, BadgeDollarSign, Scale } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export default function DisclosurePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Transparency"
        title="Affiliate disclosure"
        description="Toolisme earns revenue through affiliate commissions and display advertising. This page explains exactly how that works and how we keep it from influencing our reviews."
        breadcrumbs={[{ label: 'Disclosure' }]}
      />

      <section className="container-prose py-16">
        <div className="prose-toolisme">
          <div className="not-prose mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: BadgeDollarSign, title: 'We earn commissions', text: 'Some links pay us a fee when you sign up' },
              { icon: Scale, title: 'Scores are independent', text: 'Commissions never change a rating or ranking' },
              { icon: ShieldCheck, title: 'We tell you everything', text: 'Every affiliate link is labeled on the page' },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <item.icon className="h-6 w-6 text-accent-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-1 text-xs text-ink-500">{item.text}</p>
              </div>
            ))}
          </div>

          <h2>What is an affiliate link?</h2>
          <p>
            An affiliate link is a special URL that tracks referrals. When you click one
            and sign up for a paid plan with the tool provider, that provider pays us a
            small commission — typically a percentage of your subscription fee. You pay
            the same price whether or not you use our link. The commission comes out of
            the tool company's marketing budget, not your pocket.
          </p>

          <h2>How we make money</h2>
          <p>
            Toolisme is a free resource. We do not charge readers. Our revenue comes from
            two sources:
          </p>
          <ul>
            <li>
              <strong>Affiliate commissions.</strong> When a reader clicks a link in a
              review and purchases a paid plan, the tool provider may pay us a commission.
              Not all tools we review have affiliate programs, and we review many tools
              that offer no commission at all.
            </li>
            <li>
              <strong>Display advertising.</strong> We may run clearly labeled banner ads
              or sponsored placements. Sponsored content is always marked as such and is
              never presented as a review.
            </li>
          </ul>

          <h2>Our editorial independence promise</h2>
          <p>
            Revenue never influences our reviews, scores, or recommendations. Here is
            how we keep it that way:
          </p>
          <ul>
            <li>
              <strong>Reviewers do not know the commission rate</strong> when they test
              and score a tool. Commission terms are handled separately by the business
              team.
            </li>
            <li>
              <strong>We do not accept paid reviews.</strong> No tool maker can pay us to
              write a review, publish a positive review, or change a score.
            </li>
            <li>
              <strong>We review tools with no affiliate program.</strong> If a tool is
              good, we recommend it whether or not it pays. If a tool with an affiliate
              program is bad, we say so.
            </li>
            <li>
              <strong>Our scoring rubric is public.</strong> You can see exactly how we
              arrived at every rating.
            </li>
          </ul>

          <h2>How to spot an affiliate link</h2>
          <p>
            Every affiliate link on Toolisme is marked. You may see:
          </p>
          <ul>
            <li>
              A small badge or note next to the link that says "Affiliate link" or
              "We may earn a commission."
            </li>
            <li>
              A disclosure statement at the top or bottom of the page.
            </li>
          </ul>
          <p>
            If you are ever unsure, assume the link is an affiliate link. When in doubt,
            you can go directly to the tool's website by typing the address instead of
              clicking our link.
          </p>

          <h2>Why affiliate links matter</h2>
          <p>
            Affiliate revenue lets us keep Toolisme free, independent, and ad-light. It
            means we can spend real time testing tools instead of chasing page views. We
            believe this model — honest reviews funded by optional commissions — is the
            best way to serve readers.
          </p>

          <h2>Third-party tracking and cookies</h2>
          <p>
            Affiliate links typically use cookies to track referrals. When you click an
            affiliate link, a tracking cookie may be set by the tool provider or an
            affiliate network (such as Impact, PartnerStack, or ShareASale). These
            cookies let the provider know that a visitor came from Toolisme. See our{' '}
            <Link to="/privacy">Privacy Policy</Link> for more about cookies and how to
            manage them.
          </p>

          <h2>Your trust is the product</h2>
          <p>
            If we ever broke your trust for a commission, you would stop reading — and
            without readers, we have no business. That is the real incentive: honest
            reviews keep you coming back, and that is what makes the whole model work.
          </p>
          <p>
            Questions about this disclosure?{' '}
            <Link to="/contact">Contact us</Link> and we will answer them.
          </p>
        </div>
      </section>

      <section className="border-t border-ink-200/70 bg-ink-900 py-14 text-center text-white">
        <div className="container-prose">
          <ShieldCheck className="mx-auto h-10 w-10 text-accent-400" />
          <h2 className="mt-4 font-serif text-2xl font-medium">
            Still have questions about how we make money?
          </h2>
          <p className="mt-2 text-ink-300">
            We are happy to explain anything on this page in more detail.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Get in touch
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
