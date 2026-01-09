import { useEffect, useState } from "react"
import { type Product } from "@/types/product"
import { useParams } from "react-router-dom"
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
    const [product, setProduct] = useState<Product | null>(null)
    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/products/${id}`)
                if (!res.ok) {
                    throw new Error(`Failed to fetch product with id: ${id}`)
                }
                const data: Product = await res.json()
                console.log(data)
                setProduct(data)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchProduct()
    }, [id])

    return (
        <section className="flex-1 w-full py-10 lg:py-16">
            {product ? <Details product={product} /> : <div>Produkt nie istnieje</div>}
        </section>
    )
}


const Details = ({ product }: { product: Product }) => {

    return (
        <section className="py-10 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="col-span-2 flex flex-col-reverse gap-4 md:flex-row">

                        <figure className="aspect-square flex-1 overflow-hidden rounded-lg border lg:max-h-4/5">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain scale-70"
                            />
                        </figure>
                    </div>


                    <div className="flex flex-col space-y-4 lg:space-y-6">
                        <div>
                            <h1 className="text-foreground font-heading text-3xl md:text-4xl">
                                {product.title}
                            </h1>

                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((star) => (
                                        <Star key={star} className="size-4 fill-amber-500 text-amber-500" />
                                    ))}
                                    <Star className="text-muted-foreground size-4" />
                                </div>
                                <span className="text-muted-foreground text-sm">(4)</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-foreground text-3xl font-bold md:text-4xl">${product.price}</p>
                            <p className="text-muted-foreground mt-1 text-sm">(inclusive of all taxes)</p>
                            <p className={product.quantity > 0 ? "text-green-600" : "text-red-600"}>{product.quantity > 0 ? "In magazine" : "Out of stock"}</p>
                        </div>


                        <div className="text-sm">
                            <h2 className="text-foreground text-base font-semibold">About Product</h2>
                            <p className="mt-1.5 flex-shrink-0">
                                {product.description}
                            </p>
                        </div>


                        <div className="flex gap-3">
                            <Button size="lg">Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default ProductDetails