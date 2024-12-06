/* eslint-disable  @typescript-eslint/no-explicit-any */

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
import NetworkErrorDialog from "../../../../components/errors/NetworkErrorDialog"
import { useAppDispatch } from "@/features/stores/hook"
import { stateAnnulVoyage, stateCloseVoyage } from "@/features/stores/voyageSlice"

export type VoyageAction = {
    action: 'cloture' | 'annul'
}

interface VoyageActionAlertDialogProps {
    action: VoyageAction,
    voyage: {
        id: number,
        name: string,
    }
}

const VoyageActionAlertDialog: React.FC<VoyageActionAlertDialogProps> = ({ action, voyage }) => {
    const dispatch = useAppDispatch()

    const[openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false)  
    const [openAlertActionDialog, setOpenAlertActionDialog] = useState(false)

    // Cloturer un voyage
    const terminerVoyage = async () => {
        try {
            const data = await closeVoyage(voyage.id);
            dispatch(stateCloseVoyage({ id: data.id, date: data.date }));
        } catch (error:any) {
            if (error.message === "Network Error") {
                setOpenNetworkErrorDialog(true);
            } else {
                throw error;
            }
        }
    }  
    
    // Annuler un voyage -> Le supprimer
    const annulerVoyage = async () => {
        try {
            await cancelVoyage(voyage.id);
            dispatch(stateAnnulVoyage({id: voyage.id}));
        } catch (error:any) {  
            if (error.message === "Network Error") {
                setOpenNetworkErrorDialog(true);
            } else {
                throw error;
            }
        }
    }

    const handleValidateAction = () => {
        if (action.action === "cloture") return terminerVoyage();
        if (action.action === "annul") return annulerVoyage();
        setOpenAlertActionDialog(false)
    }
    
    return (
        <>
            <Button onClick={() => setOpenAlertActionDialog(true)}
                className="w-full bg-red-500 hover:bg-red-700"
                aria-label={action.action === "cloture" ? "Clôturer le voyage" : "Annuler le voyage"}
            >
                {action.action === "cloture" ? "Clôturer" : "Annuler"}
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
