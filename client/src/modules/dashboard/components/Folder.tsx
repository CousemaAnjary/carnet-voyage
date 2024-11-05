import { useState } from "react";
import iconV from "../../../assets/images/iconV.png";
import FolderContent from "./FolderContent";

interface ImageType {
    src: string;
    alt: string;
}

interface FolderProps {
    folder: {
        name: string;
    };
}

export default function Folder({ folder }: FolderProps) {
    const [nom, setNom] = useState(folder.name);
    const [enEdition, setEnEdition] = useState(false);
    const [ouvert, setOuvert] = useState(false);
    const [images, setImages] = useState<ImageType[]>([
        { src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=100&h=100&fit=crop", alt: "Forest Image" },
        { src: "https://images.unsplash.com/photo-1527549993586-dff825b37782?w=100&h=100&fit=crop", alt: "Mountain Image" },
        { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop", alt: "Beach Image" },
        { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100&h=100&fit=crop", alt: "City Image" },
        { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=100&h=100&fit=crop", alt: "River Image" },
        { src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=100&h=100&fit=crop", alt: "Desert Image" }
    ]);

    // Renommer le dossier
    const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
        setNom(e.target.value);
        setEnEdition(false);
    };

    const ouvrirDossier = () => setOuvert(true);
    const fermerDossier = () => setOuvert(false);

    const ajouterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                src: URL.createObjectURL(file),
                alt: file.name,
            }));
            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    return (
        <div className="flex flex-col items-center cursor-pointer mt-10">
            <div onClick={ouvrirDossier}>
                <img src={iconV} alt="Dossier" className="w-24 h-24" />
            </div>

            {enEdition ? (
                <input
                    type="text"
                    defaultValue={nom}
                    onBlur={renommerDossier}
                    autoFocus
                    className="mt-1 p-1 border text-center rounded text-sm"
                />
            ) : (
                <p className="mt-1 text-sm text-center" onDoubleClick={() => setEnEdition(true)}>
                    {nom}
                </p>
            )}

            {/* Utilisation de FolderContent */}
            {ouvert && (
                <FolderContent
                    nom={nom}
                    images={images}
                    fermerDossier={fermerDossier}
                    ajouterImage={ajouterImage}
                />
            )}
        </div>
    );
}
