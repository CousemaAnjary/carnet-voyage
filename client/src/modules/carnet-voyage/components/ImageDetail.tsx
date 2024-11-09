import { useState } from "react";
import { updateImageDescription } from "../carnetVoyageService"; // Adjust the import path as necessary
import { ImageDetailleProps } from "../carnetVoyageType";





export default function ImageDetail({ image, onClose, onSave }: ImageDetailleProps) {
    const [description, setDescription] = useState(image.description || "");
    const location = image.location;

    const handleSave = async () => {
        const updatedImage = { ...image, description };

        try {
            // Call the service to update the description in the database
            await updateImageDescription(updatedImage);
            console.log("Description mise à jour avec succès.");
            onSave(updatedImage);
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la description :", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Détails de l'image</h2>

                {/* Image Preview */}
                <img src={image.src} alt={image.alt} className="w-full h-48 object-cover rounded mb-4" />

                {/* Description Input */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-2 p-2 border rounded h-36"
                        placeholder="Ajouter une description..."
                    />
                </div>

                {/* Location Display */}
                {location && (
                    <div className="text-sm text-gray-600 mb-4">
                        <p><strong>Ville :</strong> {location.city}</p>
                        <p><strong>Pays :</strong> {location.country}</p>
                    </div>
                )}

                {/* Save and Close Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={handleSave}
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}
