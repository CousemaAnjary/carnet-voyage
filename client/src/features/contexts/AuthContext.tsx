/* eslint-disable react-refresh/only-export-components */
import { 
    createContext, 
    ReactNode, 
    useContext,
    useState } from "react"

// type
export interface AuthContextType {
    authenticated: boolean;
    token: string | null;
    setToken: (token:string) => void;
}

// context
const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    token: null,
    setToken: () => {}
})

// provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState(!!localStorage.getItem("token"))
    const [token, setTokenState] = useState(localStorage.getItem("token"))
  
    const setToken = (token: string) => {
        localStorage.setItem("token", token)
        setAuth(true)
        setTokenState(token)
    }
  
    return (
      <AuthContext.Provider value={{ authenticated: auth, token, setToken }}>
        {children}
      </AuthContext.Provider>
    )
  }

export const useAuth = () => useContext(AuthContext)
