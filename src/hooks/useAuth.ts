import { useSession } from "./useSession"
import type { Session } from "@/types/user"

export const useAuth = () => {
    const { session, addSession, removeSession, setSession } = useSession()

    const login = (session: Session) => {
        addSession(session)
    }

    const logout = async () => {
        removeSession()
        try {
            const res = await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: session?.refreshToken }),
            })

            const data = await res.json()
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }

    }

    return { session, login, logout, setSession }
}