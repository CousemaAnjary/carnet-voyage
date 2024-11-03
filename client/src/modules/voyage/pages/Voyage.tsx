import Navbar from "../components/Navbar";
import Dossier from "../components/Dossier";
import DossierModal from "../components/DossierModal";
import { useState } from "react";
import { DossierType } from "../typeScript/VoyageType";

export default function Voyage() {
    const [dossiers, setDossiers] = useState<DossierType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour ajouter un nouveau dossier
    const handleSaveDossier = (nouveauDossier: DossierType) => {
        setDossiers((prevDossiers) => [...prevDossiers, nouveauDossier]);
        setIsModalOpen(false);
    };

    return (
        <div className="relative min-h-screen p-4 bg-gray-100">
            <header>
                <Navbar />
            </header>

            <main className="mt-10">
                <Dossier dossiers={dossiers} />
            </main>

            {/* Bouton et modal pour ajouter un dossier */}
            <DossierModal open={isModalOpen} onSave={handleSaveDossier} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
