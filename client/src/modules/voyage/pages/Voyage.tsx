import Navbar from "../components/Navbar";
import BoutonAjouter from "../components/BoutonAjouter";
import Dossier from "../components/Dossier";
import DossierModal from "../components/DossierModal";
import { useState } from "react";
import { DossierType } from "../typeScript/VoyageType";

export default function Voyage() {
    const [dossiers, setDossiers] = useState<DossierType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const creerDossier = () => {
        setIsModalOpen(true);
    };

    const handleSaveDossier = (dossierData: { nom: string; ville: string; pays: string; dateDebut: string }) => {
        const nouveauDossier: DossierType = {
            id: Date.now(),
            nom: dossierData.nom,
            ville: dossierData.ville,
            pays: dossierData.pays,
            dateDebut: dossierData.dateDebut,
            images: [],
        };
        setDossiers([...dossiers, nouveauDossier]);
    };

    return (
        <div className="relative min-h-screen p-4 bg-gray-100">
            <header>
                <Navbar />
            </header>

            <main className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                {dossiers.map((dossier) => (
                    <Dossier key={dossier.id} dossier={dossier} />
                ))}
            </main>

            <BoutonAjouter onClick={creerDossier} />

            {isModalOpen && (
                <DossierModal
                    onSave={handleSaveDossier}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
