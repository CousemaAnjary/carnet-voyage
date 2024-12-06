import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./pages/app/home/Home"
import Days from "./pages/app/days/Days"
import Login from "./pages/auth/login/Login"
import Register from "./pages/auth/register/Register"
import { useAuth } from "./features/contexts/AuthContext"
import { useEffect } from "react"
import Gallery from "./pages/app/days/Gallery"
import Photo from "./pages/app/days/Photo"

export const APP_NAME = "Carnet de Voyage"

export default function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { authenticated } = useAuth()

  useEffect(() => {
    if(!authenticated && pathname !== '/login' && pathname !== '/register')
      navigate('/login');

    if(authenticated && (pathname === '/login' || pathname === '/register'))
      navigate('/home');

    if(authenticated && pathname === '/')
      navigate('/home');

  }, [pathname, authenticated,navigate])

  return (
    <div className="bg-gray-100">
      <Routes>
          {/* When not auth */}
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />

          {/* When auth */}
          <Route path="/home" Component={Home} />
          <Route path="/voyage/:id" Component={Days} />
          <Route path="/gallery/:id" Component={Gallery} />
          <Route path="/photo" Component={Photo} />
      </Routes>
    </div>
  )
}