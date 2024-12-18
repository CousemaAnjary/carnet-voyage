import { Button } from "@/components/ui/button";
import { DayPhotoType, DayType } from "../../../../features/api/types"
import { motion } from "framer-motion";

const DayCardImagesPreview = ({ photos } : { photos:  DayPhotoType[] | undefined}) => {
    const imagesCount = photos?.length ?? 0;
    const images = photos?.map(photo => import.meta.env.VITE_BACKEND_API_URL + photo.photo_url) ?? [];
    
    return (
        <section id="day-photo-preview" className="flex bg-white justify-center items-center">
            {imagesCount > 1 && (
                <motion.div 
                    style={{ rotate: -12, }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                    className="rounded-xl -mx-4 p-1 bg-white border border-neutral-100"
                >
                    <img src={images?.[1]} alt="day-image" width="500" height="800"
                        className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                    />
                </motion.div>
            )}
            <motion.div 
                whileHover={{ scale: 1.1, zIndex: 100 }}
                className="z-10 rounded-xl -mx-4 p-1 bg-white border border-neutral-100"
            >
                <img src={images?.[0]} alt="day-image" width="500" height="800"
                    className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                />
            </motion.div>
            {imagesCount > 2 && (
                <motion.div
                    style={{ rotate: 12, }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                    className="rounded-xl -mx-4 p-1 bg-white border border-neutral-100"
                >
                    <img src={images?.[2]} alt="day-image" width="500" height="800"
                        className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                    />
                    {imagesCount > 3 && (
                        <div className="rounded-lg w-full h-full flex justify-center items-center 
                            absolute inset-0 bg-slate-200 bg-opacity-55">
                            <div className="text-2xl text-slate-700">+{imagesCount - 3}</div>
                        </div>
                    )}
                </motion.div>
            )}
        </section>
    )
}

const DayCard : React.FC<{ 
    day: DayType, dayNum:number, onOpen: (id:number) => void
 }> = ({ day, dayNum, onOpen }) => {

    return (
        <div id="day-card" className="shadow-md w-[24rem]">
            <DayCardImagesPreview  photos={day.day_photos}/>
            <section className="bg-white pt-2 px-6">
                <h1 className="text-center text-2xl font-bold">Jour {dayNum}</h1>
                <div className="h-15 overflow-hidden">{day.legend}</div>
                <Button onClick={() => onOpen(day.id)} className="my-6 w-full bg-blue-600 hover:bg-blue-500">Voir toute les photos</Button>
            </section>
        </div>
    )
}

export default DayCard