import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./core/contexts/AuthContext"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import Login from "./modules/auth/login/pages/Login"
import Register from "./modules/auth/register/pages/Register"
import PWABadge from "./components/pwa/PWABadge"
import Home from "./modules/app/home/Home"
import DayPhotos from "./modules/app/day_photos/DayPhotos"
import Days from "./modules/app/days/Days"

export const APP_NAME = "Carnet de Voyage"

export default function App() {

  return (
    <div className="bg-gray-100">
      <PWABadge />
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/carnet-voyage" element={<Home />} />
            <Route path="/carnet-voyage/:id" element={<Days/>} />
            <Route path="/carnet-voyage/:voyageID/:dayID" element={<DayPhotos/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}