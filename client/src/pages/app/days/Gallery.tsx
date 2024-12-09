import { useAppSelector } from "@/features/stores/hook"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../Layout"
import Error404 from "../../../components/errors/Error404"
import { motion } from "framer-motion"
import { DayPhotoType, DayType } from "@/features/api/types"
import { useEffect, useMemo, useState } from "react"


const Gallery = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { voyages } = useAppSelector((state) => state.voyages);

    const [day, setDay] = useState<DayType | null>(null);
    const [label, setLabel] = useState<string>("🤯");
    const [photos, setPhotos] = useState<DayPhotoType[]>([]);

    const handlePhotoClick = (id: number) => {
        navigate(`/photo`, { state: { 
            photoId: id,
            dayId: day?.id,
            voyageId: day?.travel_id
        } });
    }

    useEffect(() => {
        if (voyages && id) {
            for (const voyage of voyages) {
                const matchedDay = voyage.days?.find(day => day.id === parseInt(id, 10));
                if (matchedDay) {
                    setLabel(`${voyage.name} / Jour ${matchedDay.id} / Photos`);
                    setDay(matchedDay);
                    if(matchedDay.day_photos) setPhotos([...matchedDay.day_photos].reverse());
                    break
                }
            }
        }
    }, [voyages, id]);

    const renderedPhotos = useMemo(
        () =>
            photos.map((photo) => (
                <motion.div
                    key={photo.id}
                    whileHover={{ scale: 1.1, zIndex: 100 }}
                    className="flex flex-col items-center cursor-pointer"
                >
                    <img
                        src={`${import.meta.env.VITE_BACKEND_API_URL}${photo.photo_url}`}
                        alt={`photo-${photo.id}`}
                        className="w-64 h-72 object-cover rounded-lg"
                        onClick={() => handlePhotoClick(photo.id)}
                    />
                </motion.div>
            )),
        [photos]
    );

    return (
        <Layout label={label}>
            {day ? (
                <div id="days-photos" className="h-[86vh] w-full overflow-y-auto">
                    <div className="justify-items-center grid md:grid-cols-4 grid-flow-row">
                        {renderedPhotos}
                    </div>
                </div>
            ) : (
                <Error404 />
            )}
        </Layout>
    )
}

export default Gallery