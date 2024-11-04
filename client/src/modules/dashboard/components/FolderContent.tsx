import BlurFade from "@/components/ui/blur-fade";
import { Input } from "@/components/ui/input";
import { FaCalendarAlt, FaImages, FaPlus, FaTimes } from "react-icons/fa";

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
        <div className="absolute inset-0 z-10 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-2xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 overflow-y-auto">
            {/* Côté gauche - Grille d'images avec BlurFade et disposition "masonry" */}
            <div className="flex-1 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {images.map((image, index) => (
                    <BlurFade key={image.src} delay={0.2 + index * 0.05} inView>
                        <div
                            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
                            style={{
                                height: `${Math.random() * 150 + 100}px`, // Hauteur aléatoire entre 100px et 250px
                                borderRadius: `${Math.random() * 15}px`,  // Bordures arrondies aléatoires pour un effet naturel
                            }}
                        >
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                        </div>
                    </BlurFade>
                ))}
                
                {/* Bouton "Ajouter une image" à la fin de la grille */}
              
            </div>

            {/* Côté droit - Informations sur le dossier */}
            <div className="w-full sm:w-1/3 max-w-xs bg-white p-4 sm:p-5 rounded-lg shadow-md flex flex-col items-center text-gray-700 space-y-4">
                <div className="self-end mb-2">
                    <button onClick={fermerDossier} className="text-sm text-blue-500 hover:underline flex items-center">
                        <FaTimes className="mr-1" /> Fermer
                    </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">{nom}</h3>


                <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full">
                    <div className="flex items-center justify-between text-sm sm:text-base mb-2">
                        <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-400" />
                            <span className="text-gray-600">Date de création :</span>
                        </div>
                        <span className="font-semibold text-gray-800">01/01/2024</span>
                    </div>
                    <div className="flex items-center justify-between text-sm sm:text-base">
                        <div className="flex items-center">
                            <FaImages className="mr-2 text-green-400" />
                            <span className="text-gray-600">Nombre d'images :</span>
                        </div>
                        <span className="font-semibold text-gray-800">{images.length}</span>
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-3 flex justify-end items-end">
                    <label className="flex items-center cursor-pointer text-blue-600 hover:underline">
                        <FaPlus className="inline mr-1" />
                        <span>Ajouter une image</span>
                        <Input type="file" multiple onChange={ajouterImage} className="hidden" accept="image/*" />
                    </label>
                </div>
            </div>
        </div>
    );
}
