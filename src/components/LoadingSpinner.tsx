const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="inline-block">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
