import { useState, useCallback } from "react";
import { DossierProps } from "../typeScript/VoyageType";
import { FaFolder, FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

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

    // Gestion du glisser-déposer des images
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

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

                    {/* Zone de glisser-déposer */}
                    <div
                        {...getRootProps()}
                        className={`w-full p-4 border-2 border-dashed rounded-lg text-center ${
                            isDragActive ? "border-blue-500" : "border-gray-300"
                        }`}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Déposez vos images ici...</p>
                        ) : (
                            <p>Glissez-déposez des images ici, ou cliquez pour sélectionner des fichiers</p>
                        )}
                    </div>

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
