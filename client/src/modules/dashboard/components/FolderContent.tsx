import { FaPlus } from "react-icons/fa";

interface ImageType {
    src: string;
    alt: string;
}

interface FolderContentProps {
    nom: string;
    images: ImageType[];
    fermerDossier: () => void;
    ajouterImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FolderContent({ nom, images, fermerDossier, ajouterImage }: FolderContentProps) {
    return (
        <div className="absolute inset-0 z-10 bg-gray-50 p-4 rounded-lg shadow-xl flex items-start space-x-4">
            {/* Left Side - Images with Randomized Layout */}
            <div className="flex-1 grid grid-cols-3 gap-3 relative">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-28 h-28 overflow-hidden rounded shadow-lg transform transition-all"
                        style={{
                            transform: `rotate(${Math.random() * 6 - 3}deg)`,
                            top: `${Math.random() * 10}px`,
                            left: `${Math.random() * 10}px`,
                        }}
                    >
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    </div>
                ))}
                <label className="cursor-pointer text-blue-500 hover:underline flex items-center mt-4">
                    <FaPlus className="inline mr-1" /> Ajouter une image
                    <input type="file" multiple onChange={ajouterImage} className="hidden" accept="image/*" />
                </label>
            </div>

            {/* Right Side - Folder Info */}
            <div className="w-1/3 p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
                <button onClick={fermerDossier} className="text-sm text-blue-500 hover:underline mb-4 self-end">
                    Fermer
                </button>
                <h3 className="text-2xl font-semibold text-center mb-4">{nom}</h3>
                <p className="text-gray-600 text-sm text-center mb-2">Informations supplémentaires sur le dossier peuvent être ajoutées ici.</p>
            </div>
        </div>
    );
}
