import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/home'
import Products from './components/pages/products'
import { FullScreenLayout, MainLayout } from './components/layout'
import LoginForm from './components/loginForm'
import SignupForm from './components/registerForm'


function App() {

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path='/products' element={<Products />} />
          </Route>

          <Route element={<FullScreenLayout />}>
            <Route path='/sign-in' element={<LoginForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
