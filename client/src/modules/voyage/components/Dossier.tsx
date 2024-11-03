import { useState } from "react";
import { DossierType } from "../typeScript/VoyageType";
import ContenuDossier from "./ContenuDossier";
import iconV from "../../../assets/images/iconV.png";

interface DossierProps {
    dossiers: DossierType[];
}

interface ImageType {
    src: string;
    alt: string;
}

export default function Dossier({ dossiers }: DossierProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dossiers.map((dossier) => {
                const [nom, setNom] = useState(dossier.nom);
                const [enEdition, setEnEdition] = useState(false);
                const [ouvert, setOuvert] = useState(false);
                const [images, setImages] = useState<ImageType[]>(dossier.images);

                const renommerDossier = (e: React.FocusEvent<HTMLInputElement>) => {
                    setNom(e.target.value);
                    setEnEdition(false);
                };

                const ouvrirDossier = () => setOuvert(true);
                const fermerDossier = () => setOuvert(false);

                const ajouterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files) {
                        const newImages = Array.from(files).map((file) => ({
                            src: URL.createObjectURL(file),
                            alt: file.name,
                        }));
                        setImages((prevImages) => [...prevImages, ...newImages]);
                    }
                };

                return (
                    <div key={dossier.id} className="flex flex-col items-center cursor-pointer">
                        {/* Icône du dossier pour l'ouverture */}
                        <div onClick={ouvrirDossier}>
                            <img src={iconV} alt="Dossier" className="w-24 h-24" />
                        </div>

                        {/* Nom du dossier en dessous, double-clic pour renommer */}
                        {enEdition ? (
                            <input
                                type="text"
                                defaultValue={nom}
                                onBlur={renommerDossier}
                                autoFocus
                                className="mt-1 p-1 border text-center rounded text-sm"
                            />
                        ) : (
                            <p
                                className="mt-1 text-sm text-center"
                                onDoubleClick={() => setEnEdition(true)}
                            >
                                {nom}
                            </p>
                        )}

                        {/* Affichage du contenu du dossier lorsque ouvert */}
                        {ouvert && (
                            <ContenuDossier
                                nom={nom}
                                images={images}
                                fermerDossier={fermerDossier}
                                ajouterImage={ajouterImage}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
