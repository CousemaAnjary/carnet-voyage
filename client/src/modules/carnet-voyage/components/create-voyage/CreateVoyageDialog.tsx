import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { 
    Dialog, 
    DialogContent,
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger } from '@/components/ui/dialog'
import CreateVoyageForm from './CreateVoyageForm'
import NetworkErrorDialog from '../NetworkErrorDialog'

const CreateVoyageDialog = () => {
    const [openCreateVoyageDialog, setOpenCreateVoyageDialog] = useState(false)
    const[openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState<boolean>(false)

    useEffect(() => {
        if(openNetworkErrorDialog) {
            setOpenCreateVoyageDialog(false)
        }
    },[openNetworkErrorDialog])

    return (
        <>
        {openNetworkErrorDialog  ? (
            <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog} />
        ):(
            <Dialog open={openCreateVoyageDialog} onOpenChange={setOpenCreateVoyageDialog}>
                <DialogTrigger asChild>
                    <button
                        className="fixed bottom-5 right-5 bg-blue-600 text-white 
                        rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-600 
                        transition"
                        onClick={() => setOpenCreateVoyageDialog(true)}
                    >
                        <FaPlus size={24} />
                    </button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Créer un Nouveau Dossier</DialogTitle>
                        <DialogDescription>Veuillez remplir les informations du dossier ci-dessous.</DialogDescription>
                    </DialogHeader>
                    <CreateVoyageForm setNetworkError={setOpenNetworkErrorDialog} />
                </DialogContent>
            </Dialog>
        )}
        </>
    )
}

export default CreateVoyageDialog