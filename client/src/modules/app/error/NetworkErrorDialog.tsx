import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "@/components/ui/alert-dialog"
import { useState } from "react"

interface NetworkErrorDialogProps {
    setIsOpen: (open:boolean) => void 
}
  
const NetworkErrorDialog : React.FC<NetworkErrorDialogProps> = ({setIsOpen}) => {
    const [open, setOpen] = useState(true)
    setIsOpen(true)

    function handleClose() {
        setOpen(false)
        setIsOpen(false)
    }

    return (
    <AlertDialog open={open}>
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
                <AlertDialogAction onClick={handleClose} 
                    className="bg-blue-500">Fermer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}

export default NetworkErrorDialog
  