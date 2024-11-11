import { uploadContents } from "../carnetVoyageService"

const ContentsUploader = ({voyageId}: {voyageId:string}) => {

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            // Prépare les fichiers pour l'envoi
            const formData = new FormData()
            Array.from(files).forEach((file) => {
                formData.append("img[]", file) // Assurez-vous que le nom "file_path" correspond à votre back-end
            })
            formData.append("travel_id", voyageId) // Ajoutez l'ID du dossier

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
        <form 
            encType="multipart/form-data"
            className="cursor-pointer inline-flex items-center 
                bg-blue-600 text-white px-6 py-2 rounded shadow 
                hover:bg-blue-700 transition"
        >
            <input
                type="file"
                name="files[]"
                multiple={true}
                accept="image/*.png, image/*.jpg, image/*.jpeg"
                onChange={handleFileUpload}
            />
            Ajouter une image
        </form>
    )
}

export default ContentsUploader