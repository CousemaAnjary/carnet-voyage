import { Button } from "@/components/ui/button";
import { DayType } from "../../types"

const DayCard : React.FC<{ day: DayType }> = ({ day }) => {
    const imagesCount = day.day_photos?.length ?? 0;
    const images = day.day_photos?.map(photo => import.meta.env.VITE_BACKEND_API_URL + photo.photo_url) ?? [];

    const handleOpen = () => {
        //
    }

    return (
        <div id="day-card" className="shadow-md w-[24rem]">
            <section id="day-photo-preview" className="flex bg-white justify-center items-center">
                {imagesCount > 1 && (
                    <div className="-rotate-12 rounded-xl -mx-4 p-1 bg-white border border-neutral-100">
                        <img src={images?.[1]} alt="day-image" width="500" height="800"
                            className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                        />
                    </div>
                )}
                <div className="z-10 rounded-xl -mx-4 p-1 bg-white border border-neutral-100">
                    <img src={images?.[0]} alt="day-image" width="500" height="800"
                        className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                    />
                </div>
                {imagesCount > 2 && (
                    <div className="rotate-12 rounded-xl -mx-4 p-1 bg-white border border-neutral-100">
                        <img src={images?.[2]} alt="day-image" width="500" height="800"
                            className="rounded-lg h-48 w-40 object-cover flex-shrink-0"
                        />
                        {imagesCount > 3 && (
                            <div className="rounded-lg w-full h-full flex justify-center items-center 
                                absolute inset-0 bg-slate-200 bg-opacity-55">
                                <div className="text-2xl text-slate-700">+{imagesCount - 3}</div>
                            </div>
                        )}
                    </div>
                )}
            </section>
            <section className="bg-white pt-2 px-6">
                <h1 className="text-center text-2xl font-bold">Day {day.id}</h1>
                <div className="h-15 overflow-hidden">{day.legend}</div>
                <Button onClick={handleOpen} className="my-6 w-full bg-blue-600 hover:bg-blue-500">Voir toute les photos</Button>
            </section>
        </div>
    )
}

export default DayCard