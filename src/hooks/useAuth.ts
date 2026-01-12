import { useSession } from "./useSession"
import type { Session } from "@/types/user"

export const useAuth = () => {
    const { session, addSession, removeSession, setSession } = useSession()

    const login = (session: Session) => {
        addSession(session)
    }

    const logout = () => {
        removeSession()
    }

    return { session, login, logout, setSession }
}