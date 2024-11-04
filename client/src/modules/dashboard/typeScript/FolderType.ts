

export interface FolderType {
    id: number;                // Identifiant unique du dossier
    name: string;              // Nom du dossier
    city: string;              // Ville associée au dossier
    country: string;           // Pays associé au dossier
    beginning_at: Date;      // Date de début du voyage sous forme de chaîne (format: AAAA-MM-JJ)
}