import type { DateString } from "./types";

export interface Review {
    id: number
    createdAt: DateString
    updatedAt: DateString
    deletedAt: DateString | null
    productId: number
    userId: number
    rating: number
    comment: string
}