import { useEffect, useState } from "react"
import { getVoyages } from "../../../features/api/services"
import { VoyageType } from "../../../features/api/types"
import CreateVoyageDialog from "./components/CreateVoyageDialog"
import NetworkErrorDialog from "../errors/NetworkErrorDialog"
import VoyageCard from "./components/VoyageCard"
import Layout from "../Layout"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/features/stores/hook"
import { refreshVoyageState } from "@/features/stores/voyageSlice"
import { APP_NAME } from "@/App"


const Home = () => {
    const navigate = useNavigate()
    const voyages = useAppSelector((state) => state.voyages)
    const dispatch = useAppDispatch()
    const[openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false)

    // open day
    function openVoyage(id:number) {
        navigate(`/carnet-voyage/${id}`)
    }

    // Récupérer la liste des voyages
    useEffect(() => {
        const fetchVoyages = async () => {
            await getVoyages()
                .then(data => {
                    const travels : VoyageType[] = data.travels
                    dispatch(refreshVoyageState(travels))
                })  
                .catch (error => {
                    setOpenNetworkErrorDialog(true)
                    console.log("Erreur lors de la récupération des dossiers de voyage.", error)
                }) 
        }
        fetchVoyages()
        console.log("Voyages récupérésd")
    }, [dispatch])
    
    return (
        <Layout label={APP_NAME}>
            <div className="h-[90vh] w-full overflow-y-auto justify-items-center">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4">
                    {voyages.map((voyage, index) => (
                            <div  key={index} className="mb-5">
                                <VoyageCard voyage={voyage} onOpen={openVoyage} />
                            </div>
                        )
                    )}
                </div>
            </div>
            <CreateVoyageDialog/>
            {openNetworkErrorDialog &&(
                <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog}/>
            )}
        </Layout>   
    )
}

export default Home