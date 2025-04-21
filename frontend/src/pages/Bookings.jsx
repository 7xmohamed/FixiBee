import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CalendarIcon, ClockIcon, CurrencyDollarIcon, UserIcon } from '@heroicons/react/24/outline';

function Bookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // TODO: Fetch bookings from API
        // For now, using mock data
        setBookings([
            {
                id: 1,
                service: 'Plumbing Repair',
                date: '2024-04-25',
                time: '10:00 AM',
                status: 'Upcoming',
                price: 75,
                professional: 'John Doe'
            },
            {
                id: 2,
                service: 'Electrical Installation',
                date: '2024-04-20',
                time: '02:30 PM',
                status: 'Completed',
                price: 120,
                professional: 'Jane Smith'
            }
        ]);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
                <p className="mt-1 text-sm text-gray-500">View and manage your service bookings.</p>

                <div className="mt-8">
                    {bookings.length === 0 ? (
                        <div className="bg-white shadow rounded-lg p-6">
                            <p className="text-gray-500 text-center">No bookings found.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white shadow rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium text-gray-900">{booking.service}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${booking.status === 'Upcoming'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="flex items-center">
                                                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-500">
                                                    {booking.date} at {booking.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-500">
                                                    {booking.professional}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-500">
                                                    ${booking.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Bookings; 