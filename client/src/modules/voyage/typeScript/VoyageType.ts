export interface ImageType {
    src: string;
    description: string;
}

export interface DossierType {
    id: number;                // Identifiant unique du dossier
    name: string;              // Nom du dossier
    city: string;              // Ville associée au dossier
    country: string;           // Pays associé au dossier
    beginning_at: string;      // Date de début du voyage sous forme de chaîne (format: AAAA-MM-JJ)
    images: ImageType[];       // Liste des images associées au dossier
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