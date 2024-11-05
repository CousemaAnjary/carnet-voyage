import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageType {
    src: string;
    alt: string;
    description?: string;
    location?: { city: string; country: string };
}

interface ImageDetailProps {
    image: ImageType;
    onClose: () => void;
    onSave: (updatedImage: ImageType) => void;
}

export default function ImageDetail({ image, onClose, onSave }: ImageDetailProps) {
    const [description, setDescription] = useState(image.description || "");
    const location = image.location; // Utilisation directe de location sans setLocation

    const handleSave = () => {
        const updatedImage = { ...image, description, location };
        onSave(updatedImage);
        onClose();
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Détails de l'image</DialogTitle>
                    <DialogDescription>
                        Modifier la description et la localisation de l'image.
                    </DialogDescription>
                </DialogHeader>

                <img src={image.src} alt={image.alt} className="w-full h-48 object-cover rounded mb-4" />

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-2 p-2 border rounded"
                        placeholder="Ajouter une description..."
                    />
                </div>

                {location && (
                    <div className="text-sm text-gray-600 mb-4">
                        <p><strong>Ville :</strong> {location.city}</p>
                        <p><strong>Pays :</strong> {location.country}</p>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Fermer</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
