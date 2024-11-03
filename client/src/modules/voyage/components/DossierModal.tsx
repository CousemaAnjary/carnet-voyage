import { useState } from "react";

interface DossierModalProps {
    onSave: (dossierData: { nom: string; ville: string; pays: string; dateDebut: string }) => void;
    onClose: () => void;
}

export default function DossierModal({ onSave, onClose }: DossierModalProps) {
    const [nom, setNom] = useState("");
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [dateDebut, setDateDebut] = useState("");

    const handleSubmit = () => {
        onSave({ nom, ville, pays, dateDebut });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4">Créer un Nouveau Dossier</h2>
                <input
                    type="text"
                    placeholder="Nom du dossier"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Pays"
                    value={pays}
                    onChange={(e) => setPays(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="date"
                    placeholder="Date de début"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Annuler
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}
