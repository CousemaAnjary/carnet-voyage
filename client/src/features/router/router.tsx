import { useAuth } from "@/features/contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


export function PrivateRoutes() {
    const { authenticated } = useAuth()
    return authenticated ? <Outlet /> : <Navigate to="/login" />
}

export function PublicRoutes() {
    const { authenticated } = useAuth()
    return authenticated ? <Navigate to="/carnet-voyage" /> : <Outlet />
}