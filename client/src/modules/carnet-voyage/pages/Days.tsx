import DayCard from "../components/voyage-day/DayCard"
import { DayType } from "../types"
import DayUploader from "../components/voyage-day/DayUploader"


const Days : React.FC<{days: DayType[], travel_id:number, is_end: boolean}> = (
    {
        days, 
        travel_id,
        is_end
    }) => {

    return (
        <div id="days" className="h-screen w-full">
             {!is_end && (
                <div id="uploader" className="flex justify-end">
                    <DayUploader voyageId={travel_id} />
                </div>
             )}
            <div id="days-list ">
                {days.map((day, index) => (
                        <DayCard key={index} day={day} />
                    ))
                }
            </div>
        </div>
    )
}

export default Days
