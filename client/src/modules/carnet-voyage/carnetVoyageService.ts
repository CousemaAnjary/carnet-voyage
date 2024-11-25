import api from "@/core/services/apiConfig"
import { VoyageType } from "./types"


// Récupérer la liste des dossiers de voyage
export const getVoyages = async () => {
    const response = await api.get('/travel')
    return response.data
}

// Créer un voyage
export const createVoyage = async (folderVoyageData: VoyageType) => {
    const response = await api.post('/travel/create', folderVoyageData)
    return response.data
}

// Ajouter des images dans un dossier de voyage
export const postDay = async (photos: FormData) => {
    const response = await api.post('/travel/day/post', photos)
    return response.data
}

// Récupérer la liste des images d'un dossier de voyage
export const getContents = async (folderVoyageId: string) => {
    try {
        const response = await api.get(`/travel/${folderVoyageId}/content`)
        return response.data.contents
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Mettre à jour la description d'une image
export const updateImageDescription = async (id:string | number, newDescription: string) => {
    try {
        const res = await api.patch(`/travel/content/edit/${id}`, { description: newDescription })
        console.log(res.data)
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Termine un voygae en cours
export const closeVoyage = async (id:string | number) => {
    try {
        const res = await api.patch(`/travel/close/${id}`)
        console.log(res.data)
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Supprime un voyge à venir
export const cancelVoyage = async (id:string | number) => {
    try {
        const res = await api.delete(`/travel/cancel/${id}`)
        console.log(res.data)
    } catch (error) {
        console.error(error)
        throw error
    }
}