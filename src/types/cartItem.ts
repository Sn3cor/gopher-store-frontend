import type { Product } from "./product"

export interface CartItem {
    cartId: number
    productId: number
    product: Product
    amount: number
}