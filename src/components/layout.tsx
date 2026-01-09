import Navbar from "./menu"
import Footer from "./footer"
import { Outlet } from "react-router-dom"
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

const FullScreenLayout = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Outlet />
            </div>
        </div>
    )
}

export { MainLayout, FullScreenLayout }