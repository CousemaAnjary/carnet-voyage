import Navbar from "../components/Navbar";
import BoutonAjouter from "../components/BoutonAjouter";
import Dossier, { DossierType } from "../components/Dossier";
import { useState } from "react";

export default function Voyage() {
    const [dossiers, setDossiers] = useState<DossierType[]>([]);

    const creerDossier = () => {
        const nouveauDossier: DossierType = { id: Date.now(), nom: "Nouveau Dossier", images: [] };
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
        </div>
    );
}
