import { Button } from "@/components/ui/button"
import VoyageActionAlertDialog from "./VoyageActionAlertDialog"
import { VoyageType } from "../../../../features/api/types"
import { useNavigate } from "react-router-dom"


const VoyageCard: React.FC<{ voyage: VoyageType }> = ({ voyage }) => {
    const navigate = useNavigate()

    const open = () => {
        navigate(`/voyage/${voyage.id}`)
    }
    
    const voyageStatus = voyage.ended_at
        ? "Terminé"
        : Date.parse(voyage.beginning_at) < Date.now()
        ? "En cours"
        : "À venir"

    const voyageIcon = voyage.ended_at
        ? "📦"
        : Date.parse(voyage.beginning_at) < Date.now()
        ? "🎏"
        : "🧳"

    return (
        <div id="voyage-card" className="flex p-5 space-x-5 w-[25rem] h-[10rem] bg-white shadow-md">
            <div className="h-full items-center justify-center">
                <div className="size-16 text-6xl" aria-label={voyageStatus}>
                    {voyageIcon}
                </div>
                <p className="mt-1 text-sm text-center">{voyage.name}</p>
            </div>
            <div className="h-full w-full">
                <p className="text-sm">Lieu : {`${voyage.city}, ${voyage.country}`}</p>
                <p className="text-sm">
                    {voyage.ended_at ? (
                        <span>Durée : {voyage.beginning_at} - {voyage.ended_at}</span>
                    ) : (
                        <span>Départ : {voyage.beginning_at}</span>
                    )}
                </p>
                <p className={`text-${voyage.ended_at ? "green" : Date.parse(voyage.beginning_at) < Date.now() ? "red" : "gray"}-600`}>
                    {voyageStatus}
                </p>
                <div className="w-full flex space-x-4 mt-3">
                    {!voyage.ended_at && (
                        <VoyageActionAlertDialog
                            action={{ action: Date.parse(voyage.beginning_at) < Date.now() ? "cloture" : "annul" }}
                            voyage={{ id: voyage.id, name: voyage.name }}
                        />
                    )}
                    <Button className="w-full bg-blue-500 hover:bg-blue-700" onClick={open}>
                        Ouvrir
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default VoyageCard
