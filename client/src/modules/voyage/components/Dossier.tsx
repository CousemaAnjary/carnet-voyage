import { useState } from "react";
import { DossierType } from "../typeScript/VoyageType";
import DossierItem from "./DossierItem";
import DossierModal from "./DossierModal";

interface DossierProps {
    dossiers: DossierType[];
    onAddDossier: (nouveauDossier: DossierType) => void;
}

export default function Dossier({ dossiers, onAddDossier }: DossierProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour ajouter un nouveau dossier
    const handleSaveDossier = (nouveauDossier: DossierType) => {
        onAddDossier(nouveauDossier);
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dossiers.map((dossier) => (
                    <DossierItem key={dossier.id} dossier={dossier} />
                ))}
            </div>

            {/* Bouton pour ouvrir la modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-600 transition"
            >
                Ajouter un dossier
            </button>

            {/* Modal pour ajouter un nouveau dossier */}
            {isModalOpen && (
                <DossierModal
                    open={isModalOpen}
                    onSave={handleSaveDossier}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
