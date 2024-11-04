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
        <div className="absolute  inset-0 z-10 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-2xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 overflow-y-auto">
            {/* Côté gauche - Grille d'images avec BlurFade et disposition "masonry" */}
            <div className="flex-1  grid  grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {images.map((image, index) => (
                    <BlurFade key={image.src} delay={0.2 + index * 0.05} inView>
                        <div
                            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
                            style={{
                                height: `${Math.random() * 150 + 100}px`, // Hauteur aléatoire entre 100px et 250px
                              
                            }}
                        >
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                        </div>
                    </BlurFade>
                ))}
            </div>

            {/* Côté droit - Informations sur le dossier */}
            <div className="w-full sm:w-1/3 max-w-xs bg-white p-3 sm:p-4 rounded-lg shadow-md flex flex-col items-center ">
                <button onClick={fermerDossier} className="text-sm text-blue-500 hover:underline mb-2 self-end flex items-center">
                    <FaTimes className="mr-1" /> Fermer
                </button>
                
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-6 text-gray-800">{nom}</h3>

                <div className="flex flex-col items-start bg-gray-100 p-3 rounded-lg shadow-inner w-full text-sm sm:text-base mb-3">
                    <div className="flex items-center mb-1">
                        <FaCalendarAlt className="mr-2 text-blue-400" />
                        <span className="text-gray-600">Date de création :</span>
                        <span className="ml-1 font-semibold text-gray-800">01/01/2024</span>
                    </div>
                    <div className="flex items-center">
                        <FaImages className="mr-2 text-green-400" />
                        <span className="text-gray-600">Nombre d'images :</span>
                        <span className="ml-1 font-semibold text-gray-800">{images.length}</span>
                    </div>
                </div>

                <label className="flex items-center justify-center cursor-pointer text-blue-600 hover:underline mt-2">
                    <FaPlus className="inline mr-1" /> Ajouter une image
                    <Input type="file" multiple onChange={ajouterImage} className="hidden" accept="image/*" />
                </label>
            </div>
        </div>
    );
}
