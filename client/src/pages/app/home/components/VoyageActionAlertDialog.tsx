import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cancelVoyage, closeVoyage } from "../../../../features/api/services"
import { useState } from "react"
import NetworkErrorDialog from "../../errors/NetworkErrorDialog"

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
    const[openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false)  
    const [openAlertActionDialog, setOpenAlertActionDialog] = useState(false)

    const terminerVoyage = async () => {
        await closeVoyage(voyage.id)
            .catch(error => {
                if(error.message === "Network Error") {
                    setOpenNetworkErrorDialog(true)
                } else {
                    console.log("Erreur lors de la fermeture du voyage.", error)
                }
            })
    }  
    
    const annulerVoyage = async () => {
        await cancelVoyage(voyage.id)
            .catch(error => {
                if(error.message === "Network Error") {
                    setOpenNetworkErrorDialog(true)
                } else {
                    console.log("Erreur lors de l'annulation du voyage.", error)
                }
            })
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
        setOpenAlertActionDialog(false)
    }

    const handleOpenActionAlert = () => {
        setOpenAlertActionDialog(true)
    }
    
    
    return (
        <>
            <Button onClick={handleOpenActionAlert}
                className="w-full bg-red-500 hover:bg-red-700">
                {action.action === "cloture" ? "Cloturer" : "Annuler"}
            </Button>
            {openNetworkErrorDialog ? (
                <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog} />
            ):(
                <AlertDialog open={openAlertActionDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Avertissement</AlertDialogTitle>
                            <AlertDialogDescription>
                                Vous aller {action.action === "cloture" ? "cloturer " : "annuler "} 
                                le voyage {voyage.name}.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel 
                                onClick={()=>setOpenAlertActionDialog(false)}
                            >Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                                className="bg-red-600"
                                onClick={() => handleValidateAction()}
                            >Confirmer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}

export default VoyageActionAlertDialog
