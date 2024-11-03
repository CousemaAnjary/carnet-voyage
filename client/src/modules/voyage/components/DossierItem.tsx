import { useState } from "react";
import { DossierType } from "../typeScript/VoyageType";
import ContenuDossier from "./ContenuDossier";
import iconV from "../../../assets/images/iconV.png";

interface DossierItemProps {
    dossier: DossierType;
}

export default function DossierItem({ dossier }: DossierItemProps) {
    const [enEdition, setEnEdition] = useState(false);
    const [ouvert, setOuvert] = useState(false);

    // Gestion du nom du dossier en édition
    const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
        dossier.name = e.target.value; // Mettez à jour le nom du dossier
        setEnEdition(false);
    };

    return (
        <div className="flex flex-col items-center cursor-pointer">
            {/* Icône du dossier pour l'ouverture */}
            <div onClick={() => setOuvert(true)}>
                <img src={iconV} alt="Dossier" className="w-24 h-24" />
            </div>

            {/* Nom du dossier en double-clic pour édition */}
            {enEdition ? (
                <input
                    type="text"
                    defaultValue={dossier.name}
                    onBlur={renommerDossier}
                    autoFocus
                    className="mt-1 p-1 border text-center rounded text-sm"
                />
            ) : (
                <p
                    className="mt-1 text-sm text-center"
                    onDoubleClick={() => setEnEdition(true)}
                >
                    {dossier.name}
                </p>
            )}

            {/* Contenu du dossier */}
            {ouvert && (
                <ContenuDossier
                    nom={dossier.name}
                    images={dossier.images}
                    fermerDossier={() => setOuvert(false)}
                />
            )}
        </div>
    );
}
