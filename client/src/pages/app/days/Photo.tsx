import Error404 from "@/components/errors/Error404";
import { useAppSelector } from "@/features/stores/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { DayPhotoType } from "@/features/api/types";
import { useEffect, useState } from "react";


const Photo  = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { voyages } = useAppSelector((state) => state.voyages);

    const { photoId, dayId, voyageId } = location.state as { photoId: number, dayId: number, voyageId: number };

    const [photos, setPhotos] = useState<DayPhotoType[]>([]);
    const [nextPhoto, setNextPhoto] = useState<DayPhotoType|undefined>(undefined);
    const [prevPhoto, setPrevPhoto] = useState<DayPhotoType|undefined>(undefined);
    const [currentPhoto, setCurrentPhoto] = useState<DayPhotoType|undefined>(undefined);

    const selectPhoto = (id:number) => {
        return photos.find(photo => photo.id === id);
    };
    
    const next = () => {
        if(!nextPhoto) return;
        setCurrentPhoto(nextPhoto);
    };

    const prev = () => {
        if(!prevPhoto) return
        setCurrentPhoto(prevPhoto);
    };

    const exit = () => {
        navigate(-1);
    }

    // Set Photos
    useEffect(() => {
        if(voyages && voyageId && dayId) {
            const photosFormDay = voyages.find(voyage => voyage.id === voyageId)
                    ?.days?.find(day => day.id === dayId)
                    ?.day_photos 
                    || []
            setPhotos(photosFormDay);
        }
        
    }, [voyages, voyageId, dayId]);

    useEffect(() => {
        if(photos.length > 0 && photoId) {
            setCurrentPhoto(selectPhoto(photoId));
        }
    }, [photos, photoId]);

    useEffect(() => {
        if(currentPhoto) {
            setNextPhoto(selectPhoto(currentPhoto.id - 1));
            setPrevPhoto(selectPhoto(currentPhoto.id + 1));
        }
    }, [currentPhoto])
    
    return (
        <>
            {!currentPhoto ? (
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
                            src={`${import.meta.env.VITE_BACKEND_API_URL}${currentPhoto.photo_url}`}
                            alt={`photo-${currentPhoto.id}`}
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