interface OrderSummaryProps {
  subtotal: number
  discount: number
  discountPercent: number
  total: number
  appliedPromo: string | null
}

const OrderSummary = ({
  subtotal,
  discount,
  discountPercent,
  total,
  appliedPromo,
}: Readonly<OrderSummaryProps>) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between text-green-700">
              <span>
                Discount {appliedPromo && `(${appliedPromo})`}{' '}
                {discountPercent > 0 && `(${discountPercent}%)`}
              </span>
              <span className="font-semibold">-${discount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="rounded border border-green-300 bg-green-100 p-3 text-sm font-medium text-green-800">
            You save ${discount.toFixed(2)} with this promo code!
          </div>
        )}
      </div>

      <button className="mt-6 w-full rounded-lg bg-green-600 py-3 text-lg font-bold text-white transition-colors hover:bg-green-700">
        Proceed to Checkout
      </button>
    </div>
  )
}

export default OrderSummary
