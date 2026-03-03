export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface PromoCode {
  code: string
  discountPercent: number
}
