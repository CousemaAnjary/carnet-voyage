import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, User } from "lucide-react"





export default function Navbar() {
    /**
     * ! STATE (état, données) de l'application
     */
    const logoSmallText = "< C.A />"
    const logoText = "< Cousema Anjary />"


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
                    <h1 className="font-medium font-mono max-lg:hidden">{logoText}</h1>
                    <h1 className="font-medium font-mono hidden max-lg:block">{logoSmallText}</h1>
                </div>

                {/* Desktop Navbar */}
                <div className="navbar max-lg:hidden ms-10">
                    <ul className="flex gap-10">
                        <li>
                            <Link to="/">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                A propos
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="flex gap-3 me-20 max-lg:hidden">
                    <Link to="/register">
                        <Button variant={"ghost"}>Créer un compte</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant={"outline"} className="shadow-none">
                            <User size={16} className="mr-1" /> Connexion
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden me-8">
                    <Button variant={"ghost"} size={"icon"}>
                        <EllipsisVertical size={18} />
                    </Button>
                </div>
            </nav>
        </>
    )
}
