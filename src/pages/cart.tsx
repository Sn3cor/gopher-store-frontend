import CartItemCard from "@/components/cartItem"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { useOrders } from "@/hooks/useOrders"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const [price, setPrice] = useState<number>(0.00)
    const [delivery, setDelivery] = useState<number>(0.00)
    const { session } = useAuth()
    const { createOrder } = useOrders()
    const { cartItems, fetchCart } = useCart()
    const navigate = useNavigate()


    const handleCreateOrder = async () => {
        try {
            await createOrder()
            navigate("/orders")
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!session) navigate("/")
    }, [session])

    useEffect(() => {
        try {
            fetchCart()
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setPrice(cartItems.reduce((prev, curr) => prev + (curr.amount * curr.product.price), 0))
        setDelivery(cartItems.length > 0 ? 5.00 : 0.00)
    }, [cartItems])

    return (
        <section className="flex-1 flex flex-wrap  w-full py-12 lg:py-20">
            <div className="container mx-auto px-4">
                <header className="mb-4">
                    <h1 className="font-heading text-3xl">Shopping Cart</h1>
                </header>

                <div className="mt-6 grid items-start gap-4 lg:grid-cols-3 lg:gap-6">
                    <div className="space-y-3 lg:col-span-2">
                        {
                            cartItems.length > 0 ?
                                cartItems.map((item, key) => (
                                    <CartItemCard key={key} cartItem={item} />
                                ))
                                :
                                <h3 className="text-2xl font-black tracking-tight">You have an empty cart</h3>
                        }


                    </div>

                    <div className="border flex h-full flex-col space-y-6 rounded-xl p-6">
                        <div className="space-y-4">
                            <h2 className="font-semibold">Order summary</h2>

                            <div className="flex justify-between text-sm">
                                <p>Subtotal</p>
                                <p className="font-medium">${price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <p>Shipping estimate</p>
                                </div>
                                <p className="font-medium">${delivery}</p>
                            </div>


                            <div className="flex justify-between border-t border-gray-200 pt-4 text-sm font-medium">
                                <p>Order total</p>
                                <p>${(price + delivery).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <Button className="w-full cursor-pointer" disabled={cartItems.length == 0} onClick={handleCreateOrder}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart