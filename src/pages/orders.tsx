import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Orders = () => {
    const { session } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!session) navigate("/")
    }, [session])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/orders", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.accessToken}`
                    }
                })
                const data = await res.json()
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchOrders()
    })
    return (
        <section className="flex-1 flex flex-wrap  w-full py-12 lg:py-20">
            <div className="container mx-auto px-4">

                <header className="mb-4">
                    <h1 className="font-heading text-3xl">Your Orders</h1>
                </header>


            </div>
        </section >
    )
}

export default Orders