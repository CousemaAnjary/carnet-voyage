import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./pages/app/home/Home"
import DayPhotos from "./pages/app/day_photos/DayPhotos"
import Days from "./pages/app/days/Days"
import Login from "./pages/auth/login/Login"
import Register from "./pages/auth/register/Register"
import { useAuth } from "./features/contexts/AuthContext"
import { useEffect } from "react"

export const APP_NAME = "Carnet de Voyage"

export default function App() {
  const { authenticated } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* When auth */}
          <Route path="/home" element={<Home />} />
          <Route path="/voyage/:id" element={<Days/>} />
          <Route path="/day/:id" element={<DayPhotos/>} />
      </Routes>
    </div>
  )
}