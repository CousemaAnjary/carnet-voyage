import { Button } from "@/components/ui/button"
import { useAuth } from "@/core/contexts/AuthContext"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Voyage() {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleLogout = async (): Promise<void> => {

        try {
            await logout()
            navigate('/login')

        } catch (error) {
            // Afficher l'erreur dans la console
            console.error('Logout failed', error)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
          <p className="text-sm font-medium leading-none mb-1"> {user?.name}</p>
            <Button className="hover:cursor-pointer" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                Déconnexion
            </Button>
        </>
    )
}