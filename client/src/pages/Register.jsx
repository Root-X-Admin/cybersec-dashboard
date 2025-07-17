import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'analyst' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", form);
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Error registering");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkBlue">
            <form onSubmit={handleSubmit} className="bg-dark p-6 rounded-lg w-full max-w-md space-y-4 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

                <input className="w-full p-2 rounded bg-darkBlue text-white" placeholder="Name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />

                <input className="w-full p-2 rounded bg-darkBlue text-white" placeholder="Email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />

                <input className="w-full p-2 rounded bg-darkBlue text-white" type="password" placeholder="Password"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />

                <select className="w-full p-2 rounded bg-darkBlue text-white"
                    value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                    <option value="soc_manager">SOC Manager</option>
                </select>

                <button className="w-full bg-accent py-2 rounded">Register</button>
            </form>
        </div>
    );
}
