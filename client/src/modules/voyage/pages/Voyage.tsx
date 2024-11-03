// src/pages/Voyage.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import DossierModal from '../components/DossierModal';
import { DossierType } from '../typeScript/VoyageType';

const Voyage: React.FC = () => {
    const [folders, setFolders] = useState<DossierType[]>([]);

    // Fonction pour gérer l'ajout d'un nouveau dossier
    const handleSaveFolder = (folderData: DossierType) => {
        setFolders([...folders, folderData]);
    };

    const renameFolder = (id: number, newName: string) => {
        setFolders(folders.map(folder => 
            folder.id === id ? { ...folder, name: newName } : folder
        ));
    };

    const addImageToFolder = (id: number, newImages: { src: string; alt: string }[]) => {
        setFolders(folders.map(folder => 
            folder.id === id ? { ...folder, images: [...folder.images, ...newImages] } : folder
        ));
    };

    return (
        <div className="relative min-h-screen p-4 bg-gray-100">
            {/* Barre de navigation */}
            <Navbar />

            {/* Liste des dossiers */}
            <main className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                {folders.map((folder) => (
                    <Folder 
                        key={folder.id} 
                        folder={folder} 
                        onRename={renameFolder} 
                        onAddImage={addImageToFolder} 
                    />
                ))}
            </main>

            {/* Modal de création de dossier avec son propre déclencheur */}
            <DossierModal onSave={handleSaveFolder} />
        </div>
    );
};

export default Voyage;
