import DayCard from "../components/voyage-day/DayCard"
import DayUploader from "../components/voyage-day/DayUploader"
import Layout from "./Layout"


const Days = () => {

    return (
        <Layout>
            <div id="days" className="h-screen w-full space-y-9">
                {!is_end && (
                        <section id="uploader" className="flex justify-end">
                            <DayUploader voyageId={travel_id} />
                        </section>
                    )}
                <section id="days-list" className="justify-items-center">
                    {days.map((day, index) => (
                            <DayCard key={index} day={day}/>
                        ))
                    }
                </section>
            </div>
        </Layout>
        
    )
}

export default Days
