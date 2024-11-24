import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { uploadContents } from "../../carnetVoyageService"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const DayUploader = ({voyageId}: {voyageId:number}) => {

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            // Prépare les fichiers pour l'envoi
            const formData = new FormData()
            Array.from(files).forEach((file) => {
                formData.append("img[]", file) // Assurez-vous que le nom "file_path" correspond à votre back-end
            })
            formData.append("travel_id", voyageId.toString()) // Ajoutez l'ID du dossier

            try {
                // Envoie les fichiers au serveur
                const response = await uploadContents(formData)
                console.log("Réponse du serveur :", response)
            } catch (err) {
                console.error("Erreur lors de l'envoi des fichiers :", err)
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500" >Nouvelle Journée 🔖</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Nouvelle journée</DialogTitle>
                    <DialogDescription className="text-center">
                        Encore une belle journée à ajouter à votre carnet de voyage ! ✨
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                    />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
    </Dialog>
    )
}

export default DayUploader