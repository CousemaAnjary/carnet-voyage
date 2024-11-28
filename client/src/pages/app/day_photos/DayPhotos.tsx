import { useAppSelector } from "@/features/stores/hook"
import { useParams } from "react-router-dom"
import Layout from "../Layout"
import Error404 from "../errors/Error404"

const DayPhotos = () => {
    const { voyageID, dayID } = useParams()
    const voyages = useAppSelector((state) => state.voyages)
    const voyage = voyages.find( voyage => voyage.id === parseInt(voyageID || '-1', 10) )
    const day = voyage?.days.find( day => day.id === parseInt(dayID || '-1', 10) )


    return(
        <Layout label={voyage && day ? `${voyage?.name} / Jour ${day?.id} / Photos`:"🤯"}>
            {voyage && day ? (
                <div id="days-photos" className="h-screen w-full space-y-9">
                    Cheese
                </div>
            ) : (
                <Error404 />
            )}
        </Layout>
    )
}

export default DayPhotos