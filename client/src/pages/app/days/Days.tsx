import DayCard from "./components/DayCard"
import DayUploader from "./components/DayUploader"
import Layout from "../Layout"
import { useAppSelector } from "@/stores/hook"
import { useParams } from "react-router-dom"


const Days = () => {
    const { voyageID } = useParams()
    const voyages = useAppSelector((state) => state.voyages)
    const voyage = voyages.find( voyage => voyage.id === parseInt(voyageID || '-1', 10) )

    return (
        <Layout label={voyage?.name || "🤯"}>
            {voyage ? (
                <div id="days" className="h-screen w-full space-y-9">
                    {!voyage.ended_at && (
                            <section id="uploader" className="flex justify-end">
                                <DayUploader voyageId={voyage.id} />
                            </section>
                        )}
                    <section id="days-list" className="justify-items-center">
                        {voyage.days.map((day, index) => (
                                <DayCard key={index} day={day}/>
                            ))
                        }
                    </section>
                </div>
            ) : (
                <div className="h-[85vh] flex flex-col items-center justify-center">
                    <h1>🤧</h1>
                    <h1>Contenu introuvable.</h1>
                </div>
            )}
        </Layout>
    )
}

export default Days
