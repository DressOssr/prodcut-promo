import { Suspense } from 'react'
import { type Product } from '@/types/product'
import CheckoutPage from '@/components/CheckoutPage'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorFallback from '@/components/ErrorFallback'

interface ProductPageProps {
  readonly params: Promise<{
    readonly id: string
  }>
}

interface ProductData {
  product: Product | null
  error: string | null
}

async function fetchProductData(productId: string): Promise<ProductData> {
  try {
    const url = `https://dummyjson.com/products/${productId}?select=id,title,description,price,discountPercentage,rating,stock,tags,brand,category,thumbnail,images`
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) {
        return { product: null, error: 'Product not found. Please check the product ID.' }
      }
      return { product: null, error: 'Failed to fetch product details' }
    }

    const product: Product = await response.json()
    return { product, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    return { product: null, error: errorMessage }
  }
}

const ProductCheckout = async ({ productId }: { readonly productId: string }) => {
  const { product, error } = await fetchProductData(productId)

  if (error) {
    return <ErrorFallback error={error} />
  }

  if (!product) {
    return <ErrorFallback error="Unable to load product" />
  }

  return <CheckoutPage product={product} />
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductCheckout productId={id} />
    </Suspense>
  )
}

export default ProductPage
