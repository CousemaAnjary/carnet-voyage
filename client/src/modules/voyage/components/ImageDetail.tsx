import { useState, useEffect } from "react";

interface ImageType {
    src: string;
    alt: string;
    description?: string;
    location?: { latitude: number; longitude: number };
}

interface ImageDetailProps {
    image: ImageType;
    onClose: () => void;
    onSave: (updatedImage: ImageType) => void;
}

export default function ImageDetail({ image, onClose, onSave }: ImageDetailProps) {
    const [description, setDescription] = useState(image.description || "");
    const [location, setLocation] = useState(image.location);

    // Récupérer la localisation actuelle
    useEffect(() => {
        if (!location) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => console.error("Erreur de géolocalisation:", error)
            );
        }
    }, [location]);

    const handleSave = () => {
        const updatedImage = { ...image, description, location };
        onSave(updatedImage);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                <button onClick={onClose} className="text-sm text-blue-500 hover:underline mb-4">
                    Fermer
                </button>
                <img src={image.src} alt={image.alt} className="w-full h-48 object-cover rounded" />
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-2 p-2 border rounded"
                        placeholder="Ajouter une description..."
                    />
                </div>
                {location && (
                    <div className="mt-4 text-sm text-gray-600">
                        <p>Latitude: {location.latitude}</p>
                        <p>Longitude: {location.longitude}</p>
                    </div>
                )}
                <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Enregistrer
                </button>
            </div>
        </div>
    );
}
