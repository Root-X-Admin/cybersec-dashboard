import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function AdminDashboard() {
    const [kpis, setKpis] = useState({});
    const [alertsTrend, setAlertsTrend] = useState([]);
    const [roleDistribution, setRoleDistribution] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kpiRes = await axios.get('/data/kpis');
                const trendRes = await axios.get('/data/alerts/trend');
                const rolesRes = await axios.get('/data/users/roles');

                setKpis(kpiRes.data);
                setAlertsTrend(trendRes.data);
                setRoleDistribution(rolesRes.data);
            } catch (err) {
                console.error('Admin dashboard fetch error:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-darkBlue text-white p-10 space-y-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-5 rounded">
                    <h2 className="text-lg">Total Users</h2>
                    <p className="text-2xl">{kpis.totalUsers || 0}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded">
                    <h2 className="text-lg">Alerts Today</h2>
                    <p className="text-2xl">{kpis.alertsToday || 0}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded">
                    <h2 className="text-lg">System Health</h2>
                    <p className="text-2xl text-green-400">
                        {kpis.systemHealth || 'Good'}
                    </p>
                </div>
            </div>

            {/* Alerts Trend */}
            <div className="bg-gray-800 p-6 rounded">
                <h2 className="text-xl mb-4 text-cyan-400">Weekly Alerts</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={alertsTrend}>
                        <CartesianGrid stroke="#555" />
                        <XAxis dataKey="day" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="alerts"
                            stroke="#00bfff"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* User Role Distribution */}
            <div className="bg-gray-800 p-6 rounded">
                <h2 className="text-xl mb-4 text-purple-400">User Role Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={roleDistribution}
                            dataKey="count"
                            nameKey="role"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {roleDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
