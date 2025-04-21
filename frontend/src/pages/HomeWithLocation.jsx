import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPinIcon, StarIcon, ClockIcon, CurrencyDollarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position ? (
        <Marker position={position} />
    ) : null;
}

function HomeWithLocation() {
    const { country, lang, city } = useParams();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [location, setLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const [position, setPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Get location from localStorage
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
            const locationData = JSON.parse(savedLocation);
            setLocation(locationData);
        }

        // Fetch services and categories
        const fetchData = async () => {
            try {
                setLoading(true);
                const [servicesRes, categoriesRes] = await Promise.all([
                    axios.get('/api/services'),
                    axios.get('/api/categories')
                ]);

                // Ensure we have arrays for both services and categories
                const servicesData = Array.isArray(servicesRes.data)
                    ? servicesRes.data
                    : servicesRes.data.data || [];

                const categoriesData = Array.isArray(categoriesRes.data)
                    ? categoriesRes.data
                    : categoriesRes.data.data || [];

                setServices(servicesData);
                setCategories(categoriesData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load services. Please try again later.');

                // Set fallback data if API fails
                setCategories([
                    { id: 1, name: 'Plumbing' },
                    { id: 2, name: 'Electrical' },
                    { id: 3, name: 'Cleaning' },
                    { id: 4, name: 'Handyman' }
                ]);

                setServices([
                    {
                        id: 1,
                        name: 'Emergency Plumbing',
                        description: '24/7 emergency plumbing services',
                        rating: 4.5,
                        duration: '30 min',
                        price: 'Starting at $50',
                        category_id: 1
                    },
                    {
                        id: 2,
                        name: 'Electrical Installation',
                        description: 'Professional electrical installation services',
                        rating: 4.8,
                        duration: '1 hour',
                        price: 'Starting at $75',
                        category_id: 2
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [country, lang, city]);

    const handleChangeLocation = () => {
        navigate('/');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (value) => {
        setSortBy(value);
    };

    const filteredServices = services
        .filter(service => {
            const matchesCategory = selectedCategory === 'all' || service.category_id === selectedCategory;
            const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'price':
                    return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
                case 'duration':
                    return a.duration.localeCompare(b.duration);
                default:
                    return 0;
            }
        });

    const getCurrentPosition = async () => {
        setIsLoading(true);
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            const newPosition = { lat: latitude, lng: longitude };
            setPosition(newPosition);

            // Get address using reverse geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            const locationData = {
                country: data.address.country || 'Unknown',
                lang: 'en',
                city: data.address.city || data.address.town || data.address.village || 'Unknown',
                coordinates: newPosition
            };

            localStorage.setItem('userLocation', JSON.stringify(locationData));
            navigate(`/${locationData.country}/${locationData.lang}/${locationData.city}`);
            setShowLocationSelector(false);
        } catch (error) {
            console.error('Error getting location:', error);
            alert('Unable to get your location. Please try selecting from the map.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setAddress(data.display_name);
        } catch (error) {
            console.error('Error getting address:', error);
        }
    };

    const confirmLocation = async () => {
        if (!position) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
            );
            const data = await response.json();

            const locationData = {
                country: data.address.country || 'Unknown',
                lang: 'en',
                city: data.address.city || data.address.town || data.address.village || 'Unknown',
                coordinates: position
            };

            localStorage.setItem('userLocation', JSON.stringify(locationData));
            navigate(`/${locationData.country}/${locationData.lang}/${locationData.city}`);
            setShowLocationSelector(false);
        } catch (error) {
            console.error('Error confirming location:', error);
            alert('Error confirming location. Please try again.');
        }
    };

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
            {/* Header with Location */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-gray-900 font-medium">
                                {location ? `Services in ${location.city}, ${location.country.toUpperCase()}` : 'Select your location'}
                            </span>
                        </div>
                        <button
                            onClick={() => setShowLocationSelector(true)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Change location
                        </button>
                    </div>
                </div>
            </div>

            {/* Location Selector Modal */}
            {showLocationSelector && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">Select Your Location</h3>
                            <p className="text-sm text-gray-600 mt-1">Choose how you want to select your location</p>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Current Location Button */}
                            <button
                                onClick={getCurrentPosition}
                                disabled={isLoading}
                                className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300 group"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                        <FaMapMarkerAlt className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {isLoading ? 'Detecting your location...' : 'Use my current location'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {isLoading ? 'Please wait...' : 'We\'ll find services near you'}
                                    </p>
                                </div>
                                {isLoading && (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600"></div>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-2 bg-white text-xs text-gray-500">or</span>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="h-64 sm:h-72 rounded-lg overflow-hidden">
                                <MapContainer
                                    center={[34.0333, -5.0000]}
                                    zoom={12}
                                    style={{ height: '100%', width: '100%' }}
                                    onClick={handleMapClick}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <LocationMarker position={position} setPosition={setPosition} />
                                </MapContainer>
                            </div>

                            {position && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600">Selected location:</p>
                                    <p className="text-sm font-medium text-gray-900 truncate">{address || 'Click on the map to select a location'}</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowLocationSelector(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLocation}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Confirm Location
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="rating">Sort by Rating</option>
                            <option value="price">Sort by Price</option>
                            <option value="duration">Sort by Duration</option>
                        </select>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        All Services
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === category.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                                    <div className="flex items-center">
                                        <StarIcon className="h-5 w-5 text-yellow-400" />
                                        <span className="ml-1 text-sm text-gray-600">{service.rating || '4.5'}</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">{service.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <ClockIcon className="h-4 w-4 mr-1" />
                                        <span>{service.duration || '30 min'}</span>
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-900">
                                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                        <span>{service.price || 'Starting at $50'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeWithLocation; 