import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            login(res.data);

            // Redirect based on role
            const role = res.data.user.role;
            if (role === 'admin') navigate('/admin');
            else if (role === 'analyst') navigate('/analyst');
            else navigate('/soc');

        } catch (err) {
            alert(err.response?.data?.message || "Login error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkBlue">
            <form onSubmit={handleSubmit} className="bg-dark p-6 rounded-lg w-full max-w-md space-y-4 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

                <input className="w-full p-2 rounded bg-darkBlue text-white" placeholder="Email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />

                <input className="w-full p-2 rounded bg-darkBlue text-white" type="password" placeholder="Password"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />

                <button className="w-full bg-accent py-2 rounded">Login</button>
            </form>
        </div>
    );
}
