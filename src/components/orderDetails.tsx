import type { Order } from "@/types/order"
import OrderItemCard from "./orderItem"

const OrderDetails = ({ order }: { order: Order }) => {
    return (
        <div className="grid gap-2 w-full p-2">
            <div className="flex flex-col gap-2 py-4">
                <h3 className="text-2xl font-black tracking-tight">
                    Order <span className="text-primary">#{order.orderId}</span>
                </h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground">
                        Items Summary
                    </h4>
                </div>

                <div className="grid gap-3">
                    {order.items.map((orderItem, key) => (
                        <OrderItemCard key={key} orderItem={orderItem} />
                    ))}
                </div>
            </div>

            <div className="py-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                        Total Amount Paid
                    </span>
                    <span className="text-2xl font-black text-foreground">
                        ${order.total.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails