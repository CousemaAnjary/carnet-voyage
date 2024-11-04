import { Route, Routes } from "react-router-dom"
import Login from "./modules/auth/pages/Login"
import Register from "./modules/auth/pages/Register"
import { AuthProvider } from "./core/contexts/AuthContext"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import Voyage from "./modules/dashboard/pages/Voyage"



export default function App() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
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
                        <Route path="/dashboard" element={<Voyage />} />
                    </Route>
                </Routes>
            </AuthProvider>

        </>
    )
}