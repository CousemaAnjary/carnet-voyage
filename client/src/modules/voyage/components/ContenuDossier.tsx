import { FaPlus } from "react-icons/fa";

interface ImageType {
    src: string;
    alt: string;
}

interface ContenuDossierProps {
    nom: string;
    images: ImageType[];
    fermerDossier: () => void;
    ajouterImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContenuDossier({ nom, images, fermerDossier, ajouterImage }: ContenuDossierProps) {
    return (
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
    );
}
