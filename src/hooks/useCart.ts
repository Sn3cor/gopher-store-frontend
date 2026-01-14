import { type Product } from "@/types/product";
import { useApi } from "./useApi";

export const useCart = (product: Product) => {
    const { fetchWithRefresh } = useApi()
    const addToCart = async () => {
        try {
            const res = await fetchWithRefresh("http://localhost:3000/api/cart", {
                method: "POST",
                body: JSON.stringify({
                    productId: product.id
                })
            })

            const data = res.json()
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return { addToCart };
};