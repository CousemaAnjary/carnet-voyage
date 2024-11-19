const TopBar = ({title}:{title:string}) =>  {
    return (
        <nav className="absolute w-full z-10 bg-white h-16 border-b 
                    flex justify-between items-center px-4 lg:px-8"
        >
            <h1 className="font-medium font-mono text-lg lg:text-xl">
                {title}
            </h1>
        </nav>
    )
}

export default TopBar