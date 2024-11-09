import Navbar from "./Nabar"

export default function Layout({ children }: { children: React.ReactNode }) {
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
                <Navbar />

                <main >
                    {children}
                </main>             
            </div>
        </>
    )
}