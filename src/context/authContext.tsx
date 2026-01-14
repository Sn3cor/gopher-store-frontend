import type { Session } from "@/types/user";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface AuthContextType {
    session: Session | null
    setSession: Dispatch<SetStateAction<Session | null>>
}

export const AuthContext = createContext<AuthContextType>({
    session: null,
    setSession: () => { }
})
