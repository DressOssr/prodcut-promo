'use client'

import React, { useState } from 'react'
import { validatePromoCode } from '@/lib/promoCodes'

interface PromoFormProps {
  onPromoApply: (code: string, discount: number) => void
  appliedPromo: string | null
  isLoading?: boolean
}

const PromoForm = ({ onPromoApply, appliedPromo, isLoading = false }: Readonly<PromoFormProps>) => {
  const [promoInput, setPromoInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    if (!promoInput.trim()) {
      setError('Please enter a promo code')
      return
    }

    const discount = validatePromoCode(promoInput)

    if (discount === null) {
      setError('Invalid promo code')
      setPromoInput('')
      return
    }

    onPromoApply(promoInput.toUpperCase(), discount)
    setPromoInput('')
  }

  const handleRemovePromo = () => {
    onPromoApply('', 0)
    setPromoInput('')
    setError('')
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Apply Promo Code</h3>

      {appliedPromo ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded bg-green-100 px-4 py-2 font-semibold text-green-800">
              {appliedPromo}
            </div>
            <span className="font-medium text-green-700">Applied</span>
          </div>
          <button
            onClick={handleRemovePromo}
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Enter promo code"
              disabled={isLoading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-black outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading || !promoInput.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </form>
      )}
    </div>
  )
}

export default PromoForm
