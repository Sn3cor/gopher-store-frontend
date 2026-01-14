export interface UserSignup {
    email: string,
    username: string,
    password: string
}

export interface UserSignin {
    email: string,
    password: string
}

export interface Session {
    userId: number
    username: string
    isAdmin: boolean
    accessToken: string
    refreshToken: string
}