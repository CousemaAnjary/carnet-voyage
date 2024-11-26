import api from "@/core/services/apiConfig"
import { RegisterResponseType, RegisterType } from "./registerType"


// Inscription d'un utilisateur
export const register = async (dataRegister: RegisterType): Promise<RegisterResponseType> => {
    try {
        // Appel à l'API pour inscrire un utilisateur
        const response = await api.post('/signup', dataRegister)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.log(error)
        throw error // Gérer les erreurs API (serveur)
    }
}