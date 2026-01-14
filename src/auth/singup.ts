import type { ApiError } from "@/types/errors"
import type { UserSignup } from "@/types/user"
import { type Session } from "@/types/user"

const handleSignup = async ({ account, errorSetter, login }: {
    account: UserSignup
    errorSetter: (err: ApiError | null) => void
    login: (s: Session) => void
}) => {
    try {
        const res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...account,
                isAdmin: false
            })
        })

        if (!res.ok) {
            const error: ApiError = await res.json()
            errorSetter(error)
            throw new Error(error.message || "Signup failure")
        }

        const data = await res.json()
        console.log(data)

        const sessionInfo: Session = {
            userId: data.userId,
            username: data.username,
            isAdmin: data.isAdmin,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }

        login(sessionInfo)


    }
    catch (err) {
        console.log(err)
    }
}

export { handleSignup }