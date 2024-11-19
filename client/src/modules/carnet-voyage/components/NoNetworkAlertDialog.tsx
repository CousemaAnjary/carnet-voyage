import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { ReactNode } from "react"
  
const NoNetworkAlertDialog = ({ triggerChild }: { triggerChild: ReactNode }) => {
    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {triggerChild}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Problemme de connexion</AlertDialogTitle>
                <AlertDialogDescription>
                    Cette action require une connexion internet.
                    S'il vous plait vérifié l'état de votre connexion puis 
                    réessayé.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction className="bg-blue-500">Fermer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}

export default NoNetworkAlertDialog
  