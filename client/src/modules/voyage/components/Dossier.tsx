import { useState } from "react";
import { DossierProps } from "../typeScript/VoyageType";
import ContenuDossier from "./ContenuDossier";
import iconV from "../../../assets/images/iconV.png";

interface ImageType {
    src: string;
    alt: string;
}

export default function Dossier({ dossier }: DossierProps) {
    /**
     * ! STATE (état, données) de l'application
     */
    const [nom, setNom] = useState(dossier.nom);
    const [enEdition, setEnEdition] = useState(false);
    const [ouvert, setOuvert] = useState(false); // État pour savoir si le dossier est ouvert ou non
    const [images, setImages] = useState<ImageType[]>([
        { src: "https://via.placeholder.com/100", alt: "Image 1" },
        { src: "https://via.placeholder.com/100", alt: "Image 2" },
        { src: "https://via.placeholder.com/100", alt: "Image 3" },
        { src: "https://via.placeholder.com/100", alt: "Image 4" },
        { src: "https://via.placeholder.com/100", alt: "Image 5" },
        { src: "https://via.placeholder.com/100", alt: "Image 6" },
    ]);

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */

    // Renommer le dossier
    const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
        setNom(e.target.value);
        setEnEdition(false);
    };

    // Ouvrir le dossier pour afficher toutes les images
    const ouvrirDossier = () => {
        setOuvert(true);
    };

    // Fermer le dossier
    const fermerDossier = () => {
        setOuvert(false);
    };

    // Ajouter une image manuellement via un input file
    const ajouterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                src: URL.createObjectURL(file),
                alt: file.name,
            }));
            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="flex flex-col items-center cursor-pointer">
            {/* Icône du dossier pour l'ouverture */}
            <div onClick={ouvrirDossier}>
            <img src={iconV} alt="Dossier" className="w-24 h-24" />
            </div>

            {/* Nom du dossier en dessous, double-clic pour renommer */}
            {enEdition ? (
                <input
                    type="text"
                    defaultValue={nom}
                    onBlur={renommerDossier}
                    autoFocus
                    className="mt-1 p-1 border text-center rounded text-sm"
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
                <ContenuDossier
                    nom={nom}
                    images={images}
                    fermerDossier={fermerDossier}
                    ajouterImage={ajouterImage}
                />
            )}
        </div>
    );
}
