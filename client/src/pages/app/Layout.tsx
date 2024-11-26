import { APP_NAME } from "@/App"
import { ReactNode } from "react"

const NavigationBar : React.FC<{ title : string}> = ({ title }) =>  {
    return (
        <nav className="absolute w-full z-10 bg-white h-16 border-b 
                    flex items-center px-4 lg:px-8"
        >
            <h1 className="font-medium font-mono text-lg lg:text-xl">
                {title}
            </h1>
        </nav>
    )
}

const Layout = ({ children }: { children: ReactNode }) => {

    return(
        <div id="app-container" className="h-screen flex flex-col space-y-20 overflow-hidden">
              <div id="app-nav-bar" className="relative w-full">
                  <NavigationBar title={ APP_NAME} />
              </div>
              <div id="app-root-children" className="px-5 justify-items-center">
                {children}
              </div>
        </div>
    )
}

export default Layout