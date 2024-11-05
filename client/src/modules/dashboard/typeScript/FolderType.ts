export interface FolderType {
    id: string;
    name: string;
    city: string | null;
    country: string | null;
    beginning_at: Date | string; // Allow both Date and string
    user_id?: string;
}
