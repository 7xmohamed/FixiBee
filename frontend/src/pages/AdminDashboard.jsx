import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserGroupIcon, CurrencyDollarIcon, ClipboardDocumentCheckIcon, UserIcon } from '@heroicons/react/24/outline';

function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProfessionals: 0,
        totalEarnings: 0,
        totalBookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);

    useEffect(() => {
        // TODO: Fetch admin dashboard data from API
        setStats({
            totalUsers: 150,
            totalProfessionals: 45,
            totalEarnings: 25000,
            totalBookings: 200
        });
        setLoading(false);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Welcome back, {user?.name}!</p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard icon={<UserIcon />} title="Total Users" value={stats.totalUsers} />
                    <StatsCard icon={<UserGroupIcon />} title="Total Professionals" value={stats.totalProfessionals} />
                    <StatsCard icon={<CurrencyDollarIcon />} title="Total Revenue" value={`$${stats.totalEarnings}`} />
                    <StatsCard icon={<ClipboardDocumentCheckIcon />} title="Total Bookings" value={stats.totalBookings} />
                </div>
            </div>
        </div>
    );
}

function StatsCard({ icon, title, value }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="h-6 w-6 text-gray-400">
                            {icon}
                        </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
