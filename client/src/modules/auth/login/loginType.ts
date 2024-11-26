// Le type des données pour la connexion (login)
export type LoginType = {
    email: string
    password: string
}

// Le type de données de l'utilisateur
export type UserType = {
    id: string
    name: string
    email: string
    image?: string
}

// Le type de la réponse API pour la connexion (login)
export type LoginResponseType = {
    token: string
    user: UserType
    messageSuccess: string
}

// Le type pour le contexte d'authentification
export type AuthContextType = {
    isAuthenticated: boolean
    user: UserType | null
    login: (data: LoginType) => Promise<LoginResponseType>
    logout: () => Promise<void>
}
