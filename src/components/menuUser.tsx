import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom"

const MenuUser = () => {
    const { session, logout } = useAuth()
    const letter = session?.username[0]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative h-8 w-8 rounded-full outline-none cursor-pointer">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/default.png" alt={session?.username} />
                        <AvatarFallback>{letter?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.isAdmin ? <span className="text-red-600">Admin:</span> : <span className="text-black-600">User:</span>} {session?.username}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/orders">
                        Orders
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={logout}
                >
                    <Link to="/">Sign Out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default MenuUser