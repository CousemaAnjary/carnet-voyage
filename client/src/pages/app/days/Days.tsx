import DayCard from "./components/DayCard"
import DayUploader from "./components/DayUploader"
import Layout from "../Layout"
import { useAppSelector } from "@/features/stores/hook"
import { useNavigate, useParams } from "react-router-dom"
import Error404 from "../errors/Error404"


const Days = () => {
    const navigate = useNavigate()
    const { voyageID } = useParams<{ voyageID: string }>()
    const { voyages }= useAppSelector((state) => state.voyages)

    const voyage = voyages.find(voyage => voyage.id === parseInt(voyageID || '-1', 10))
    const days = voyage?.days || []

    const label = voyage ? voyage.name : "🤯"

    const isClosed = voyage?.ended_at ? true : false
    const isUpcomming = Date.parse(voyage?.beginning_at || '') > Date.now()

    function openDay(id:number) {
        navigate(`/carnet-voyage/${voyageID}/${id}`)
    }

    const reversedDays = [...days].reverse()

    return (
        <Layout label={label}>
            {voyage ? (
                <div id="days" className="h-[89vh] w-full overflow-y-auto space-y-9">
                    {!isClosed  && 
                    (!isUpcomming && 
                            (<section id="uploader" className="flex justify-end">
                                <DayUploader voyageId={voyage.id} />
                            </section>)
                    )}
                    <section id="days-list" className={isUpcomming ? "h-[85vh] flex flex-col items-center justify-center" : "justify-items-center w-full grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4"}>
                        {isUpcomming ? (
                            <>
                                <h1>🌈</h1>
                                <h1>Voyage à venir.</h1>
                            </>
                        ):(
                            reversedDays.map((day) => (
                                <DayCard key={day.id} day={day} onOpen={openDay}/>
                            ))
                        )}
                    </section>
                </div>
            ) : (
                <Error404 />
            )}
        </Layout>
    )
}

export default Days
