import { ImageType } from "./Dossier";

interface ImageProps {
    image: ImageType;
}

export default function Image({ image }: ImageProps) {
    return (
        <div className="relative">
            <img src={image.src} alt="Image du voyage" className="w-16 h-16 object-cover rounded" />
            <p className="text-xs mt-1">{image.description}</p>
        </div>
    );
}
