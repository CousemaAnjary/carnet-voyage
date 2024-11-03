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

    const handleSaveDossier = (nouveauDossier: DossierType) => {
        setDossiers([...dossiers, nouveauDossier]);
        setIsModalOpen(false);
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

            <DossierModal
                open={isModalOpen}
                onSave={handleSaveDossier}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
