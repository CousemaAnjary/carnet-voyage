import { useEffect, useState } from "react";
import Layout from "@/components/dashboad/Layout";
import { getContents } from "../carnetVoyageService";
import { useParams } from "react-router-dom";
import ImageDetail from "../components/ImageDetail";
import { ImageType } from "../carnetVoyageType";
import ContentsUploader from "../components/ContentsUploader";


export default function Voyage() {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null); // State for the selected image
    const { id } = useParams() || null; // Récupère l'ID du dossier de voyage depuis l'URL

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const content = await getContents(id as string);
                setImages(content);
            } catch (err) {
                console.error("Erreur lors de la récupération des images.", err);
            }
        };
        if (id) {
            fetchContent();
        }
    }, [id]);

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
                    <ContentsUploader voyageId={id ? id : ""} />
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
