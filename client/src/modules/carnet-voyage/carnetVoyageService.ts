import api from "@/core/services/apiConfig"
import { folderVoyageType, ImageType } from "./carnetVoyageType"


// Récupérer la liste des dossiers de voyage
export const getFoldersVoyage = async () => {
    try {
        const response = await api.get('/travel')
        return response.data.travels
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Ajouter un dossier de voyage dans la base de données
export const addFolderVoyage = async (folderVoyageData: folderVoyageType) => {
    try {
        const response = await api.post('/create', folderVoyageData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Ajouter une image dans un dossier de voyage
export const addImage = async (imageData: FormData) => {
    try {
        const response = await api.post('/folderVoyageContent/store', imageData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Récupérer la liste des images d'un dossier de voyage
export const getImages = async (folderVoyageId: string) => {
    try {
        const response = await api.get(`/folderVoyageContent/${folderVoyageId}`);
        return response.data.images.map((content: { file_path: string }) => content.file_path);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Mettre à jour la description d'une image
export const updateImageDescription = async (image: ImageType) => {
    try {
        await api.put(`/folderVoyageContent/update/${image.id}`, { description: image.description });
    } catch (error) {
        console.error(error);
        throw error;
    }
}