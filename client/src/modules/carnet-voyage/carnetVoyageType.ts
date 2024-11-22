
// le type de données pour un carnet de voyage
export type VoyageType = {
    id: string | number
    name: string
    city: string
    country: string
    beginning_at: string
    ended_at?: string 
    synced?: boolean
}

export interface Photo {
    id: string | number;
    img_url: string;
    travel_id: string | number;
    location: string | null;
    taken_at: string;
    description: string | null;
    created_at: string;
    updated_at: string | null
}

export interface ImageDetailleProps {
    image: Photo;
    onClose: () => void;
    onSave: () => void;
}