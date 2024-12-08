import Error404 from "@/components/errors/Error404";
import { useAppSelector } from "@/features/stores/hook";
import { useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Photo  = () => {
    const query = useQuery();
    const { voyages } = useAppSelector((state) => state.voyages);

    const vid = query.get('vid');
    const did = query.get('did');
    const pid = query.get('pid');

    const photos = voyages.find(voyage => voyage.id === parseInt(vid || '-1', 10))
                    ?.days?.find(day => day.id === parseInt(did || '-1', 10))
                    ?.day_photos;

    const photo = photos?.find(photo => photo.id === parseInt(pid || '-1', 10));
    
    return (
        <>
            {!photo ? (
                <Error404 />
            ): (
                <div className="w-full bg-black h-screen flex flex-col items-center justify-center">
                    <button
                        className="fixed top-0 right-2 text-white rounded-full p-4"
                        aria-label="Créer un nouveau dossier"
                        onClick={() => console.log('quitte')}
                    ><RxCross2 size={30}/></button>
                    <div className="flex items-center justify-center">
                        <button
                            className="fixed right-1 bg-white rounded-full p-3 opacity-50 hover:opacity-100"
                            aria-label="Créer un nouveau dossier"
                            onClick={() => console.log('next')}
                        ><IoIosArrowForward size={30}/></button>
                        <img
                            className="max-w-[90%]"
                            src={`${import.meta.env.VITE_BACKEND_API_URL}${photo.photo_url}`}
                            alt={`photo-${photo.id}`}
                        />
                        <button
                            className="fixed left-1 bg-white rounded-full p-3 opacity-50 hover:opacity-100"
                            aria-label="Créer un nouveau dossier"
                            onClick={() => console.log('prev')}
                        ><IoIosArrowBack size={30}/></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Photo;