import { useEffect, useState } from "react"
import { getFoldersVoyage } from "../carnetVoyageService"
import VoyageFormModal from "../components/VoyageFormModal"
import { VoyageType } from "../carnetVoyageType"
import VoyageCard from "../components/VoyageCard"
import AlertVoyageActionModal, { VoyageAction } from "../components/AlertVoyageActionModal"
import TopBar from "@/components/dashboad/TopBar"

export default function ListVoyages() {
    const [voyages, setVoyages] = useState<VoyageType[]|null>(null)
    // Alert actions variables
    const [voyageAction, setVoyageAction] = useState<VoyageAction | null>(null)
    const [openActionDialog, setOpenActionDialog] = useState(false)
    const [actingVoyageId, setActionVoyageId] = useState<number|string>('')
    const [actingVoyageName, setActingVoyageName] = useState<string>('')

    const handleClotureVoyage = (id:string | number, name:string) => {
        setActionVoyageId(id)
        setActingVoyageName(name)
        setVoyageAction({action: "cloture"})
        setOpenActionDialog(true)
        console.log(`cloture voyage ${id} ${name}`)
    }

    const handleAnnuleVoyage = (id:string | number, name:string) => {
        setActionVoyageId(id)
        setActingVoyageName(name)
        setVoyageAction({action: "annul"})
        setOpenActionDialog(true)
        console.log(`annule voyage ${id} ${name}`)
    }

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
                                <VoyageCard 
                                    voyage={voyage} 
                                    actions={{ cloture: handleClotureVoyage, annule: handleAnnuleVoyage }} 
                                />
                            </div>
                        ))}
                    </div>
                )}
                <VoyageFormModal/>  
                {voyageAction && (
                    <AlertVoyageActionModal
                        action={voyageAction}
                        dialog={
                            {open: openActionDialog, setOpen: setOpenActionDialog}
                        }
                        voyage={
                            {id: actingVoyageId, name: actingVoyageName}
                        }
                    />
                )}
            </div>
        </div>
    )
}