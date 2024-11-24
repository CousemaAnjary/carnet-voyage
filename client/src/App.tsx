import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./core/contexts/AuthContext"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import Login from "./modules/authentification/login/pages/Login"
import Register from "./modules/authentification/register/pages/Register"
import PWABadge from "./components/pwa/PWABadge"
import Home from "./modules/carnet-voyage/Home"

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
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}