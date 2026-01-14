import { AuthContext } from "@/context/authContext"
import { useContext } from "react"
import { useLocalStorage } from "./useLocalStorage"
import type { Session } from "@/types/user"

export const useSession = () => {
    const { session, setSession } = useContext(AuthContext)
    const { setItem, removeItem } = useLocalStorage()

    const addSession = (session: Session) => {
        setSession(session)
        setItem("session", JSON.stringify(session))
    }

    const removeSession = () => {
        setSession(null)
        removeItem("session")
    }

    return { session, addSession, removeSession, setSession }
}