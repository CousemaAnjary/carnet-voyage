import { useContext, useEffect, useState } from "react"
import { getFoldersVoyage } from "../carnetVoyageService"
import { VoyageType } from "../carnetVoyageType"
import VoyageCard from "../components/VoyageCard"
import TopBar from "@/components/TopBar"
import VoyageFormDialog from "../components/VoyageFormDialog"
import { NetworkContext } from "@/core/contexts/NetworkContext"
import { FaPlus } from "react-icons/fa"
import NoNetworkAlertDialog from "../components/NoNetworkAlertDialog"

export default function ListVoyages() {
    const [voyages, setVoyages] = useState<VoyageType[]|null>(null)
    // Check if the user is online
    const { online} = useContext(NetworkContext);

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
                {online ? (
                    <VoyageFormDialog/>
                ):(
                    <NoNetworkAlertDialog
                        triggerChild={
                        <button
                            className="fixed bottom-5 right-5 bg-blue-600
                            text-white rounded-full p-4 
                            shadow-lg focus:outline-none hover:bg-blue-600 transition"
                        >
                            <FaPlus size={24} />
                        </button>
                        }
                    />
                )}
            </div>
        </div>
    )
}