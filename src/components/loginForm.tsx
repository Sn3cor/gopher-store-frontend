import { cn } from "@/lib/utils"
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
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { ApiError } from "@/types/errors"
import { handleSignin } from "@/auth/signin"
import { useAuth } from "@/hooks/useAuth"


const LoginForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [lastError, setLastError] = useState<ApiError | null>(null)
    const navigate = useNavigate()
    const { session, login } = useAuth()

    useEffect(() => {
        if (session) navigate("/")
    }, [session])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>) => {
        setter(e.target.value)
    }

    const handleClick = () => {
        setLastError(null)
        handleSignin({
            user: {
                email: email,
                password: password
            },
            errorSetter: setLastError,
            login: login

        })
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Login to your account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => handleInput(e, setEmail)}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input id="password" type="password" onChange={(e) => handleInput(e, setPassword)} />
                            </Field>
                            <Field>
                                {lastError !== null ? <p className="text-red-600 text-sm">{lastError.message}</p> : null}
                                <Button
                                    type="button"
                                    className="cursor-pointer"
                                    disabled={email === "" && password === ""}
                                    onClick={handleClick}
                                >Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm