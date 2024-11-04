import FolderModal from "../components/FolderModal"
import Navbar from "../components/Navbar"


export default function Voyage() {
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
            <div className="relative min-h-screen p-4 bg-gray-100">
                {/* Barre de navigation */}
                <header>
                    <Navbar />
                </header>

                {/* Contenu de la page */}
                <main>
                 
                 
                    {/* Modal de création de dossier avec son propre déclencheur */}
                    <FolderModal />
                </main>
            </div>
        </>
    )
}