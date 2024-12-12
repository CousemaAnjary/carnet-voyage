import { 
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { PiCameraPlusBold } from "react-icons/pi"
import { useState } from "react"
import { postDay } from "../../../../features/api/services"
import { useAppDispatch } from "@/features/stores/hook"
import { DayType } from "@/features/api/types"
import { stateAddDay } from "@/features/stores/voyageSlice"
import NetworkErrorDialog from "../../../../components/errors/NetworkErrorDialog"

const DayUploader = ({voyageId}: {voyageId:number}) => {
    const dispatch = useAppDispatch()

    const [legend, setLegend] = useState<string>("")
    const [images, setImages] = useState<Array<string>>([])
    const [openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false)

    const [files, setFiles] = useState<File[]>([]) // Stockage des fichiers réels

    const handleUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const fileArray = Array.from(files) // convert to array
            const newPreviews: string[] = []
            const newFiles: File[] = []

            fileArray.forEach((file) => {
                // Créer une URL de prévisualisation
                const previewUrl = URL.createObjectURL(file)
                newPreviews.push(previewUrl)

                // Ajouter le fichier à la liste
                newFiles.push(file)
            })

            // Mettre à jour l'état
            setImages((prev) => [...prev, ...newPreviews])
            setFiles((prev) => [...prev, ...newFiles])
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("travel_id", String(voyageId))
        formData.append("legend", legend)

        // Ajouter les fichiers
        files.forEach((file) => formData.append("img[]", file))

        await postDay(formData)
            .then(response => {
                const newDay : DayType = response.day
                dispatch(stateAddDay({ voyage_id: voyageId, day: newDay }))
            })
            .catch(error => {
                if(error.message === "Network Error") {
                    setOpenNetworkErrorDialog(true)
                } else {
                    console.log(error)
                }
            })
    }

    return (
        <>
            {openNetworkErrorDialog ? (
                <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog} />
            ):(
                <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-500" >Nouvelle Journée 🔖</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-lg md:text-2xl text-neutral-600 font-bold text-center mb-4">
                                    Encore une belle journée à ajouter 🌞
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex-col space-y-5">
                                <div className="flex justify-center items-center w-full h-[8rem] md:h-48 overflow-y-hidden overflow-x-auto">
                                    {images.map((image, idx) => (
                                        <motion.div key={"images" + idx}
                                            style={{ rotate: Math.random() * 20 - 10, }}
                                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 100, }}
                                            whileTap={{ scale: 1.1, rotate: 0, zIndex: 100, }}
                                            className="rounded-xl -mx-4 p-1 bg-white border border-neutral-100 flex-shrink-0"
                                        >
                                            <img src={image} alt="day-image" width="500" height="500"
                                                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                            />
                                        </motion.div>
                                    ))}

                                    {/* uploader */}
                                    <motion.div key="uploader"
                                        style={{ rotate: Math.random() * 20 - 10, }}
                                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 100, }}
                                        whileTap={{ scale: 1.1, rotate: 0, zIndex: 100, }}
                                        className="rounded-xl -mx-4 p-1 bg-white border border-neutral-100 flex-shrink-0"
                                    >
                                        <div className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0">
                                            <PiCameraPlusBold className="w-full h-full bg-slate-100 rounded-lg"/>
                                            <input className="cursor-pointer absolute inset-0 w-full h-full opacity-0"
                                                type="file"
                                                name="files[]"
                                                multiple={true}
                                                accept="image/png, image/jpg, image/jpeg"
                                                onChange={handleUploadImages}
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <textarea className="w-full border-none h-36"
                                        placeholder="Comment ça été ? ..." 
                                        value={legend}
                                        aria-description="Un journée génial ? 🙃"
                                        onChange={(e) => setLegend(e.target.value)}
                                        name="day-legend" id="day-legend" maxLength={255}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button className="mt-5 w-full bg-blue-700 hover:bg-blue-500 text-md h-10" type="submit">Ajouter la journée</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default DayUploader