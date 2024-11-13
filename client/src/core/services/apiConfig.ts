import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_API_URL + '/api'

// Configuration de l'instance axios
const api = axios.create({
    baseURL: API_URL,
    // withCredentials: true // Pour envoyer les cookies avec les requêtes
})

// Ajouter un intercepteur 
api.interceptors.request.use((config) => {

    // Récupérer le token de localStorage
    const token = localStorage.getItem('token')

    // Ajouter le token dans les headers de la requête
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    // Définir Content-Type en fonction des données envoyées
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'
    } else {
        config.headers['Content-Type'] = 'application/json'
    }

    return config
})

export default api