import DayCard from "./components/DayCard"
import DayUploader from "./components/DayUploader"
import Layout from "../Layout"
import { useAppSelector } from "@/features/stores/hook"
import { useNavigate, useParams } from "react-router-dom"
import Error404 from "../errors/Error404"


const Days = () => {
    const navigate = useNavigate()
    const { voyageID } = useParams()
    const voyages = useAppSelector((state) => state.voyages)
    const voyage = voyages.find( voyage => voyage.id === parseInt(voyageID || '-1', 10) )

    function openDay(id:number) {
        navigate(`/carnet-voyage/${voyageID}/${id}`)
    }

    return (
        <Layout label={voyage?.name || "🤯"}>
            {voyage ? (
                <div id="days" className="h-[89vh] w-full overflow-y-auto space-y-9">
                    {!voyage.ended_at && (
                            <section id="uploader" className="flex justify-end">
                                <DayUploader voyageId={voyage.id} />
                            </section>
                        )}
                    <section id="days-list" className="justify-items-center w-full grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4">
                        {voyage.days.map((day, index) => (
                                <DayCard key={index} day={day} onOpen={openDay}/>
                            ))
                        }
                    </section>
                </div>
            ) : (
                <Error404 />
            )}
        </Layout>
    )
}

export default Days
