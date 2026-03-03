import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

function buildPageHref(page: number) {
  return page === 1 ? '/' : `/?page=${page}`
}

const Pagination = ({ currentPage, totalPages }: Readonly<PaginationProps>) => {
  console.log({ currentPage })

  return (
    <div className="rounded-lg border-t border-gray-200 bg-white px-4 py-6 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={buildPageHref(Math.max(1, currentPage - 1))}
          aria-disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? 'pointer-events-none cursor-not-allowed text-gray-400 opacity-50'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous
        </Link>
        <Link
          href={buildPageHref(Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? 'pointer-events-none cursor-not-allowed text-gray-400 opacity-50'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next
        </Link>
      </div>

      <div className="hidden items-center justify-between sm:flex sm:flex-1">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={buildPageHref(pageNum)}
            scroll
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ring-1 ring-gray-300 ring-inset focus:outline-offset-0 ${
              currentPage === pageNum
                ? 'z-10 bg-blue-600 text-white ring-blue-600'
                : 'text-gray-900 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Pagination
