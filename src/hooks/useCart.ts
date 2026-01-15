import { type Product } from "@/types/product";
import { useApi } from "./useApi";
import { useState } from "react";
import { type CartItem } from "@/types/cartItem";

export const useCart = () => {
    const { fetchWithRefresh } = useApi()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const addToCart = async (product: Product) => {
        try {
            const res = await fetchWithRefresh("http://localhost:3000/api/cart", {
                method: "POST",
                body: JSON.stringify({
                    productId: product.id
                })
            })

            const data = await res.json()
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchCart = async () => {
        try {
            const res = await fetchWithRefresh("http://localhost:3000/api/cart", {
                method: "GET",
            })
            const data = await res.json()
            console.log(data)
            setCartItems(data.items)
        }
        catch (error) {
            console.log(error)
        }
    }

    return { cartItems, addToCart, fetchCart };
};