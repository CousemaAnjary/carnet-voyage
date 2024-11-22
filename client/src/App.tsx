import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./core/contexts/AuthContext"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import Login from "./modules/authentification/login/pages/Login"
import Register from "./modules/authentification/register/pages/Register"
import { useContext, useEffect } from "react"
import { NetworkContext } from "./core/contexts/NetworkContext"
import PWABadge from "./components/pwa/PWABadge"
import ListVoyages from "./modules/carnet-voyage/pages/ListVoyages"
import Voyage from "./modules/carnet-voyage/pages/Voyage"

export default function App() {
  const { online} = useContext(NetworkContext);

  useEffect(() => {
    console.log(online);
  }, [online])

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
            <Route path="/carnet-voyage" element={<ListVoyages />} />
            <Route path="/carnet-voyage-content/:id" element={<Voyage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}