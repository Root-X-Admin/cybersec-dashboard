export default function Navbar() {
    return (
        <header className="bg-dark-bg p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm">SOC Analyst</span>
                <div className="w-8 h-8 rounded-full bg-accent-light"></div>
            </div>
        </header>
    );
}
