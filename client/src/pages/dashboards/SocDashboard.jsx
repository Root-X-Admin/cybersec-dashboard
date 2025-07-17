import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function SocDashboard() {
    const [kpis, setKpis] = useState({});
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kpiRes = await axios.get('/data/kpis');
                const alertRes = await axios.get('/data/alerts');

                setKpis(kpiRes.data);
                setAlerts(alertRes.data);
            } catch (err) {
                console.error('Error fetching SOC dashboard data:', err);
            }
        };

        fetchData();
    }, []);

    const responseTimeData = [14, 18, 16, 20, 13, 22].map((t, i) => ({
        hour: `${i + 1}:00`,
        time: t,
    }));

    return (
        <div className="min-h-screen bg-darkBlue text-white p-10 space-y-10">
            <h1 className="text-3xl font-bold mb-6">SOC Manager Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-5 rounded shadow">
                    <h2 className="text-lg font-semibold text-yellow-400">Active Incidents</h2>
                    <p className="text-3xl mt-2">{kpis.activeIncidents || 0}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded shadow">
                    <h2 className="text-lg font-semibold text-green-400">Resolved Cases</h2>
                    <p className="text-3xl mt-2">{Math.floor((kpis.alertsToday || 0) * 1.5)}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded shadow">
                    <h2 className="text-lg font-semibold text-blue-400">Avg. Response Time</h2>
                    <p className="text-3xl mt-2">{kpis.avgResponseTime || '--'}</p>
                </div>
            </div>

            {/* Area Chart */}
            <div className="bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-purple-400">Incident Response Time (last 6 hours)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={responseTimeData}>
                        <defs>
                            <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="hour" stroke="#ccc" />
                        <YAxis stroke="#ccc" unit="m" />
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <Tooltip />
                        <Area type="monotone" dataKey="time" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTime)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Live Alerts Table */}
            <div className="bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-red-400">Live Alerts Feed</h2>
                <ul className="space-y-3">
                    {alerts.map((alert, i) => (
                        <li
                            key={i}
                            className={`p-4 rounded bg-gray-700 border-l-4 ${alert.severity === 'Critical'
                                    ? 'border-red-600'
                                    : alert.severity === 'High'
                                        ? 'border-yellow-500'
                                        : 'border-green-400'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>{alert.message || `${alert.type} from ${alert.source}`}</span>
                                <span className="text-sm font-semibold text-gray-300">{alert.severity}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
