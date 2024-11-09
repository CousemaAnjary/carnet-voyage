
// le type de données pour un carnet de voyage
export type folderVoyageType = {
    id: string
    name: string
    city: string
    country: string
    beginning_at: string
    user_id?: string
}

// les propriétés attendues par le composant FolderVoyage
export type folderVoyageProps = {
    folderVoyage: folderVoyageType
}

export interface ImageType {
    id?: string;
    src: string;
    alt: string;
    description?: string;
    location?: { city: string; country: string };
}

export interface ImageDetailleProps {
    image: ImageType;
    onClose: () => void;
    onSave: (updatedImage: ImageType) => void;
}