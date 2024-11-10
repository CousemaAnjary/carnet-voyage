import { createContext, ReactNode, useEffect, useState } from "react"

type NetworkContextType = {
    online: boolean
}

export const NetworkContext = createContext<NetworkContextType>({
    online: false
})

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [online, setOnline] = useState(navigator.onLine);
    
    useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);
    
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
    
        return () => {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        };
      }, []);

    return (
        <NetworkContext.Provider value={{online}}>
            {children}
        </NetworkContext.Provider>
    )
}