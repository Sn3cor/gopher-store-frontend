import type { Product } from "./product"

export interface Order {
    id: number
    userID: number
    items: OrderItem[]
    total: number
}

export interface OrderItem {
    orderId: number
    productId: number
    product: Product
    amount: number
}