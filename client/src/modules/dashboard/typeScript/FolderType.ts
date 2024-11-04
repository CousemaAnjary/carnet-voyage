export interface FolderType {
    id: string;
    name: string;
    city: string | null;       // Permettre la valeur `null`
    country: string | null;    // Permettre la valeur `null`
    beginning_at: Date;
    user_id?: string;
}
