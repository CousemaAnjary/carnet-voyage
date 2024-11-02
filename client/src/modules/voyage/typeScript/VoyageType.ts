export interface ImageType {
    src: string;
    description: string;
}

export interface DossierType {
    id: number;
    nom: string;
    images: ImageType[];
}

export interface DossierProps {
    dossier: DossierType;
}

export interface ImageProps {
    image: ImageType;
}