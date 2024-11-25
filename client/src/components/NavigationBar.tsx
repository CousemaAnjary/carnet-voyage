import { Button } from "./ui/button"
import { FaArrowLeftLong } from "react-icons/fa6";
import { APP_NAME } from "@/modules/carnet-voyage/Home";

interface NavigationBarProps {
    title: string;
    onBack: () => void
}

const NavigationBar : React.FC<NavigationBarProps> = (
    {
        title, onBack 
    }) =>  {

    function returnToVoyage() {
        onBack()
    }

    return (
        <nav className="absolute w-full z-10 bg-white h-16 border-b 
                    flex items-center px-4 lg:px-8"
        >
            {title != APP_NAME && (
                    <Button onClick={returnToVoyage} variant={'ghost'}>
                        <FaArrowLeftLong />
                    </Button>
            )}
            <h1 className="font-medium font-mono text-lg lg:text-xl">
                {title}
            </h1>
        </nav>
    )
}

export default NavigationBar