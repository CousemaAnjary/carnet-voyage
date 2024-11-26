import api from "@/modules/services/apiConfig"
import { FormType } from "./components/CustomFormField"

export const login = async (dataLogin: FormType) => {
    try {
        // Appel à l'API pour connecter un utilisateur
        const response = await api.post('/auth', dataLogin)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        // Gérer les erreurs API (serveur) 
        console.log(error)
        throw error // Gérer les erreurs API (serveur)
    }
}

// Déconnexion d'un utilisateur
export const logout = async () => {
    await api.post('/logout')
}

// Inscription d'un utilisateur
export const register = async (dataRegister: FormType) => {
    try {
        // Appel à l'API pour inscrire un utilisateur
        const response = await api.post('/signup', dataRegister)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.log(error)
        throw error // Gérer les erreurs API (serveur)
    }
}