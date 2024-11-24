import { useEffect, useState } from "react"
import { getVoyages } from "./carnetVoyageService"
import { VoyageType } from "./types"
import CreateVoyageDialog from "./components/create-voyage/CreateVoyageDialog"
import NetworkErrorDialog from "./components/NetworkErrorDialog"
import VoyageCard from "./components/voyage-card/VoyageCard"
import NavigationBar from "@/components/NavigationBar"
import Days from "./pages/Days"

export const APP_NAME = "Carnet de Voyage"


const Home = () => {
    const [toOpenVoyageIndex, setToOpenVoyageIndex] = useState(-1)
    const [voyages, setVoyages] = useState<VoyageType[]|null>(null)
    const [toOpenVoyageData, setToOpenVoyageData] = useState<VoyageType | null>(null)
    const[openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false)

    function displayListVoyages() {
        setToOpenVoyageData(null)
    }

    // Récupérer la liste des voyages
    useEffect(() => {
        const fetchVoyages = async () => {
            await getVoyages()
                .then(data => {
                    const travels : VoyageType[] = data.travels
                    setVoyages(travels.reverse())
                    console.log(travels)
                })
                .catch (error => {
                    setOpenNetworkErrorDialog(true)
                    console.log("Erreur lors de la récupération des dossiers de voyage.", error)
                }) 
        }
        fetchVoyages()
    }, [])

    useEffect(() => {
        if (toOpenVoyageIndex !== -1 && voyages) {
            setToOpenVoyageData(voyages[toOpenVoyageIndex])
            console.log(voyages[toOpenVoyageIndex].day)
            setToOpenVoyageIndex(-1)
        }
        
    }, [toOpenVoyageIndex, voyages])
    
    return (
        <div id="list-voyage-container" className="h-screen flex flex-col space-y-20 overflow-hidden">
            <div id="top-bar" className="relative w-full">
                <NavigationBar onBack={displayListVoyages}
                    title={ toOpenVoyageData ? toOpenVoyageData.name : APP_NAME} 
                />
            </div>
            <main  className="h-screen sm:flex sm:space-x-3 sm:items-start overflow-y-auto">
                {toOpenVoyageData ? (
                    <Days travel_id={toOpenVoyageData.id} days={toOpenVoyageData.day}/>
                ):(
                    /* Affichage des carnets de voyage */
                    <>
                        {voyages && (voyages.map((voyage, index) => (
                                <VoyageCard key={index} voyage={voyage} openCallback={() => setToOpenVoyageIndex(index)}/>
                            ))
                        )}
                        <CreateVoyageDialog/>
                    </>
                    
                )}
                {openNetworkErrorDialog &&(
                    <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog}/>
                )}
            </main>
        </div>
    )
}

export default Home