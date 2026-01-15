import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import type { CartItem } from "@/types/cartItem"
import type { Product } from "@/types/product"

const CartItemCard = ({ cartItem, removeFunc }: { cartItem: CartItem, removeFunc: (product: Product) => void }) => {
    const handleRemove = async () => {
        try {
            await removeFunc(cartItem.product)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex items-center space-x-4 rounded-xl border p-4">
            <div className="relative shrink-0">
                <img className="aspect-square size-20 rounded-md object-contain" src={cartItem.product.image} alt={cartItem.product.title} />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="font-semibold line-clamp-1">{cartItem.product.title}</h3>
                        <p className="text-sm">${cartItem.amount * cartItem.product.price}</p>
                    </div>
                    <div className="flex flex-col space-x-4 sm:flex-row">
                        <div className="flex items-stretch w-35 gap-2">
                            <Button>
                                <Minus />
                            </Button>
                            <Input className="text-center" value={cartItem.amount} readOnly={true}></Input>
                            <Button>
                                <Plus />
                            </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="relative cursor-pointer" onClick={handleRemove}>
                            <Trash color="red" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard