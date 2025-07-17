import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function AnalystDashboard() {
    const [kpis, setKpis] = useState({});
    const [threats, setThreats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kpiRes = await axios.get('/data/kpis');
                const threatRes = await axios.get('/data/threats');

                setKpis(kpiRes.data);
                setThreats(
                    threatRes.data.map(t => ({
                        type: t.name,
                        count: Math.floor(Math.random() * 30 + 10),
                    }))
                );
            } catch (err) {
                console.error('Error fetching analyst dashboard data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-darkBlue text-white p-10 space-y-10">
            <h1 className="text-3xl font-bold mb-6">Analyst Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-5 rounded shadow">
                    <h2 className="text-lg font-semibold text-red-400">Threats Identified</h2>
                    <p className="text-3xl mt-2">{kpis.threats || threats.length}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded shadow">
                    <h2 className="text-lg font-semibold text-yellow-400">Suspicious IPs</h2>
                    <p className="text-3xl mt-2">{kpis.suspiciousIPs || Math.floor(threats.length * 1.2)}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded shadow">
                    <h2 className="text-lg font-semibold text-green-400">Open Investigations</h2>
                    <p className="text-3xl mt-2">{kpis.openInvestigations || Math.floor(threats.length / 2)}</p>
                </div>
            </div>

            {/* Bar Chart: Threat Types */}
            <div className="bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Threats by Type</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={threats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                        <XAxis dataKey="type" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#38bdf8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
