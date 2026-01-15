import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Package, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useOrders } from "@/hooks/useOrders";
import { useEffect } from "react";

const UserCard = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const { session } = useAuth()
    const { orders, fetchOrders, totalSpent } = useOrders()

    useEffect(() => {
        try {
            fetchOrders();
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full max-w-sm overflow-hidden border-2 border-primary/10 shadow-lg">
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">

                        <div>
                            <CardTitle className="text-xl">User Info</CardTitle>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className=" bg-primary/10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/avatars/default.png" alt={session?.username} />
                                <AvatarFallback className="text-lg">{session?.username.charAt(0)?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">User {session?.isAdmin ? <span className="text-red-600">(Admin)</span> : null}</span>
                            <p className="text-lg font-semibold">{session?.username || "Gość"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                            <Package className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Orders</p>
                                <p className="text-sm font-black">{orders.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Spent</p>
                                <p className="text-sm font-black">${totalSpent()}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 bg-muted/10 border-t pt-4">
                    <Button asChild className="w-full">
                        <Link to="/orders">
                            My orders
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link to="/products">
                            Products
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default UserCard;