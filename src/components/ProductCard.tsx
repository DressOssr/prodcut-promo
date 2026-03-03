import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/product'

interface ProductCardProps {
  readonly product: Product
}

const ProductCard = ({ product }: Readonly<ProductCardProps>) => {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="relative flex h-96 w-full items-center justify-center bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            className="object-contain"
          />
        </div>

        <div className="p-6">
          <div className="mb-2">
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm text-gray-400">{product.brand}</p>
          </div>

          <h2 className="mb-2 text-3xl font-bold text-gray-900">{product.title}</h2>

          <p className="mb-6 text-base text-gray-600">{product.description}</p>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="rounded bg-red-100 px-3 py-1 text-base font-semibold text-red-800">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-yellow-500">{product.rating}★</span>
            </div>
            <span
              className={`text-lg font-semibold ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="mb-3 text-sm font-semibold text-gray-700">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default ProductCard
