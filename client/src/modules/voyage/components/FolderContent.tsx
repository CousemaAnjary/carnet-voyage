// src/components/FolderContent.tsx
import React from 'react';
import { FolderType, ImageType } from '../types/VoyageTypes';

interface FolderContentProps {
    folder: FolderType;
    onAddImage: (id: number, newImages: ImageType[]) => void;
    onClose: () => void;
}

const FolderContent: React.FC<FolderContentProps> = ({ folder, onAddImage, onClose }) => {
    // Fonction pour ajouter une image au dossier
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                src: URL.createObjectURL(file),
                alt: file.name,
            }));
            onAddImage(folder.id, newImages);
        }
    };

    return (
        <div className="p-4 bg-gray-200 rounded">
            <h2 className="text-lg font-semibold mb-2">{folder.name}</h2>
            <button onClick={onClose} className="mb-2 text-sm text-blue-500">Fermer</button>
            
            {/* Liste des images */}
            <div className="grid grid-cols-2 gap-2">
                {folder.images.map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt} className="w-full h-auto rounded" />
                ))}
            </div>

            {/* Input pour ajouter une image */}
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddImage}
                className="mt-2"
            />
        </div>
    );
};

export default FolderContent;
