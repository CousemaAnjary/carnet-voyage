import { Button } from "@/components/ui/button";
import { DayType } from "../../types"

const DayCard : React.FC<{ day: DayType }> = ({ day }) => {
    const images = [
        "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <div id="day-card" className="shadow-md w-[24rem]">
            <section id="day-photo-preview" className="flex bg-white justify-center items-center">
                <div className="-rotate-12 rounded-xl -mx-4 p-1 bg-white border border-neutral-100">
                    <img src={images[1]} alt="day-image" width="500" height="800"
                        className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                    />
                </div>
                <div className="z-10 rounded-xl -mx-4 p-1 bg-white border border-neutral-100">
                    <img src={images[0]} alt="day-image" width="500" height="800"
                        className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                    />
                </div>
                <div className="rotate-12 rounded-xl -mx-4 p-1 bg-white border border-neutral-100">
                    <img src={images[2]} alt="day-image" width="500" height="800"
                        className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                    />
                    <div className="rounded-lg w-full h-full flex justify-center items-center 
                        absolute inset-0 bg-slate-200 bg-opacity-55">
                        <div className="text-2xl text-slate-700">+3</div>
                    </div>
                </div>
            </section>
            <section className="bg-white pt-2 px-6">
                <h1 className="text-center text-2xl font-bold">Day {day.id}</h1>
                <div className="h-15 overflow-hidden">{day.legend}</div>
                <Button className="my-6 w-full bg-blue-600 hover:bg-blue-500">Ouvrir</Button>
            </section>
        </div>
    )
}

export default DayCard