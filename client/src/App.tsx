import { Button } from "./components/ui/button"
import { Route, Routes } from "react-router-dom"


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
            <Routes>
                <Route path="/" element={<Button>Click me</Button>} />
            </Routes>
        </>
    )
}