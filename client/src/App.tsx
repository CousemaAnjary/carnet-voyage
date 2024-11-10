import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./core/contexts/AuthContext"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import Login from "./modules/authentification/login/pages/Login"
import Register from "./modules/authentification/register/pages/Register"
import CarnetVoyage from "./modules/carnet-voyage/pages/CarnetVoyage"
import CarnetVoyageContent from "./modules/carnet-voyage/pages/CarnetVoyageContent"
import { useContext, useEffect } from "react"
import { NetworkContext } from "./core/contexts/NetworkContext"

export default function App() {
  const { online} = useContext(NetworkContext);

  useEffect(() => {
    console.log(online);
  }, [online])

  return (
    <>
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
            <Route path="/carnet-voyage" element={<CarnetVoyage />} />
            <Route path="/carnet-voyage-content/:id" element={<CarnetVoyageContent />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}