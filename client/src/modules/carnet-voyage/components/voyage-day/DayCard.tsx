import { DayType } from "../../types"

const DayCard : React.FC<{ day: DayType }> = ({ day }) => {
    return (
        <div className="w-full">
            <h1 id="day-number">Days {day.id}</h1>
        </div>
    )
}

export default DayCard