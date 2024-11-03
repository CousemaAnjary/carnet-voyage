import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/core/contexts/AuthContext"


export default function PrivateRoutes() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { isAuthenticated } = useAuth()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}