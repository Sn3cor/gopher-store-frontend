import type { DateString } from "./types"

export interface Product {
    id: number
    createdAt: DateString
    updatedAt: DateString
    deletedAt: DateString | null
    title: string
    price: number
    description: string
    category: string
    image: string
    quantity: number
}
