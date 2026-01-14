import { useEffect, useState } from "react"
import { type Product } from "@/types/product"
import { type Review } from "@/types/review";
import { useParams } from "react-router-dom"
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/reviewCard";
import { useCart } from "@/hooks/useCart";

const ProductDetails = () => {
    const [product, setProduct] = useState<Product | null>(null)
    const [reviews, setRevies] = useState<Review[]>([])
    const { id } = useParams()
    const [reviewsAvg, setReviewsAvg] = useState(0)

    useEffect(() => {
        if (!id) return
        const fetchProduct = async () => {
            try {
                const productRes = await fetch(`http://localhost:3000/api/products/${id}`)
                const reviewsRes = await fetch(`http://localhost:3000/api/reviews/${id}`)

                if (!productRes.ok) {
                    throw new Error(`Failed to fetch product with id: ${id}`)
                }
                if (!reviewsRes.ok) {
                    throw new Error(`Failed to fetch reviews with productId: ${id}`)
                }
                const reviewsArray: Review[] = await reviewsRes.json()
                const productData: Product = await productRes.json()

                setReviewsAvg(reviews.length > 0 ? reviews.reduce((acc, current) => current.rating + acc, 0) / reviews.length : 0)
                setProduct(productData)
                setRevies(reviewsArray)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchProduct()
    }, [id])



    return (
        <section className="flex-1 w-full py-12 lg:py-20">
            {product ?
                <div >
                    <Details product={product} reviews={reviews} reviewsAvg={reviewsAvg} />
                    <Reviews reviews={reviews} reviewsAvg={reviewsAvg} />
                </div>
                :
                <div>Produkt nie istnieje</div>
            }
        </section>
    )
}


const Details = ({ product, reviews, reviewsAvg }: { product: Product, reviews: Review[], reviewsAvg: number }) => {
    const { addToCart } = useCart(product)
    const handleAddClick = async () => {
        try {
            await addToCart();
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <div className="mx-auto max-w-7xl px-10 lg:px-4 pb-8 lg:pb-0">
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
                                {Array.from({ length: Math.floor(reviewsAvg) }).map((_, i) => (
                                    <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                                ))}
                                {Array.from({ length: 5 - Math.floor(reviewsAvg) }).map((_, i) => (
                                    <Star key={i} className="text-muted-foreground size-4" />
                                ))}
                            </div>
                            <span className="text-muted-foreground text-sm">({reviews.length})</span>
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
                        <Button size="lg" className="cursor-pointer" onClick={handleAddClick}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

const Reviews = ({ reviews, reviewsAvg }: { reviews: Review[], reviewsAvg: number }) => {
    console.log(reviewsAvg)
    return (
        <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-3xl px-4">
                <header className="mb-6 flex flex-col justify-between border-b pb-4 lg:mb-10 lg:flex-row lg:pb-6">
                    <h1 className="text-foreground font-heading text-xl md:text-2xl">Customer Reviews</h1>
                    <div className="text-muted-foreground flex items-center gap-2 lg:items-end lg:justify-center">
                        <div className="flex items-center gap-2 lg:items-end">
                            <span className="text-lg font-bold text-amber-500 md:text-2xl">{reviewsAvg}</span>
                            <span className="text-sm">out of 5</span>
                        </div>
                        <span>•</span>
                        <span className="text-sm">based on {reviews.length} reviews</span>
                    </div>
                </header>

                <div className="grid gap-6 divide-y lg:grid-cols-1 lg:gap-10 [&>div]:pb-6 lg:[&>div]:pb-10">
                    <ReviewCard review={
                        {
                            id: 1,
                            createdAt: "01/12/25",
                            updatedAt: "DateString",
                            deletedAt: null,
                            productId: 1,
                            userId: 1,
                            rating: 3,
                            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                        }
                    } />
                </div>
            </div>
        </div>
    )
}

export default ProductDetails