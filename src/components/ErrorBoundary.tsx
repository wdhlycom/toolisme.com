import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

/**
 * Lightweight error boundary so a render-time crash shows a readable message
 * instead of a blank white page. Useful while diagnosing route-specific issues.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('Render error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-2xl p-8 font-mono text-sm text-red-700">
          <h1 className="mb-3 text-lg font-bold">Something went wrong on this page</h1>
          <pre className="whitespace-pre-wrap rounded-lg bg-red-50 p-4 text-red-900">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
