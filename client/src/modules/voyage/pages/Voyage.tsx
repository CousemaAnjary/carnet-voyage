import Navbar from "../components/Navbar";
import Dossier from "../components/Dossier";
import { useState } from "react";

import { DossierType } from "../typeScript/VoyageType";
import DossierModal from "../components/DossierModal";

export default function Voyage() {
    const [dossiers, setDossiers] = useState<DossierType[]>([])

    // Fonction pour ajouter un nouveau dossier à la liste
    const handleSaveDossier = (nouveauDossier: DossierType) => {
        setDossiers((prevDossiers) => [...prevDossiers, nouveauDossier]);
    }

    return (
        <div className="relative min-h-screen p-4 bg-gray-100">
            <header>
                <Navbar />
            </header>

            <main className="mt-10">
                <Dossier dossiers={dossiers} />
            </main>

            {/* Modal pour ajouter un nouveau dossier */}
            <DossierModal onSave={handleSaveDossier} />
        </div>
    )
}
