import api from "@/features/api/apiConfig"
import { FormType } from "../../pages/auth/components/CustomFormField"
import { VoyageType } from "@/features/api/types"

export const login = async (dataLogin: FormType) => {
    const response = await api.post('/auth', dataLogin)
    return response.data // Retourner les données de la réponse de l'API
}

// Inscription d'un utilisateur
export const register = async (dataRegister: FormType) => {
    const response = await api.post('/signup', dataRegister)
    return response.data
}

// Récupérer la liste des dossiers de voyage
export const getVoyages = async () => {
    const response = await api.get('/travel')
    return response.data
}

// Créer un voyage
export const postVoyage = async (folderVoyageData: VoyageType) => {
    const response = await api.post('/travel/create', folderVoyageData)
    return response.data
}

// Ajouter des images dans un dossier de voyage
export const postDay = async (day: FormData) => {
    const response = await api.post('/day/post', day)
    return response.data
}

// Termine un voygae en cours
export const closeVoyage = async (id:number) => {
    const res = await api.patch(`/travel/close/${id}`)
    return res.data
}

// Supprime un voyge à venir
export const cancelVoyage = async (id:number) => {
    const res = await api.delete(`/travel/cancel/${id}`)
    return res.data
}