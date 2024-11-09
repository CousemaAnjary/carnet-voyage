import { useState } from "react"
import { useNavigate } from "react-router-dom"
import iconV from "../../../assets/images/iconV.png"
import { folderVoyageProps } from "../carnetVoyageType"


export default function FolderVoyage({ folderVoyage }: folderVoyageProps) {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()
    const [nom, setNom] = useState(folderVoyage.name)
    const [enEdition, setEnEdition] = useState(false)

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // Renommer le dossier
    const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
        setNom(e.target.value)
        setEnEdition(false)
    }

    // Rediriger vers la page de contenu du dossier
    const ouvrirDossier = () => {
        navigate(`/carnet-voyage-content/${folderVoyage.id}`)
    }
    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="flex flex-col  items-center cursor-pointer mt-10">
                <div onClick={ouvrirDossier}  >
                    <img src={iconV} alt="Dossier" className="w-24 h-24" />
                </div>

                {enEdition ? (
                    <input
                        type="text"
                        defaultValue={nom}
                        onBlur={renommerDossier}
                        autoFocus
                        className="mt-1 p-1 border text-center rounded text-sm"
                    />
                ) : (
                    <p className="mt-1 text-sm text-center" onDoubleClick={() => setEnEdition(true)}>
                        {nom}
                    </p>
                )}
            </div>
        </>
    )
}