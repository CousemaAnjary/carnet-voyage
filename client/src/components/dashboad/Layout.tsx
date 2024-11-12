import Navbar from "./Nabar"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="relative min-h-screen p-4 bg-gray-100">
                <Navbar />

                <main >
                    {children}
                </main>             
            </div>
        </>
    )
}