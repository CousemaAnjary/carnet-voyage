import api from "@/modules/services/apiConfig"
import { FormType } from "./components/CustomFormField"

export const login = async (dataLogin: FormType) => {
    const response = await api.post('/auth', dataLogin)
    return response.data // Retourner les données de la réponse de l'API
}

// Inscription d'un utilisateur
export const register = async (dataRegister: FormType) => {
    const response = await api.post('/signup', dataRegister)
    return response.data
}