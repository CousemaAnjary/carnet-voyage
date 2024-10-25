import { Button } from "./components/ui/button"


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
            <div className="text-center">
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>
                <Button className="bg-orange-700 me-2">Click me</Button>   
                <Button className="bg-blue-700">Bonjour</Button>
            </div>
        </>
    )
}