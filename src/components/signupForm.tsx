import { handleSignup } from "@/auth/singup"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { type ApiError } from "@/types/errors"
import { useState, type SetStateAction, type Dispatch, useEffect } from "react"
import { Link } from "react-router-dom"

const SignupForm = ({ ...props }: React.ComponentProps<typeof Card>) => {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [secPassword, setSecPassword] = useState<string>("")
    const [isMatching, setIsMatching] = useState<boolean>(true)
    const [lastError, setLastError] = useState<ApiError | null>(null)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>) => {
        setter(e.target.value)
    }

    const handleClick = () => {
        setLastError(null)
        setIsMatching(true)
        if (password !== secPassword) {
            setIsMatching(false)
            return
        }
        handleSignup({
            email: email,
            username: username,
            password: password
        }, setLastError)
    }

    useEffect(() => {
        console.log(lastError)
    }, [lastError])
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Username</FieldLabel>
                            <Input id="name" type="text" placeholder="username" required onChange={(e) => handleInput(e, setUsername)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => handleInput(e, setEmail)}
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" required onChange={(e) => {
                                handleInput(e, setPassword)

                            }} />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                                onChange={(e) => { handleInput(e, setSecPassword) }}
                            />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                {!isMatching ? <p className="text-red-600 text-sm">Passwords don't match!</p> : null}
                                {lastError !== null ? <p className="text-red-600 text-sm">{lastError.message}</p> : null}
                                <Button type="button"
                                    className="cursor-pointer"
                                    onClick={() => { handleClick() }}
                                    disabled={email === "" || username === "" || password === "" || secPassword === ""}
                                >Create Account</Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <Link to='/sign-in'>Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignupForm