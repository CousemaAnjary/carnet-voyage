import { useEffect, useState } from "react"
import { getVoyages } from "../services"
import { VoyageType } from "../types"
import CreateVoyageDialog from "./components/CreateVoyageDialog"
import NetworkErrorDialog from "../error/NetworkErrorDialog"
import VoyageCard from "./components/VoyageCard"
import Layout from "../Layout"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/stores/hook"
import { addVoyage } from "@/stores/voyageSlice"
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
                    dispatch(addVoyage(travels.reverse()))
                })  
                .catch (error => {
                    setOpenNetworkErrorDialog(true)
                    console.log("Erreur lors de la récupération des dossiers de voyage.", error)
                }) 
        }
        fetchVoyages()
    }, [dispatch])
    
    return (
        <Layout label={APP_NAME}>
            <div className="h-[90vh] overflow-y-auto">
                {voyages.map((voyage, index) => (
                        <div  key={index} className="mb-5">
                            <VoyageCard voyage={voyage} onOpen={openVoyage} />
                        </div>
                    )
                )}
                <CreateVoyageDialog/>
            </div>
            {openNetworkErrorDialog &&(
                <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog}/>
            )}
        </Layout>   
    )
}

export default Home