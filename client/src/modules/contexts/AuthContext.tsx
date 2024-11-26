/* eslint-disable react-refresh/only-export-components */
import { isAuthenticated } from "@/modules/contexts/auth"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { login as loginService, logout as logoutService } from '@/pages/auth/services'
import { AuthContextType, LoginResponseType, UserType } from "@/pages/auth/types"
import { FormType } from "@/pages/auth/components/CustomFormField"


const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => ({ token: '', user: { id: '', name: '', email: '' }, messageSuccess: '' }),
    logout: async () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState(isAuthenticated())
    const [user, setUser] = useState<UserType | null>(null)

    useEffect(() => {
        if (auth) {
            // Récupérer les données de l'utilisateur depuis le local storage
            const userData = JSON.parse(localStorage.getItem('user') || 'null')
            setUser(userData)
        }
    }, [auth])

    // Authentification de l'utilisateur
    const login = async (dataLogin: FormType): Promise<LoginResponseType> => {
        // Appel à l'API pour authentifier un utilisateur
        const response = await loginService(dataLogin)

        if (response.token) {
            // Stocker le token JWT dans localStorage
            localStorage.setItem('token', response.token)
            // Stoker les données de l'utilisateur dans le local storage
            localStorage.setItem('user', JSON.stringify(response.user))
            setUser(response.user)
            setAuth(true)
        }
        return response
    }


    // Déconnexion de l'utilisateur
    const logout = async (): Promise<void> => {
        try {
            // Appel à l'API pour déconnecter un utilisateur
            await logoutService()
            // Supprimer le token dans localStorage
            localStorage.removeItem('token')
            // Supprimer les informations de l'utilisateur du localStorage
            localStorage.removeItem('user')
            setAuth(false)
            setUser(null)

        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: auth, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
























// useEffect(() => {
//     // Vérifier si l'utilisateur est authentifié
//     const checkAuth = async () => {
//         try {
//             // Appel de la fonction pour vérifier l'authentification
//             const response = await isAuthenticated()
//             setAuth(response)

//             if (response) {
//                 // Récupérer les données de l'utilisateur depuis le local storage
//                 const userData = JSON.parse(localStorage.getItem('user') || 'null')
//                 setUser(userData)
//             }

//         } catch (error) {
//             console.error('Erreur lors de la vérification de l\'authentification:', error)

//         } finally {
//             setLoading(false)
//         }
//     }
//     checkAuth()
// }, [])
