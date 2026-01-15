import OrderDetails from "@/components/orderDetails"
import { ItemGroup, ItemSeparator } from "@/components/ui/item"
import { useAuth } from "@/hooks/useAuth"
import { useOrders } from "@/hooks/useOrders"
import { Item } from "@radix-ui/react-navigation-menu"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Orders = () => {
    const { session } = useAuth()
    const navigate = useNavigate()
    const { orders, fetchOrders } = useOrders()

    useEffect(() => {
        if (!session) navigate("/")
    }, [session])

    useEffect(() => {
        try {
            fetchOrders();
        } catch (err) {
            console.log(err)
        }
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
                                    <React.Fragment key={order.id}>
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