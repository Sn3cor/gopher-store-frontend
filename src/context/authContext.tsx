import type { Session } from "@/types/user";
import { createContext } from "react";

export interface AuthContextType {
    session: Session | null
    setSession: (s: Session | null) => void
}

export const AuthContext = createContext<AuthContextType>({
    session: null,
    setSession: () => { }
})
