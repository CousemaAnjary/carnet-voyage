import { useAuth } from "@/core/contexts/AuthContext"

export default function Voyage() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { user } = useAuth()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
          <p className="text-sm font-medium leading-none mb-1"> {user?.name}</p>
        </>
    )
}