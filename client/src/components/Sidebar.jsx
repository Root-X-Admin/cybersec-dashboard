export default function Sidebar() {
    return (
        <aside className="w-64 bg-dark-panel p-4 border-r border-gray-700">
            <h1 className="text-xl font-bold text-accent mb-8">CyberDash</h1>
            <nav className="space-y-4">
                <a href="#" className="block hover:text-accent">Dashboard</a>
                <a href="#" className="block hover:text-accent">Threat Reports</a>
                <a href="#" className="block hover:text-accent">Alerts</a>
                <a href="#" className="block hover:text-accent">Users</a>
                <a href="#" className="block hover:text-accent">Settings</a>
            </nav>
        </aside>
    );
}
