import { Button } from "@/components/ui/button"
import { ReactNode, useEffect, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom"


const LayoutNavigationBar : React.FC<{ title : string}> = ({ title }) =>  {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [activateReturnBtn, setActivateReturnBtn] = useState(false)

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if(pathname.match(/\/voyage\/\d+/) || pathname.match(/\/day\/\d+/)) {
            setActivateReturnBtn(true)
        }
    }, [pathname])

    return (
        <nav className="absolute w-full z-10 bg-white h-16 border-b 
                    flex items-center px-4 lg:px-8"
        >
            {activateReturnBtn && (
                <Button variant={'ghost'} onClick={goBack}>
                    <FaArrowLeftLong/>
                </Button>
            )}
            <h1 className="font-medium font-mono text-lg lg:text-xl">
                {title}
            </h1>
        </nav>
    )
}

const Layout = ({ children, label }: { children: ReactNode, label:string }) => {

    return(
        <div id="app-container" className="h-screen flex flex-col space-y-20 overflow-hidden">
              <div id="app-nav-bar" className="relative w-full">
                  <LayoutNavigationBar title={label} />
              </div>
              <div id="app-root-children" className="px-5 justify-items-center">
                {children}
              </div>
        </div>
    )
}

export default Layout