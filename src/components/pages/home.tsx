import LoginForm from "../loginForm"

const Home = () => {
    return (
        <section className="flex-1 flex flex-col items-center justify-center w-full py-10 lg:py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <h1 className="font-heading my-4 text-5xl text-balance md:text-6xl lg:leading-14">
                            Welcome to the react-store
                        </h1>
                        <p className="text-muted-foreground mb-8 text-balance lg:text-xl">
                            Please sign in or create an account to start shopping
                        </p>
                    </header>
                    <div className="flex justify-center">
                        <LoginForm className="w-full max-w-sm" />
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Home