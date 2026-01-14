import type { Session } from "@/types/user"
import { useAuth } from "./useAuth"

const useApi = () => {
    const { session, setSession, logout } = useAuth()

    const fetchWithRefresh = async (url: string, options: RequestInit) => {

        const headers = {
            ...options.headers,
            "Authorization": `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
        }

        let res = await fetch(url, { ...options, headers })

        if (res.status == 401) {
            try {
                const refreshRes = await fetch("http://localhost:3000/api/refresh", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refreshToken: session?.refreshToken }),
                });

                if (refreshRes.ok) {
                    const newTokens = await refreshRes.json()
                    setSession((prevSession: Session | null) => {
                        if (!prevSession) return null;

                        return {
                            ...prevSession,
                            ...newTokens
                        };
                    });

                    const retryHeaders = {
                        ...options.headers,
                        "Authorization": `Bearer ${newTokens.accessToken}`,
                        "Content-Type": "application/json",
                    };
                    res = await fetch(url, { ...options, headers: retryHeaders });

                }
                else logout()
            }
            catch (error) {
                logout()
            }
        }
        return res
    }
    return { fetchWithRefresh }
}

export { useApi }