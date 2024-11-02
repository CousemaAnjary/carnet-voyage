import { useState } from "react";
import { DossierProps } from "../typeScript/VoyageType";
import { FaFolder } from "react-icons/fa";

export default function Dossier({ dossier }: DossierProps) {
    /**
     * ! STATE (état, données) de l'application
     */
    const [nom, setNom] = useState(dossier.nom);
    const [enEdition, setEnEdition] = useState(false);
    const [ouvert, setOuvert] = useState(false); // État pour savoir si le dossier est ouvert ou non

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */

    // Renommer le dossier
    const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
        setNom(e.target.value)
        setEnEdition(false)
    }

    // Ouvrir le dossier pour afficher toutes les images
    const ouvrirDossier = () => {
        setOuvert(true)
    }

    // Fermer le dossier
    const fermerDossier = () => {
        setOuvert(false)
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="flex flex-col items-center cursor-pointer">
            {/* Icône du dossier pour l'ouverture */}
            <div onClick={ouvrirDossier}>
                <FaFolder size={48} className="text-yellow-500" />
            </div>

            {/* Nom du dossier en dessous, double-clic pour renommer */}
            {enEdition ? (
                <input
                    type="text"
                    defaultValue={nom}
                    onBlur={renommerDossier}
                    autoFocus
                    className="mt-1 p-1 border text-center w-24 rounded text-sm"
                />
            ) : (
                <p
                    className="mt-1 text-sm text-center"
                    onDoubleClick={() => setEnEdition(true)}
                >
                    {nom}
                </p>
            )}

            {/* Affichage du contenu du dossier lorsque ouvert */}
            {ouvert && (
                <div className="absolute inset-0 z-10 bg-white p-4 rounded-lg shadow-xl flex flex-col items-center">
                    <button onClick={fermerDossier} className="text-sm text-blue-500 hover:underline mb-4">
                        Fermer
                    </button>
                    <h3 className="text-lg font-semibold text-center mb-4">{nom}</h3>
                    {/* Affichage des images du dossier */}
                    <div className="grid grid-cols-3 gap-2">
                        {dossier.images.map((image, index) => (
                            <img key={index} src={image.src} alt="Image" className="w-16 h-16 object-cover rounded" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
