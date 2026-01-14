import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Products from './pages/products'
import { FullScreenLayout, MainLayout } from './components/layout'
import LoginForm from './components/loginForm'
import SignupForm from './components/signupForm'
import ProductDetails from './pages/productDetails'
import { AuthContext } from './context/authContext'
import { useState } from 'react'
import type { Session } from './types/user'
import Orders from './pages/orders'
import Cart from './pages/cart'


function App() {

  const [session, setSession] = useState<Session | null>(() => {
    const stored = localStorage.getItem("session");
    return stored ? JSON.parse(stored) : null;
  })

  return (
    <>
      <AuthContext.Provider value={{ session, setSession }}>
        <BrowserRouter>

          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/cart' element={<Cart />} />
            </Route>

            <Route element={<FullScreenLayout />}>
              <Route path='/sign-in' element={<LoginForm />} />
              <Route path='/sign-up' element={<SignupForm />} />
            </Route>
          </Routes>

        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
