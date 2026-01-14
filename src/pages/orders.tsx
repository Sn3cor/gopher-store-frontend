import OrderDetails from "@/components/orderDetails"
import { ItemGroup, ItemSeparator } from "@/components/ui/item"
import { useApi } from "@/hooks/useApi"
import { useAuth } from "@/hooks/useAuth"
import { type Order } from "@/types/order"
import { Item } from "@radix-ui/react-navigation-menu"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Orders = () => {
    const { session } = useAuth()
    const { fetchWithRefresh } = useApi()
    const navigate = useNavigate()
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        if (!session) navigate("/")
    }, [session])

    useEffect(() => {
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

        fetchOrders()
    }, [])

    return (
        <section className="flex-1 flex flex-wrap  w-full py-12 lg:py-20">
            <div className="container mx-auto px-4">

                <header className="mb-4">
                    <h1 className="font-heading text-3xl">Your Orders</h1>
                </header>
                {<div className="mt-6 grid items-start gap-4 lg:grid-cols-3 lg:gap-6">
                    <div className="space-y-6 lg:col-span-2 w-full max-w-4xl">

                        {orders.length > 0 ?
                            <ItemGroup>
                                {orders.map((order, key) => (
                                    <React.Fragment key={order.orderId || key}>
                                        <Item className="list-none block">
                                            <OrderDetails key={key} order={order} />
                                        </Item>
                                        <ItemSeparator />
                                    </React.Fragment>
                                ))}
                            </ItemGroup>
                            :
                            <h3 className="text-2xl font-black tracking-tight"> No orders were found </h3>
                        }
                    </div>
                </div>}
            </div>
        </section >
    )
}

export default Orders