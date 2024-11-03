export interface ImageType {
    src: string;
    description: string;
}

export interface DossierType {
    id: string;
    name: string;
    city: string;
    country: string;
    beginning_at: Date;
}

export interface DossierProps {
    dossier: DossierType;
}

export interface ImageProps {
    image: ImageType;
}

export interface DossierModalProps {
    onSave: (dossierData:DossierType) => void;
    onClose: () => void;
    open: boolean;
}