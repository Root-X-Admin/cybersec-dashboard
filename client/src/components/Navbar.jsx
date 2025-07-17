import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-darkBlue p-4 text-white flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">🔐 CyberDash</h1>

            <div className="flex items-center space-x-4">
                {user && (
                    <>
                        <span className="text-sm">Hi, {user.name}</span>
                        {user.role === 'admin' && <Link to="/admin">Admin</Link>}
                        {user.role === 'analyst' && <Link to="/analyst">Analyst</Link>}
                        {user.role === 'soc_manager' && <Link to="/soc">SOC</Link>}
                        <button onClick={handleLogout} className="bg-accent px-3 py-1 rounded text-black">Logout</button>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
