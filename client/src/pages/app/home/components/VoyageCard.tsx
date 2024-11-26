import { Button } from "@/components/ui/button";
import VoyageActionAlertDialog from "./VoyageActionAlertDialog";

interface VoyagePropos {
    id: number;
    name: string;
    country?: string;
    city?: string;
    beginning_at: string;
    ended_at?: string;
    created_at: string;
    updated_at: string;
}

const VoyageCard : React.FC<{voyage: VoyagePropos, onOpen: (id:number) => void}> = ({ voyage, onOpen }) => {

    return (
        <div id="voyage-card" className="flex p-5 space-x-5 w-[25rem] h-[10rem] bg-white shadow-md">
                <div className="h-full items-center justify-center" >
                    <div className="size-16 text-6xl">
                        { voyage.ended_at ?
                            "📦"
                            :
                            Date.parse(voyage.beginning_at) < Date.now() ? "🎏": "🧳"
                        }
                    </div>
                    <p className="mt-1 text-sm text-center">{voyage.name}</p>
                </div>
                <div className="h-full w-full">
                    <p className="text-sm">
                        Lieu : {`${voyage.city}, ${voyage.country}`}
                    </p>
                    <p className="text-sm">
                        {voyage.ended_at ? (
                            <span>Duréer : {voyage.beginning_at} - {voyage.ended_at}</span>
                        ) : (
                            <span>Départ : {voyage.beginning_at}</span>
                        )}
                    </p>
                    {voyage.ended_at ? (
                        <p className="text-green-600">Terminé</p>
                    ) : (
                        Date.parse(voyage.beginning_at) < Date.now() ? (
                            <p className="text-red-600">En cours</p>
                        ) : (
                            <p className="text-gray-600">À venir</p>
                        )
                    )}
                    <div className="w-full flex space-x-4 mt-3">
                        <div className="w-full">
                            {!voyage.ended_at && (
                                Date.parse(voyage.beginning_at) < Date.now() ? (
                                    <VoyageActionAlertDialog
                                        action={{action: "cloture"}}
                                        voyage={{id: voyage.id, name: voyage.name}}
                                    />
                                ) : (
                                    <VoyageActionAlertDialog
                                        action={{action: "annul"}}
                                        voyage={{id: voyage.id, name: voyage.name}}
                                    />
                                )
                            )}
                        </div>
                        <div className="w-full">
                            <Button className=" w-full bg-blue-500 hover:bg-blue-700"
                                onClick={() => onOpen(voyage.id)}
                            >Ouvir</Button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default VoyageCard