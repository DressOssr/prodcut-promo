'use client'

import { useState } from 'react'
import type { Product } from '@/types/product'
import ProductCard from './ProductCard'
import PromoForm from './PromoForm'
import OrderSummary from './OrderSummary'

interface CheckoutPageProps {
  product: Product
}

const CheckoutPage = ({ product }: Readonly<CheckoutPageProps>) => {
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = product.price * (1 - product.discountPercentage / 100)

  const promoDiscountAmount = (subtotal * promoDiscount) / 100

  const total = subtotal - promoDiscountAmount

  const handlePromoApply = (code: string, discount: number) => {
    setIsLoading(true)
    setAppliedPromo(code || null)
    setPromoDiscount(code ? discount : 0)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">Checkout</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            <ProductCard product={product} />
            <PromoForm
              onPromoApply={handlePromoApply}
              appliedPromo={appliedPromo}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <OrderSummary
                subtotal={subtotal}
                discount={promoDiscountAmount}
                discountPercent={promoDiscount}
                total={total}
                appliedPromo={appliedPromo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
