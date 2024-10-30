import Navbar from "@/components/Navbar"
import LoginForm from "../components/LoginForm"


export default function Login() {
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
            <div className="relative min-h-screen">
                {/* <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} /> */}

                {/* En-tête */}
                <header>
                    <Navbar />
                </header>

                {/* Contenu */}
                <main>
                    <section className="flex justify-center items-center min-h-[79vh] mt-5 ">
                        <LoginForm />
                    </section>
                </main>

                {/* Pied de page */}
                <footer></footer>
            </div>
        </>
    )
}