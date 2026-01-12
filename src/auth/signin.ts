import type { ApiError } from "@/types/errors"
import type { Session, UserSignin } from "@/types/user"


const handleSignin = async ({ user, errorSetter, login }: {
    user: UserSignin
    errorSetter: (err: ApiError | null) => void
    login: (s: Session) => void
}) => {
    try {
        const res = await fetch("http://localhost:3000/api/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...user
            })
        })

        if (!res.ok) {
            const error = await res.json()
            errorSetter(error)
            throw new Error(error.message || "Sign in failure")
        }

        const data = await res.json()
        console.log(data)

        const sessionInfo: Session = {
            userId: data.userId,
            username: data.username,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }
        login(sessionInfo)

    }
    catch (err) {
        console.log(err)
    }
}

export { handleSignin }