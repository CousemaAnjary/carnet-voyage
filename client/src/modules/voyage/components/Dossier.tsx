import { DossierType } from "../typeScript/VoyageType";
import DossierItem from "./DossierItem";


interface DossierProps {
    dossiers: DossierType[];
}

export default function Dossier({ dossiers }: DossierProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dossiers.map((dossier) => (
                <DossierItem key={dossier.id} dossier={dossier} />
            ))}
        </div>
    );
}
