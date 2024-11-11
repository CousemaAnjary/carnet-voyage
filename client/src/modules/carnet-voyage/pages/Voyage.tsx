import { useEffect, useState } from "react";
import Layout from "@/components/dashboad/Layout";
import { getContents } from "../carnetVoyageService";
import { useParams } from "react-router-dom";
import ImageDetail from "../components/ImageDetail";
import { Photos } from "../carnetVoyageType";
import ContentsUploader from "../components/ContentsUploader";


export default function Voyage() {
    const [contents, setContents] = useState<Photos[]>([]);
    const [selectedImage, setSelectedImage] = useState<Photos | null>(null); // State for the selected image
    const { id } = useParams() || null; // Récupère l'ID du dossier de voyage depuis l'URL

    useEffect(() => {
        const fetchContent = async () => {
            try {
                if(!id) throw new Error("ID du dossier de voyage non trouvé.");
                const content = await getContents(id);
                setContents(content);
            } catch (err) {
                console.error(err);
            }
        };
        if (id) {
            fetchContent();
        }
    }, [id]);

    // Handle closing the ImageDetail
    const handleCloseDetail = () => {
        setSelectedImage(null);
    };

    // Handle saving the updated image details
    const handleSaveDetail = () => {
        // Update the image details in your state
        console.log("Image mise à jour :");
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
                    {contents.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setSelectedImage({ ...photo })}
                        >
                            <img
                                className="w-full h-60 object-cover hover:scale-105 transition-transform 
                                    duration-300"
                                src={`${import.meta.env.VITE_BACKEND_API_URL}${photo.img_url}`}
                                alt="Voyage"
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
