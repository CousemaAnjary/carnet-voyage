import { useEffect, useState } from "react"
import { getFoldersVoyage } from "../carnetVoyageService"
import VoyageFormModal from "../components/VoyageFormModal"
import { VoyageType } from "../carnetVoyageType"
import VoyageCard from "../components/VoyageCard"
import AlertVoyageActionModal, { VoyageAction } from "../components/AlertVoyageActionModal"

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
        <div className="h-screen flex flex-col">
            <nav className="absolute w-full z-10 bg-white h-16 border-b 
                    flex justify-between items-center px-4 lg:px-8"
            >
                <h1 className="font-medium font-mono text-lg lg:text-xl">
                    Carnet de voyage
                </h1>
            </nav>
            <main className="h-full mx-3 mt-2">
                {voyages ? (
                    <div className="flex flex-wrap mx-auto mt-6">
                        {voyages.map((voyage) => (
                            <div key={voyage.id} 
                                className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4  
                                    justify-centers items-center space-x-5 "
                            >
                                <VoyageCard 
                                    voyage={voyage} 
                                    actions={{ cloture: handleClotureVoyage, annule: handleAnnuleVoyage }} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="">
                        Rien
                    </div>
                )}
                <VoyageFormModal/>  
            </main>
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
    )
}