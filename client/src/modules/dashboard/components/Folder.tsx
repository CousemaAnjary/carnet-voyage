import { useState } from "react";
import { FaFolder, FaPlus } from "react-icons/fa";

interface ImageType {
    src: string;
    alt: string;
}

// Interface des props pour Folder
interface FolderProps {
    folder: {
        name: string;
    };
}

export default function Folder({ folder }: FolderProps) {
    /**
     * ! STATE (état, données) de l'application
     */
    const [nom, setNom] = useState(folder.name);
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
                <FaFolder size={120} className="text-yellow-500" />
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
                <div className="absolute inset-0 z-10 bg-white p-4 rounded-lg shadow-xl flex flex-col items-center">
                    <button onClick={fermerDossier} className="text-sm text-blue-500 hover:underline mb-4">
                        Fermer
                    </button>
                    <h3 className="text-lg font-semibold text-center mb-4">{nom}</h3>

                    {/* Affichage des images dans le dossier */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {images.map((image, index) => (
                            <img key={index} src={image.src} alt={image.alt} className="w-24 h-24 object-cover rounded" />
                        ))}
                    </div>

                    {/* Bouton pour ajouter une image via input */}
                    <label className="mt-4 cursor-pointer text-blue-500 hover:underline">
                        <FaPlus className="inline mr-1" /> Ajouter une image
                        <input type="file" multiple onChange={ajouterImage} className="hidden" accept="image/*" />
                    </label>
                </div>
            )}
        </div>
    );
}
