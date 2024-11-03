// src/components/Folder.tsx
import React, { useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import FolderContent from './FolderContent';
import { FolderType } from '../types/VoyageTypes';

interface FolderProps {
    folder: FolderType;
    onRename: (id: number, newName: string) => void;
    onAddImage: (id: number, newImages: { src: string; alt: string }[]) => void;
}

const Folder: React.FC<FolderProps> = ({ folder, onRename, onAddImage }) => {
    const [isEditing, setIsEditing] = useState(false); // État pour activer l'édition du nom du dossier
    const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer le contenu du dossier
    const [name, setName] = useState(folder.name); // État local pour le nom du dossier

    // Fonction pour gérer le renommage du dossier
    const handleRename = (e: React.FocusEvent<HTMLInputElement>) => {
        onRename(folder.id, e.target.value);
        setIsEditing(false);
    };

    // Fonction pour basculer l'ouverture du contenu du dossier
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col items-center cursor-pointer">
            {/* Icône du dossier qui ouvre le contenu lorsqu'on clique dessus */}
            <div onClick={toggleOpen}>
                <FaFolder size={120} className="text-yellow-500" />
            </div>

            {/* Nom du dossier, en mode édition si l'utilisateur double-clique */}
            {isEditing ? (
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleRename}
                    autoFocus
                    className="mt-1 p-1 border text-center rounded text-sm"
                />
            ) : (
                <p
                    className="mt-1 text-sm text-center"
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {name}
                </p>
            )}

            {/* Affichage du contenu du dossier si `isOpen` est `true` */}
            {isOpen && (
                <FolderContent
                    folder={folder}
                    onAddImage={onAddImage}
                    onClose={toggleOpen}
                />
            )}
        </div>
    );
};

export default Folder;
