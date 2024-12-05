import CreateVoyageDialog from "./components/CreateVoyageDialog"
import VoyageCard from "./components/VoyageCard"
import Layout from "../Layout"
import { useAppDispatch, useAppSelector } from "@/features/stores/hook"
import { APP_NAME } from "@/App"
import { fetchVoyages } from "@/features/stores/voyageSlice"
import { useEffect } from "react"

const Home = () => {
    const dispatch = useAppDispatch()
    const { voyages, loading, error } = useAppSelector((state) => state.voyages)

    useEffect(() => {
        dispatch(fetchVoyages())
    }, [dispatch])

    const reversedVoyages = [...voyages].reverse()

    return (
        <Layout label={APP_NAME}>
            <div className="h-[90vh] w-full overflow-y-auto justify-items-center">
                {loading && <div className="text-center">Chargement des voyages...</div>}
                {error && <div className="text-center text-red-500">Erreur: {error}</div>}
                {!loading && !error && (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4">
                        {reversedVoyages.map((voyage) => (
                            <div key={voyage.id} className="mb-5">
                                <VoyageCard voyage={voyage} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <CreateVoyageDialog />
        </Layout>
    )
}

export default Home