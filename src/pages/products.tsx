import { useEffect, useState } from "react"
import { type Product } from "@/types/product"
import ProductCard from "@/components/productCard"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const Products = () => {
    const [productsList, setProductsList] = useState<Product[]>([])
    const { session } = useAuth()

    const categories = new Set(productsList.map(item => item.category))

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/products")
                if (!res.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data: Product[] = await res.json()
                console.log(data)
                setProductsList(data)

            }
            catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])


    return (
        <section className="flex-1 flex flex-wrap  w-full py-12 lg:py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-[240px_1fr] gap-8">
                    <div></div>
                    <header className="mb-6 flex items-center justify-between space-y-2">
                        <h2 className="font-heading text-2xl lg:text-3xl">Products</h2>
                    </header>
                </div>
                <div className="grid grid-cols-[240px_1fr] gap-8">
                    <div className="space-y-10">
                        {/* Filter group */}
                        <div className="space-y-4">
                            <div className="text-muted-foreground flex justify-between text-[11px] font-semibold tracking-widest uppercase">
                                Keywords
                            </div>
                            <Input type="text" placeholder="Search..." />
                        </div>


                        {/* Filter group */}
                        <div className="space-y-4">
                            <div className="text-muted-foreground flex justify-between text-[11px] font-semibold tracking-widest uppercase">
                                Categories
                            </div>
                            <div className="space-y-3">
                                {[...categories].map((item, i) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox id={`category-${i}`} />
                                        <Label htmlFor={`category-${i}`} className="text-muted-foreground capitalize">
                                            {item}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                            {productsList?.map((prod, key) => {
                                return <ProductCard key={key} product={prod} isLoggedIn={session !== null} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products