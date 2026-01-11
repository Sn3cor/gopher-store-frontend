import type { ApiError } from "@/types/errors"
import type { User } from "@/types/user"
import type { Dispatch, SetStateAction } from "react"

const handleSignup = async (account: User, errorSetter: Dispatch<SetStateAction<ApiError | null>>) => {
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

        //Redirect to /home and save tokens

    }
    catch (err) {
        console.log(err)
    }
}

export { handleSignup }