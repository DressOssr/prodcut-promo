// Mock promo codes database
const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  SAVE30: 30,
  WELCOME: 15,
  SUMMER2024: 25,
}

export function validatePromoCode(code: string): number | null {
  const normalizedCode = code.toUpperCase().trim()
  const discount = PROMO_CODES[normalizedCode]
  return discount ?? null
}

export function getAvailablePromoCodes(): string[] {
  return Object.keys(PROMO_CODES)
}
