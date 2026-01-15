import { useState } from "react";
import { useApi } from "./useApi";
import { type Order } from "@/types/order";

export const useOrders = () => {
    const { fetchWithRefresh } = useApi()
    const [orders, setOrders] = useState<Order[]>([])

    const totalSpent = () => {
        return orders.reduce((prev, curr) => prev + curr.total, 0)
    }

    const fetchOrders = async () => {
        try {
            const res = await fetchWithRefresh("http://localhost:3000/api/orders", {
                method: "GET",
            })

            const data = await res.json()
            setOrders(data.reverse())
            console.log(data)
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    const createOrder = async () => {
        try {
            const res = await fetchWithRefresh("http://localhost:3000/api/orders", {
                method: "POST",
            })
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.message)
            }
            const data = await res.json()
            console.log(data)

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    return { orders, fetchOrders, createOrder, totalSpent };
};