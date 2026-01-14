import type { OrderItem } from "@/types/order";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

const OrderItemCard = ({ orderItem }: { orderItem: OrderItem }) => {
    return (
        <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/50">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white p-1">
                <img
                    className="h-full w-full object-contain"
                    src={orderItem.product.image}
                    alt={orderItem.product.title}
                />
            </div>

            <div className="flex flex-1 flex-col min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-medium leading-none line-clamp-1">
                        {orderItem.product.title}
                    </h4>
                    <span className="text-sm font-bold whitespace-nowrap">
                        ${(orderItem.amount * orderItem.product.price).toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <p>Quantity: <span className="font-medium text-foreground">{orderItem.amount}</span></p>
                    <p>${orderItem.product.price} / unit</p>

                </div>


            </div>
            <Button variant="ghost" size="icon" className="relative">
                <Star />
            </Button>
        </div>
    )
}
export default OrderItemCard