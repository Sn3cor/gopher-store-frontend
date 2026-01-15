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
            setOrders(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const createOrder = async () => {
        try {
            const res = await fetchWithRefresh("http://localhost:3000/api/orders", {
                method: "POST",
            })

            const data = await res.json()
            console.log(data)

        }
        catch (error) {
            console.log(error)
        }
    }

    return { orders, fetchOrders, createOrder, totalSpent };
};