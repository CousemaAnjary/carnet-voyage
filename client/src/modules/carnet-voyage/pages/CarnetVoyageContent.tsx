import { useEffect, useState } from "react";
import Layout from "@/components/dashboad/Layout";
import { Input } from "@/components/ui/input";
import { addImage, getImages } from "../carnetVoyageService";
import { useParams } from "react-router-dom";
import ImageDetail from "../components/ImageDetail";
import { ImageType } from "../carnetVoyageType";
// Import the ImageDetail component


export default function CarnetVoyageContent() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null); // State for the selected image
    const { id } = useParams(); // Récupère l'ID du dossier de voyage depuis l'URL

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const images = await getImages(id as string);
                setImages(images);
            } catch (err) {
                console.error("Erreur lors de la récupération des images.", err);
            }
        };
        if (id) {
            fetchImages();
        }
    }, [id]);

    // Gestion de l'upload d'une image
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Crée une URL pour l'aperçu
            const imageUrl = URL.createObjectURL(file);
            setImages((prevImages) => [...prevImages, imageUrl]);

            // Clean up the object URL after it’s used
            const cleanupUrl = () => URL.revokeObjectURL(imageUrl);
            window.addEventListener("beforeunload", cleanupUrl);

            // Prépare le fichier pour l'envoi
            const formData = new FormData();
            formData.append("file_path", file); // Assurez-vous que le nom "file_path" correspond à votre back-end
            formData.append("folder_voyage_id", id as string); // Ajoutez l'ID du dossier

            try {
                // Envoie l'image au serveur en utilisant votre service
                const response = await addImage(formData);
                console.log("Réponse du serveur :", response);
            } catch (err) {
                console.error("Erreur lors de l'envoi de l'image :", err);
            } finally {
                // Clean up the object URL to avoid memory leaks
                window.removeEventListener("beforeunload", cleanupUrl);
            }
        }
    };

    // Handle image click to open the ImageDetail
    const handleImageClick = (imageSrc: string) => {
        setSelectedImage({ src: imageSrc, alt: "Image Details" });
    };

    // Handle closing the ImageDetail
    const handleCloseDetail = () => {
        setSelectedImage(null);
    };

    // Handle saving the updated image details
    const handleSaveDetail = (updatedImage: ImageType) => {
        // Update the image details in your state
        console.log("Image mise à jour :", updatedImage);
        handleCloseDetail();
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Layout>
            <div className="px-6 py-4">
                {/* Bouton pour ajouter des images aligné à droite */}
                <div className="flex justify-end mb-6">
                    <label className="cursor-pointer inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        Ajouter une image
                    </label>
                </div>

                {/* Affichage des images en grille */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.isArray(images) && images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => handleImageClick(image.startsWith("blob:") ? image : `http://localhost:8000/storage/${image}`)}
                        >
                            <img
                                src={image.startsWith("blob:") ? image : `http://localhost:8000/storage/${image}`}
                                alt="Voyage"
                                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>

                {/* ImageDetail Component */}
                {selectedImage && (
                    <ImageDetail
                        image={selectedImage}
                        onClose={handleCloseDetail}
                        onSave={handleSaveDetail}
                    />
                )}
            </div>
        </Layout>
    );
}
