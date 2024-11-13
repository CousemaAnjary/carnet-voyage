import { useNavigate } from "react-router-dom"
import { VoyageType } from "../carnetVoyageType"
import iconV from "../../../assets/images/iconV.png"
import { Button } from "@/components/ui/button"

type VoyageCardActionsProps = {
    cloture: (id:string | number, name:string) => void;
    annule: (id:string | number, name:string) => void;
}

const VoyageCard:React.FC<{ voyage: VoyageType, actions: VoyageCardActionsProps  }> = ({ voyage, actions }) => {
    const navigate = useNavigate()

    // Rediriger vers la page de contenu du dossier
    const ouvrirVoyage = () => {
        navigate(`/carnet-voyage-content/${voyage.id}?codename=${voyage.name}`)
    }

    const clotureVoyage = () => {
        actions.cloture(voyage.id, voyage.name)
    }

    const annulerVoyage = () => {
        actions.annule(voyage.id, voyage.name)
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
                <div className="w-full flex space-x-4 mt-3">
                    <div className="w-full">
                        {voyage.ended_at ? (
                            <span></span>
                        ) : (
                            Date.parse(voyage.beginning_at) < Date.now() ? (
                                <Button className="w-full bg-red-500 hover:bg-red-700"
                                    onClick={clotureVoyage}>Cloturer</Button>
                            ) : (
                                <Button className="w-full bg-red-500 hover:bg-red-700"
                                  onClick={annulerVoyage}>Annuler</Button>
                            )
                        )}
                    </div>
                    <div className="w-full">
                        <Button className=" w-full bg-blue-500 hover:bg-blue-700"
                            onClick={ouvrirVoyage}
                        >Ouvir</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoyageCard