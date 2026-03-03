import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/product'
import Pagination from '@/components/Pagination'

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const ITEMS_PER_PAGE = 12

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function getProducts(page: number): Promise<ProductsResponse> {
  const skip = (page - 1) * ITEMS_PER_PAGE
  const url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}&select=id,title,price,thumbnail,discountPercentage,rating,stock`

  const response = await fetch(url, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

interface PageContent {
  products: Product[]
  total: number
  totalPages: number
  currentPage: number
}

async function loadPageData(page: number): Promise<PageContent | null> {
  try {
    const data = await getProducts(page)
    const total = data.total
    const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))
    const currentPage = Math.min(page, totalPages)

    return {
      products: data.products,
      total,
      totalPages,
      currentPage,
    }
  } catch {
    return null
  }
}

const Home = async ({ searchParams }: Readonly<PageProps>) => {
  const params = await searchParams
  const pageParam = params.page
  const pageValue = typeof pageParam === 'string' ? Number.parseInt(pageParam, 10) : 1
  const page = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1

  const pageContent = await loadPageData(page)

  if (!pageContent) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h1 className="mb-2 text-2xl font-bold text-red-900">Error</h1>
            <p className="text-red-700">An error occurred while fetching products</p>
          </div>
        </div>
      </div>
    )
  }

  const { products, total, totalPages, currentPage } = pageContent

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} products
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="h-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
                <div className="relative flex h-48 w-full items-center justify-center bg-gray-100">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900">
                    {product.title}
                  </h3>

                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
                            -{product.discountPercentage}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-yellow-500">{product.rating}</span>
                      <span className="text-gray-500">★</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock}` : 'OOS'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default Home
