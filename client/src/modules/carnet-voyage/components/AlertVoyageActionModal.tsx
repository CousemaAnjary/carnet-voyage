import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cancelVoyage, closeVoyage } from "../carnetVoyageService"
import { NetworkContext } from "@/core/contexts/NetworkContext"
import { useContext } from "react"
import NoNetworkAlertDialog from "./NoNetworkAlertDialog"

export type VoyageAction = {
    action: 'cloture' | 'annul'
}

interface VoyageActionAlertDialogProps {
    action: VoyageAction,
    voyage: {
        id: number | string,
        name: string,
    }
}

const VoyageActionAlertDialog: React.FC<VoyageActionAlertDialogProps> = ({ action, voyage }) => {
    // Check if app online
    const { online} = useContext(NetworkContext);

    const terminerVoyage = async () => {
        const res = await closeVoyage(voyage.id)
        console.log(res)
    }  
    
    const annulerVoyage = async () => {
        const res = await cancelVoyage(voyage.id)
        console.log(res)
    }

    const handleValidateAction = () => {
        switch(action.action){
            case "cloture":
                terminerVoyage()
                break
            case "annul":
                annulerVoyage()
                break
            default:
                console.log("non pris en compte")
                break
        }
    }
    
    
    return (
        <>{online ? (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="w-full bg-red-500 hover:bg-red-700">
                        {action.action === "cloture" ? "Cloturer" : "Annuler"}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Avertissement</AlertDialogTitle>
                        <AlertDialogDescription>
                            Vous aller {action.action === "cloture" ? "cloturer " : "annuler "} 
                            le voyage {voyage.name}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-red-600"
                            onClick={() => handleValidateAction()}
                        >Confirmer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        ) : (
            <NoNetworkAlertDialog 
                triggerChild={
                    <Button className="w-full bg-red-500 hover:bg-red-700">
                        {action.action === "cloture" ? "Cloturer" : "Annuler"}
                    </Button>
                }
            />
        )
        }</>
    )
}

export default VoyageActionAlertDialog
