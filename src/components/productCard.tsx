import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({ product, isLoggedIn }: { product: Product, isLoggedIn: boolean }) => {
    const { addToCart } = useCart(product)
    const handleAddClick = async () => {
        try {
            await addToCart();

        } catch (err) {
            console.log(err)
        }
    };
    return (
        <div className="rounded-xl border w-full max-w-sm py-4">
            <Link to={`/products/${product.id}`} className="group">
                <figure className="relative w-full h-64 overflow-hidden rounded-md">
                    <img
                        className="h-full w-full scale-70 object-contain transition-transform duration-300 group-hover:scale-80"
                        src={product.image}
                        alt={product.title}
                    />

                </figure>
                <div className="w-full px-4">
                    <div className="mt-3 flex items-center justify-between space-y-0.5">
                        <p className="font-medium line-clamp-1">{product.title}</p>
                        <p className="text-muted-foreground">${product.price}</p>
                    </div>
                    <p className={product.quantity > 0 ? "text-green-600" : "text-red-600"}>{product.quantity > 0 ? "In magazine" : "Out of stock"}</p>
                </div>
            </Link >
            <div className="w-full px-4">
                <Button disabled={product.quantity <= 0 || !isLoggedIn} className="mt-3 w-full cursor-pointer " onClick={handleAddClick}>
                    Add to Cart
                </Button>
            </div>
        </div >

    );
}
export default ProductCard