import UserDropdownMenu from "./UserDropdownMenu";

export default function Navbar() {
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
            <nav className="container-fluid relative z-10 bg-white h-16 border-b flex justify-between items-center">
                <div className="logo ms-20 max-lg:ms-8">
                    <h1 className="font-medium font-mono max-lg:hidden">Carnet-Voyage</h1>
                </div>
                <div className="flex justify-end space-x-3 me-10">
                    <UserDropdownMenu />
                </div>
            </nav>
        </>
    )
}