import api from "@/core/services/apiConfig"
import { FolderType } from "./typeScript/FolderType"

// Récupérer la liste des dossiers
export const getFolders = async () => {
    try {
        const response = await api.get('/folders')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Ajouter un dossier

export const addFolder = async (folderData: FolderType) => {
    try {
        const response = await api.post('/folders', folderData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}