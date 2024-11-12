import { useEffect, useState } from "react"
import { getFoldersVoyage } from "../carnetVoyageService"
import VoyageFormModal from "../components/VoyageFormModal"
import Navbar from "@/components/dashboad/Nabar"
import { VoyageType } from "../carnetVoyageType"
import VoyageCard from "../components/VoyageCard"

export default function ListVoyages() {
    const [voyages, setVoyages] = useState<VoyageType[]|null>(null)
    const [selectedVoyage, setSelectedVoyage] = useState<VoyageType|null>(null)

    // Récupérer la liste des dossiers de voyage
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
        <div className="min-h-screen max-h-screen p-4 bg-gray-100">
            <Navbar />
            <div className="h-full">
                {voyages ? (
                    <div className="flex flex-wrap mx-auto mt-6">
                        {voyages.map((voyage) => (
                            <div key={voyage.id} 
                                className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4  
                                    justify-centers items-center space-x-5 "
                            >
                                <VoyageCard voyage={voyage} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="">
                        Rien
                    </div>
                )}
            </div>   
            <VoyageFormModal/>          
        </div>
    )
}