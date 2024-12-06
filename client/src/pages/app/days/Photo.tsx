import Error404 from "@/components/errors/Error404";
import { useAppSelector } from "@/features/stores/hook";
import { useLocation } from "react-router-dom";

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
                <div className="justify-items-center">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_API_URL}${photo.photo_url}`}
                        alt={`photo-${photo.id}`}
                    />
                </div>
            )}
        </>
    );
};

export default Photo;