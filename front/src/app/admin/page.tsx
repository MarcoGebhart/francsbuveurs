export default function Admin() {
    return (
        <div className="flex flex-col items-center bg-white text-black m-10 gap-4">
            <h1 className="text-2xl">BackOffice Admin</h1>
            <div className=" flex flex-col gap-4">
                <nav className="flex gap-4">
                    <button className="border border-orange-500 rounded-full p-2">EVENEMENTS</button>
                    <button className="border border-orange-500 rounded-full p-2">BOISSONS</button>
                    <button className="border border-orange-500 rounded-full p-2">SNACK</button>
                </nav>
                <div>
                    
                </div>
            </div>
        </div>
    )
}