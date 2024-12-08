import Error404 from "@/components/errors/Error404";
import { useAppSelector } from "@/features/stores/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Photo  = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const pathname = useLocation().pathname
    const { voyages } = useAppSelector((state) => state.voyages);

    const vid = query.get('vid');
    const did = query.get('did');
    const pid = query.get('pid');

    const photos = voyages.find(voyage => voyage.id === parseInt(vid || '-1', 10))
                    ?.days?.find(day => day.id === parseInt(did || '-1', 10))
                    ?.day_photos;

    const selectPhoto = (id:number) => {
        return photos?.find(photo => photo.id === id);
    };

    const photo = pid ? selectPhoto(parseInt(pid, 10)) : undefined;
    const nextPhoto = photo ? selectPhoto(photo.id - 1) : undefined;
    const prevPhoto = photo ? selectPhoto(photo.id + 1) : undefined;

    const navigateToPhoto = (photoId:number) => {
        navigate(`${pathname}?vid=${vid}&did=${did}&pid=${photoId}`)
    };
    
    const next = () => {
        if(!nextPhoto) return
        navigateToPhoto(nextPhoto.id)
    };

    const prev = () => {
        if(!prevPhoto) return
        navigateToPhoto(prevPhoto.id)
    };

    const exit = () => {
        navigate(`/gallery/${photo?.day_id}`)
    }
    
    return (
        <>
            {!photo ? (
                <Error404 />
            ): (
                <div className="w-full bg-black h-screen flex flex-col items-center justify-center">
                    <button
                        className="fixed top-0 right-2 text-white rounded-full p-4"
                        aria-label="Créer un nouveau dossier"
                        onClick={exit}
                    ><RxCross2 size={30}/></button>
                    <div className="flex items-center justify-center">
                        {prevPhoto && (
                            <button
                                className="fixed left-1 bg-white rounded-full p-3 opacity-50 hover:opacity-100"
                                aria-label="Créer un nouveau dossier"
                                onClick={prev}
                            ><IoIosArrowBack size={30}/></button>
                        )}
                        <img
                            className="max-w-[90%]"
                            src={`${import.meta.env.VITE_BACKEND_API_URL}${photo.photo_url}`}
                            alt={`photo-${photo.id}`}
                        />
                        {nextPhoto && (
                            <button
                                className="fixed right-1 bg-white rounded-full p-3 opacity-50 hover:opacity-100"
                                aria-label="Créer un nouveau dossier"
                                onClick={next}
                            ><IoIosArrowForward size={30}/></button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Photo;