import { useEffect, useState } from "react"
import { getFoldersVoyage } from "../carnetVoyageService"
import { VoyageType } from "../carnetVoyageType"
import VoyageCard from "../components/voyage-card/VoyageCard"
import TopBar from "@/components/TopBar"
import CreateVoyageDialog from "../components/create-voyage/CreateVoyageDialog"

export default function ListVoyages() {
    const [voyages, setVoyages] = useState<VoyageType[]|null>(null)

    // Récupérer la liste des voyages
    useEffect(() => {
        const fetchVoyages = async () => {
            try {
                const foldersVoyage = await getFoldersVoyage()
                setVoyages(foldersVoyage)

            } catch (error) {
                console.log("Erreur lors de la récupération des dossiers de voyage.", error)
            }
        }

        fetchVoyages()
    }, [])
    
    return (
        <div id="list-voyage-container" className="h-screen flex flex-col space-y-10 overflow-hidden">
             <div id="list-voyage-container-header" className="relative w-full">
                <TopBar title={"Carnet De Voyage"} />
            </div>
            <div id="list-voyge-body" className="h-full mx-3">
                {voyages && (
                    <div className="h-screen sm:flex sm:space-x-3 sm:items-start overflow-y-auto">
                        {voyages.map((voyage) => (
                            <div key={voyage.id} 
                                className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4  
                                    justify-centers items-center "
                            >
                                <VoyageCard voyage={voyage}/>
                            </div>
                        ))}
                    </div>
                )}
                <CreateVoyageDialog/>
            </div>
        </div>
    )
}