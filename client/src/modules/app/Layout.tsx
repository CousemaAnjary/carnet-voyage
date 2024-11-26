import { APP_NAME } from "@/App"
import NavigationBar from "@/components/NavigationBar"
import { ReactNode } from "react"

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