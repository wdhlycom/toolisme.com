import PageHeader from '@/components/PageHeader'
import ContactSection from '@/components/ContactSection'

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Toolisme"
        description="Have a question, a tool to suggest, or a correction to flag? We read every message and respond within two business days."
        breadcrumbs={[{ label: 'Contact' }]}
      />
      <ContactSection />
    </div>
  )
}
