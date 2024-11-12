export default function Navbar() {
    return (
        <>
            <nav className="container-fluid relative z-10 bg-white h-16 border-b flex justify-between items-center px-4 lg:px-8">
                {/* Logo */}
                <div className="logo">
                    <h1 className="font-medium font-mono text-lg lg:text-xl">
                        Carnet de voyage
                    </h1>
                </div>

                {/* User Menu */}
                <div className="flex justify-end items-center space-x-3">
                </div>
            </nav>
        </>
    )
}