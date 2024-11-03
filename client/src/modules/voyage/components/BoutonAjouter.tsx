import { FaPlus } from "react-icons/fa";

interface BoutonAjouterProps {
    onClick: () => void;
}

export default function BoutonAjouter({ onClick }: BoutonAjouterProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-600 transition"
        >
            <FaPlus size={24} />
        </button>
    );
}
