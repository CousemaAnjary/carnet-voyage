import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { cancelVoyage, closeVoyage } from "../carnetVoyageService"

export type VoyageAction = {
    action: 'cloture' | 'annul'
}

interface AlertVoyageActionModalProps {
    action: VoyageAction,
    voyage: {
        id: number | string,
        name: string,
    },
    dialog: {
        open: boolean,
        setOpen: (value: boolean) => void,
    }
}

const AlertVoyageActionModal: React.FC<AlertVoyageActionModalProps> = ({ action, voyage, dialog }) => {
    console.log(action)
    const terminerVoyage = async () => {
        const res = await closeVoyage(voyage.id)
        console.log(res)
        dialog.setOpen(false)
    }  
    
    const annulerVoyage = async () => {
        const res = await cancelVoyage(voyage.id)
        console.log(res)
        dialog.setOpen(false)
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
            <Dialog open={dialog.open} onOpenChange={dialog.setOpen}>
                <DialogContent className="w-full  max-w-sm bg-white shadow-md">
                    <DialogHeader>
                        <DialogTitle>
                            <span className="text-red-500">! ATTENTION !</span>
                        </DialogTitle>
                        <DialogDescription>
                            {action.action === "cloture" ? (
                                <span>
                                    Vous allez clôturer le voyage {voyage.name}. Cette action sera irréversible.
                                </span>
                            ) : (
                                <span>
                                    Vous allez annuler le voyage {voyage.name}. Cette action sera irréversible.
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end mt-4 gap-2">
                        <Button className="bg-red-500 hover:bg-red-600"
                            onClick={handleValidateAction}
                        >Confirmer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}

export default AlertVoyageActionModal
