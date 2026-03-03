import Link from 'next/link'

interface ErrorFallbackProps {
  error: string
}

const ErrorFallback = ({ error }: Readonly<ErrorFallbackProps>) => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 sm:p-8">
          <h1 className="mb-2 text-2xl font-bold text-red-900">Oops! Something went wrong</h1>
          <p className="mb-4 text-red-700">{error}</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
