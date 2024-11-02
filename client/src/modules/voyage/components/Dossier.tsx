import { useState } from "react";
import Image from "./Image";

export interface ImageType {
    src: string;
    description: string;
}

export interface DossierType {
    id: number;
    nom: string;
    images: ImageType[];
}

interface DossierProps {
    dossier: DossierType;
}

export default function Dossier({ dossier }: DossierProps) {
    const [nom, setNom] = useState(dossier.nom);
    const [enEdition, setEnEdition] = useState(false);

    const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
        setNom(e.target.value);
        setEnEdition(false);
    };

    return (
        <div className="p-4 bg-yellow-300 rounded-lg shadow-lg relative">
            {enEdition ? (
                <input
                    type="text"
                    defaultValue={nom}
                    onBlur={renommerDossier}
                    className="mt-2 p-1 border rounded"
                />
            ) : (
                <h3 onDoubleClick={() => setEnEdition(true)} className="mt-2 text-center">
                    {nom}
                </h3>
            )}

            <div className="mt-2 text-sm text-gray-700">
                {dossier.images.length} images
            </div>

            {dossier.images.length > 0 && (
                <div className="flex space-x-2 mt-4">
                    {dossier.images.slice(0, 3).map((image, index) => (
                        <Image key={index} image={image} />
                    ))}
                </div>
            )}
        </div>
    );
}
