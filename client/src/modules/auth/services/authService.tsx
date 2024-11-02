import api from "@/core/services/apiConfig"
import { LoginResponseType, LoginType, RegisterResponseType, RegisterType } from "../typeScript/AuthTypes"


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

// Connexion d'un utilisateur
export const login = async (dataLogin: LoginType): Promise<LoginResponseType> => {
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

// // Vérification de l'authentification d'un utilisateur
// export const isAuthenticated = async (): Promise<boolean> => {
//     const response = await api.get('/is-authenticated')
//     return response.data.isAuthenticated // Retourner les données de la réponse de l'API
// }


// Déconnexion d'un utilisateur
export const logout = async () => {
    await api.post('/logout')
}