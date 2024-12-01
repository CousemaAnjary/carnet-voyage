import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateVoyageForm from "./CreateVoyageForm";
import NetworkErrorDialog from "../../errors/NetworkErrorDialog";

const CreateVoyageDialog = () => {
  const [openCreateVoyageDialog, setOpenCreateVoyageDialog] = useState(false);
  const [openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false);

  return (
    <>
      {openNetworkErrorDialog ? (
        <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog} />
      ) : (
        <Dialog open={openCreateVoyageDialog} onOpenChange={setOpenCreateVoyageDialog}>
          <DialogTrigger asChild>
            <button
              className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-700 transition"
              aria-label="Créer un nouveau dossier"
              onClick={() => setOpenCreateVoyageDialog(true)}
            >
              <FaPlus size={24} />
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-sm">
            <DialogHeader>
              <DialogTitle>Programmer un voyage</DialogTitle>
              <DialogDescription>Veuillez remplir les informations du dossier ci-dessous.</DialogDescription>
            </DialogHeader>
            <CreateVoyageForm
              onSuccess={() => setOpenCreateVoyageDialog(false)}
              onCancel={() => setOpenCreateVoyageDialog(false)}
              onError={() => setOpenNetworkErrorDialog(true)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreateVoyageDialog;