import { ReactNode } from "react"

export const LayoutLabel = ({ children }: { children: ReactNode }) => {
    return(
        <label className="block mt-3 text-lg text-gray-700 text-center font-semibold sm:text-xl">
            {children}
        </label>
    )
}

export const Layout = ({ children }: { children: ReactNode }) => {
    return(
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-0 bg-gray-100">
                <div className="relative sm:max-w-md w-full">
                    <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl px-6 py-8 sm:py-10 bg-gray-100 shadow-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}