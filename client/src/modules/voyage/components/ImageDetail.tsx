import { useState, useEffect } from "react";

interface imageType {
    src: string;
    alt: string;
    description?: string;
    location?: { city: string; country: string };
}

interface ImageDetailProps {
    image: imageType;
    onClose: () => void;
    onSave: (updatedImage: imageType) => void;
}

export default function ImageDetail({ image, onClose, onSave }: ImageDetailProps) {
    const [description, setDescription] = useState(image.description || "");
    const [location, setLocation] = useState(image.location);
    const [loadingLocation, setLoadingLocation] = useState(false);

    useEffect(() => {
        if (!location) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const fetchedLocation = await getLocationName(latitude, longitude);
                    setLocation(fetchedLocation);
                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                    setLoadingLocation(false);
                }
            );
        }
    }, [location]);

    const getLocationName = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            return {
                city:
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    data.address.hamlet ||
                    data.address.county ||
                    "Ville inconnue",
                country: data.address.country || "Pays inconnu",
            };
        } catch (error) {
            console.error("Erreur de géocodage:", error);
            return { city: "Ville inconnue", country: "Pays inconnu" };
        }
    };

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
                {loadingLocation ? (
                    <p className="mt-4 text-sm text-gray-600">Obtention de la localisation...</p>
                ) : (
                    location && (
                        <div className="mt-4 text-sm text-gray-600">
                     
                            <p>Ville : {location.city}</p>
                            <p>Pays : {location.country}</p>
                        </div>
                    )
                )}
                <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Enregistrer
                </button>
            </div>
        </div>
    );
}
