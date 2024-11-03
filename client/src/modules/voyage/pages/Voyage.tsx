import Navbar from "../components/Navbar";
import Dossier from "../components/Dossier";
import { DossierType } from "../typeScript/VoyageType";

interface VoyageProps {
    dossiers: DossierType[];
    onAddDossier: (nouveauDossier: DossierType) => void;
}

export default function Voyage({ dossiers, onAddDossier }: VoyageProps) {
    return (
        <div className="relative min-h-screen p-4 bg-gray-100">
            <header>
                <Navbar />
            </header>

            <main className="mt-10">
                <Dossier dossiers={dossiers} onAddDossier={onAddDossier} />
            </main>
        </div>
    );
}
