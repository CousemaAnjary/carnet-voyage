export interface DayPhotoType {
    id: number;
    day_id: number;
    photo_url: string;
    created_at: string;
    updated_at: string;
}

export interface DayType {
    id: number;
    travel_id: number;
    legend?: string;
    location?: string;
    dayPhoto?: DayPhotoType[];
    created_at: string;
    updated_at: string;
}


// le type de données pour un carnet de voyage
export interface VoyageType {
    id: number;
    name: string;
    country?: string;
    city?: string;
    beginning_at: string;
    day: DayType[];
    ended_at?: string;
    created_at: string;
    updated_at: string;
}
