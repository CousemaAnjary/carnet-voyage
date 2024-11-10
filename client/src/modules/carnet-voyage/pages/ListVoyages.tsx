import Layout from "@/components/dashboad/Layout";
import { useEffect, useState } from "react";
import { getFoldersVoyage } from "../carnetVoyageService";
import { folderVoyageType } from "../carnetVoyageType";
import iconV from "../../../assets/images/iconV.png"
import { useNavigate } from "react-router-dom";
import VoyageFormModal from "../components/VoyageFormModal";

export default function ListVoyages() {
    const navigate = useNavigate()
    const [voyages, setVoyages] = useState<folderVoyageType[]|null>(null)

    // Rediriger vers la page de contenu du dossier
    const openTravel = (id:number) => {
        navigate(`/carnet-voyage-content/${id}`)
    }

    // Récupérer la liste des dossiers de voyage
    useEffect(() => {
        const fetchFoldersVoyage = async () => {
            try {
                const foldersVoyage = await getFoldersVoyage()
                setVoyages(foldersVoyage)

            } catch (error) {
                console.log("Erreur lors de la récupération des dossiers de voyage.", error);
            }
        }

        fetchFoldersVoyage();
    }, []);
    
    return (
        <Layout>
            {voyages ? (
                    <div className="flex flex-wrap mx-auto  mt-6">
                        {voyages.map((voyage) => (
                            <div key={voyage.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
                            <div className="flex flex-col  items-center cursor-pointer mt-10">
                                <div onClick={() => openTravel(voyage.id)} >
                                    <img src={iconV} alt="Dossier" className="w-24 h-24" />
                                </div>
                                <p className="mt-1 text-sm text-center">
                                    {voyage.name}
                                </p>
                            </div>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div className="">
                        Rien
                    </div>
                )
            }
            <VoyageFormModal/>
        </Layout>
    )
}