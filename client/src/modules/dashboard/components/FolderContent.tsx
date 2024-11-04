
import BlurFade from "@/components/ui/blur-fade";
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
        <div className="absolute inset-0 z-10 bg-gray-50 p-6 rounded-lg shadow-2xl flex space-x-6">
            {/* Côté gauche - Grille d'images avec BlurFade et positionnement aléatoire */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <BlurFade key={image.src} delay={0.25 + index * 0.05} inView>
                        <div
                            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-200 transform"
                            style={{
                                height: `${Math.random() * 150 + 150}px`, // Hauteur aléatoire entre 150px et 300px
                                transform: `rotate(${Math.random() * 4 - 2}deg)`, // Rotation aléatoire entre -2 et 2 degrés
                            }}
                        >
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                        </div>
                    </BlurFade>
                ))}
                <label className="col-span-3 flex items-center justify-center cursor-pointer text-blue-600 hover:underline mt-4">
                    <FaPlus className="inline mr-1" /> Ajouter une image
                    <input type="file" multiple onChange={ajouterImage} className="hidden" accept="image/*" />
                </label>
            </div>

            {/* Côté droit - Informations sur le dossier */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col">
                <button onClick={fermerDossier} className="text-sm text-blue-500 hover:underline mb-4 self-end">
                    Fermer
                </button>
                <h3 className="text-xl font-bold text-center mb-2">{nom}</h3>
                <p className="text-gray-600 text-center mb-4">Ajouter ici les informations pertinentes sur le dossier.</p>
                <p className="text-gray-500 text-sm text-center mt-auto">Date de création : 01/01/2024</p>
                <p className="text-gray-500 text-sm text-center">Nombre d'images : {images.length}</p>
            </div>
        </div>
    );
}
