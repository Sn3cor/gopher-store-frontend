import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Link } from "react-router-dom"

import { Button } from "./ui/button"

interface navigation {
    href: string
    label: string
}

const navigationLinks: navigation[] = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/products",
        label: "Products"
    }
]

const Navbar = () => {
    return (
        <header className="border-b px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4">
                <div className="flex gab-2">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navigationLinks.map((link, index) => {
                                return (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink asChild className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                                            <Link to={link.href}>{link.label}</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="ghost" className="text-sm">
                        <Link to='/sign-in'>Sign In</Link>
                    </Button>
                    <Button asChild size="sm" className="text-sm">
                        <Link to='/sign-up'>Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Navbar