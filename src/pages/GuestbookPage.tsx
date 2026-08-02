import { MessageCircle, MapPin, ThumbsUp } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import CommentSystem from '@/components/CommentSystem'
import { guestbookSeed } from '@/data/content'

export default function GuestbookPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Reader wall"
        title="Guestbook"
        description="Say hello, share feedback, or tell us which AI tool you want reviewed next. This is a public space for the Toolisme community."
        breadcrumbs={[{ label: 'Guestbook' }]}
      />

      {/* Welcome message */}
      <section className="container-prose py-12">
        <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-serif text-lg font-medium text-ink-900">
                Welcome to the Toolisme guestbook
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                Leave a message, share how a review helped you, or suggest a tool for us
                to test next. Comments are powered by Giscus and require a GitHub account
                to keep spam out. Be kind — this is a public space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured messages */}
      <section className="container-page pb-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-900">
          Messages from readers
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {guestbookSeed.map((entry) => (
            <div key={entry.id} className="card p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink-900 font-serif text-sm font-medium text-white">
                  {entry.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-ink-900">{entry.name}</h3>
                    <span className="flex items-center gap-1 text-xs text-ink-400">
                      <MapPin className="h-3 w-3" />
                      {entry.location}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    "{entry.message}"
                  </p>
                  <p className="mt-3 text-xs text-ink-400">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comment system */}
      <section className="container-prose pb-20">
        <div className="flex items-center gap-3 border-b border-ink-200 pb-6">
          <ThumbsUp className="h-5 w-5 text-accent-600" />
          <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-900">
            Leave a message
          </h2>
        </div>
        <div className="mt-8">
          <CommentSystem
            repo="your-username/your-repo"
            repoId=""
            category="Guestbook"
            categoryId=""
            mapping="pathname"
          />
        </div>
      </section>
    </div>
  )
}
