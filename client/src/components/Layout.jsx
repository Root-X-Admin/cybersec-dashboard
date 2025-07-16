import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="flex bg-dark-bg text-text-primary min-h-screen font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="p-6 bg-dark-panel flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
