import DayCard from "./components/DayCard"
import DayUploader from "./components/DayUploader"
import Layout from "../Layout"
import { useAppSelector } from "@/features/stores/hook"
import { useNavigate, useParams } from "react-router-dom"
import Error404 from "../../../components/errors/Error404"
import { useEffect, useState } from "react"
import { DayType } from "@/features/api/types"


const Days = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { voyages }= useAppSelector((state) => state.voyages);
    
    const [days, setDays] = useState<DayType[]>([]);
    const [label, setLabel] = useState<string>("🤯")
    const [isClosed, setIsClosed] = useState<boolean>(false);
    const [isUpcomming, setIsUpcomming] = useState<boolean>(false);
    const [daysLength, setDaysLength] = useState<number>(0);

    const [exist, setExist] = useState<boolean>(true);

    useEffect(() => {
        if (id && voyages) {
            const voyage = voyages.find(voyage => voyage.id === parseInt(id, 10));

            if(!voyage) {
                setExist(false);
                return;
            }

            if(voyage.days) {
                setDays([...voyage.days].reverse());
                setDaysLength(voyage.days.length);
            }

            setLabel(voyage.name);
            setIsClosed(Boolean(voyage?.ended_at));
            setIsUpcomming(Date.parse(voyage.beginning_at) > Date.now());
        }
    }, [id, voyages]);

    const openDayGallery = (id:number) => navigate(`/gallery/${id}`);

    return (
        <Layout label={label}>
            {exist ? (
                <div id="days" className="h-[89vh] w-full overflow-y-auto space-y-9">
                    {!isClosed  && 
                    (!isUpcomming && 
                            (<section id="uploader" className="flex justify-end">
                                <DayUploader voyageId={parseInt(id || '-1',10)} />
                            </section>)
                    )}
                    <section id="days-list" className={isUpcomming ? "h-[85vh] flex flex-col items-center justify-center" : "justify-items-center w-full grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4"}>
                        {isUpcomming ? (
                            <>
                                <h1>🌈</h1>
                                <h1>Voyage à venir.</h1>
                            </>
                        ):(
                            days.map((day, index) => (
                                <DayCard key={day.id} 
                                    day={day}  dayNum={daysLength - index}
                                    onOpen={openDayGallery}
                                />
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
