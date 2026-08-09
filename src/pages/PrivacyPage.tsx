import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Toolisme collects, uses, and protects your data. Last updated August 2026."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="container-prose py-16">
        <div className="prose-toolisme">
          <div className="not-prose mb-10 flex items-start gap-4 rounded-2xl border border-sage-200 bg-sage-50 p-6 dark:border-sage-800 dark:bg-sage-950">
            <ShieldCheck className="h-6 w-6 flex-shrink-0 text-sage-600" />
            <p className="text-sm leading-relaxed text-ink-700">
              <strong>TL;DR:</strong> We collect minimal data, we do not sell it, and we
              use cookies only to understand how the site is used and to power affiliate
              tracking. You can opt out at any time.
            </p>
          </div>

          <h2>1. Information we collect</h2>
          <p>
            We may collect information about you in a few ways when you visit Toolisme:
          </p>
          <h3>1.1 Personal data</h3>
          <p>
            Personally identifiable information you voluntarily provide — such as your
            name, email address, and message when you use our contact form, subscribe to
            our newsletter, or otherwise interact with the Site.
          </p>
          <h3>1.2 Derivative and technical data</h3>
          <p>
            Information our servers collect automatically: your IP address, browser type,
            operating system, access times, and the pages you viewed directly before and
            after visiting Toolisme.
          </p>
          <h3>1.3 Cookies and tracking technologies</h3>
          <p>
            We use cookies, web beacons, and similar technologies to customize the Site and
            improve your experience. With your consent, some also power affiliate tracking
            (see Section 4).
          </p>

          <h2>2. How we use your information</h2>
          <p>
            Accurate information lets us give you a smooth, efficient experience. We use it to:
          </p>
          <ul>
            <li>Operate, maintain, and improve the Site and our reviews.</li>
            <li>Respond to your comments, questions, and customer-service requests.</li>
            <li>Send technical notices, updates, and support messages.</li>
            <li>Monitor usage and trends to improve the experience.</li>
            <li>Comply with legal obligations and prevent fraud or abuse.</li>
          </ul>

          <h2>3. Legal basis for processing (EEA/UK — GDPR)</h2>
          <p>
            If you are in the European Economic Area (EEA) or the United Kingdom, we rely on
            the following bases: your consent where given; the need to perform a contract with
            you; and our legitimate interests (such as improving the Site) where they are not
            overridden by your rights or freedoms.
          </p>

          <h2>4. Disclosure and sharing</h2>
          <p>
            We do not sell your personal data. We may share it only as described here:
          </p>
          <h3>4.1 By law or to protect rights</h3>
          <p>
            If we believe disclosure is necessary to respond to legal process, investigate or
            remedy potential policy violations, or protect the rights, property, and safety of
            others.
          </p>
          <h3>4.2 Third-party service providers</h3>
          <ul>
            <li>
              <strong>Affiliate networks</strong> (such as Impact, PartnerStack, or ShareASale)
              set referral cookies when you click an affiliate link, so the provider knows you
              came from Toolisme. This is how we earn commissions — it never affects our ratings.
            </li>
            <li>
              <strong>Giscus</strong> powers our comment system; comments are stored on GitHub
              Discussions and are subject to GitHub's privacy policy.
            </li>
            <li>
              <strong>Email provider</strong> sends our newsletter, if you subscribe.
            </li>
            <li>
              <strong>Analytics</strong> helps us understand, in aggregate, how the Site is used.
            </li>
          </ul>

          <h2>5. International data transfers</h2>
          <p>
            Toolisme operates globally. Data may be transferred to, stored, and processed in
            countries outside your home country (including the United States), where laws may
            differ. For EEA/UK users, we rely on safeguards such as Standard Contractual Clauses
            approved by the European Commission.
          </p>

          <h2>6. Your data protection rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, or delete
            your data, object to or restrict processing, receive your data portably, and withdraw
            consent at any time.
          </p>
          <h3>6.1 EEA/UK residents (GDPR)</h3>
          <ul>
            <li>Access and rectification of your data.</li>
            <li>Erasure ("right to be forgotten").</li>
            <li>Restrict or object to processing.</li>
            <li>Data portability to another organization.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <h3>6.2 United States residents (CCPA/CPRA)</h3>
          <ul>
            <li>Know what personal information we collect, use, and disclose.</li>
            <li>Delete your personal information.</li>
            <li>Opt out of the "sale" or "sharing" of personal information (note: we do not sell it).</li>
            <li>Non-discrimination for exercising your rights.</li>
          </ul>
          <p>
            To exercise any right, <Link to="/contact">contact us</Link>.
          </p>

          <h2>7. Security</h2>
          <p>
            We use administrative, technical, and physical measures to help protect your
            information. No method of transmission or storage is perfectly secure, but we work to
            protect your data — and when testing tools we never use real customer or reader data,
            only our own mock data and internal files.
          </p>

          <h2>8. Children's privacy</h2>
          <p>
            We do not knowingly collect from children under 13 (or under 16 in the EEA). If we
            learn we have, we will delete it as quickly as possible.
          </p>

          <h2>9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will revise the "Last updated"
            date at the top of this page and encourage you to review it periodically.
          </p>

          <h2>10. Contact us</h2>
          <p>
            Questions or requests about this policy or your data? <Link to="/contact">Reach out</Link>
            and we will be happy to help.
          </p>
        </div>
      </section>
    </div>
  )
}
