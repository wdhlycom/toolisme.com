import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="font-serif text-8xl font-medium text-ink-200">404</p>
        <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink-900">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-600 text-pretty">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}
