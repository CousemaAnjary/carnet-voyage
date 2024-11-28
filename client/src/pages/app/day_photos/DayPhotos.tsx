import { useAppSelector } from "@/features/stores/hook"
import { useParams } from "react-router-dom"
import Layout from "../Layout"
import Error404 from "../errors/Error404"
import { motion } from "framer-motion"

const DayPhotos = () => {
    const { voyageID, dayID } = useParams<{ voyageID: string; dayID: string }>();
    const voyages = useAppSelector((state) => state.voyages);

    const voyage = voyages.find((voyage) => voyage.id === parseInt(voyageID || "-1", 10));
    const day = voyage?.days.find((day) => day.id === parseInt(dayID || "-1", 10));

    const label = voyage && day ? `${voyage.name} / Jour ${day.id} / Photos` : "🤯";

    return(
        <Layout label={label}>
            {voyage && day ? (
                <div id="days-photos" className="h-[86vh] w-full overflow-y-auto">
                    <div className="justify-items-center grid md:grid-cols-4 grid-flow-row">
                        {[...(day.day_photos || [])]?.reverse().map((photo, index) => (
                            <motion.div key={index} 
                                whileHover={{ scale: 1.1, zIndex: 100 }}
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <img src={import.meta.env.VITE_BACKEND_API_URL + photo.photo_url} 
                                alt={`photo-${photo.id}`} 
                                className="w-64 h-72 object-cover rounded-lg"/>
                            </motion.div>
                            )
                        )}
                    </div>
                </div>
            ) : (
                <Error404 />
            )}
        </Layout>
    )
}

export default DayPhotos