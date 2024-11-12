import { useNavigate } from "react-router-dom"
import { VoyageType } from "../carnetVoyageType"
import iconV from "../../../assets/images/iconV.png"
import { Button } from "@/components/ui/button"

const VoyageCard:React.FC<{ voyage: VoyageType }> = ({ voyage }) => {
    const navigate = useNavigate()

    // Rediriger vers la page de contenu du dossier
    const ouvrirVoyage = (id:string|number) => {
        navigate(`/carnet-voyage-content/${id}`)
    }

    return(
        <div className="flex p-5 space-x-5 w-full bg-white shadow-md mt-10">
            <div className="h-full items-center justify-center" >
                <img src={iconV} alt="icon" className="size-16" />
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
                <div className="w-full flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-700"
                    onClick={() => ouvrirVoyage(voyage.id)}>Ouvir</Button>
                </div>
            </div>
        </div>
    )
}

export default VoyageCard