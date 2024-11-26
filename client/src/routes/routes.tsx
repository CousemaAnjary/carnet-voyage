import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/modules/contexts/AuthContext"


export function PrivateRoutes() {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export function PublicRoutes() {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Navigate to="/carnet-voyage" /> : <Outlet />
}