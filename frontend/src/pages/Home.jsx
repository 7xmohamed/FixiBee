import { FaMapMarkerAlt, FaSearch, FaTools, FaUserCheck, FaShieldAlt, FaClock, FaStar, FaQuoteRight, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPinIcon, MapIcon, ClockIcon, StarIcon, ShieldCheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

// Mock data - Replace with API calls later
const MOCK_DATA = {
    testimonials: [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Homeowner",
            content: "FixiBee made finding a reliable plumber so easy! The service was quick and professional.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            id: 2,
            name: "Mike Thompson",
            role: "Business Owner",
            content: "As a business owner, I need quick solutions. FixiBee delivers every time with quality professionals.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Apartment Resident",
            content: "The app is user-friendly and the service providers are top-notch. Highly recommended!",
            rating: 4,
            image: "https://randomuser.me/api/portraits/women/2.jpg"
        }
    ],
    features: [
        {
            id: 1,
            icon: <FaClock className="h-8 w-8 text-blue-500" />,
            title: "Quick Response",
            description: "Get connected with professionals within minutes"
        },
        {
            id: 2,
            icon: <FaUserCheck className="h-8 w-8 text-blue-500" />,
            title: "Verified Experts",
            description: "All service providers are thoroughly vetted"
        },
        {
            id: 3,
            icon: <FaShieldAlt className="h-8 w-8 text-blue-500" />,
            title: "Secure Booking",
            description: "Safe and secure payment processing"
        },
        {
            id: 4,
            icon: <FaTools className="h-8 w-8 text-blue-500" />,
            title: "Quality Service",
            description: "Guaranteed satisfaction with every booking"
        }
    ],
    popularServices: [
        {
            id: 1,
            title: "Plumbing Services",
            icon: "🔧",
            description: "Expert plumbing solutions for your home",
            price: "Starting at $50",
            category: "Home Services",
            rating: 4.8,
            reviews: 124
        },
        {
            id: 2,
            title: "Electrical Work",
            icon: "⚡",
            description: "Professional electrical repairs and installations",
            price: "Starting at $60",
            category: "Home Services",
            rating: 4.9,
            reviews: 98
        },
        {
            id: 3,
            title: "House Cleaning",
            icon: "🧹",
            description: "Thorough home cleaning services",
            price: "Starting at $40",
            category: "Cleaning",
            rating: 4.7,
            reviews: 156
        },
        {
            id: 4,
            title: "Appliance Repair",
            icon: "🔨",
            description: "Fast and reliable appliance fixes",
            price: "Starting at $45",
            category: "Home Services",
            rating: 4.6,
            reviews: 87
        }
    ],
    stats: [
        {
            id: 1,
            value: "10,000+",
            label: "Happy Customers"
        },
        {
            id: 2,
            value: "500+",
            label: "Verified Professionals"
        },
        {
            id: 3,
            value: "50+",
            label: "Service Categories"
        },
        {
            id: 4,
            value: "24/7",
            label: "Customer Support"
        }
    ],
    benefits: [
        "Verified and background-checked professionals",
        "Transparent pricing with no hidden fees",
        "Secure payment processing",
        "24/7 customer support",
        "Satisfaction guarantee",
        "Easy booking and scheduling"
    ]
};

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [address, setAddress] = useState('');
    const [data, setData] = useState(MOCK_DATA);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Example API calls (uncomment when ready)
                // const [testimonialsRes, featuresRes, servicesRes] = await Promise.all([
                //     axios.get('/api/testimonials'),
                //     axios.get('/api/features'),
                //     axios.get('/api/services/popular')
                // ]);

                // setData({
                //     testimonials: testimonialsRes.data,
                //     features: featuresRes.data,
                //     popularServices: servicesRes.data
                // });

                setLoading(false);
            } catch (err) {
                setError('Failed to load data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        localStorage.removeItem('userLocation');
    }, []);

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
        } catch (error) {
            console.error('Error getting location:', error);
            alert('Unable to get your location. Please try selecting from the map.');
            setShowMap(true);
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
        } catch (error) {
            console.error('Error confirming location:', error);
            alert('Error confirming location. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    // Fallback categories if API fails
    const fallbackCategories = [
        { id: 1, name: 'Plumbing', description: 'Expert plumbing services for your home and business' },
        { id: 2, name: 'Electrical', description: 'Professional electrical repairs and installations' },
        { id: 3, name: 'Cleaning', description: 'Top-quality cleaning services for any space' },
        { id: 4, name: 'Handyman', description: 'General repairs and maintenance solutions' }
    ];

    // Fallback services if API fails
    const fallbackServices = [
        { id: 1, name: 'Emergency Plumbing', description: '24/7 emergency plumbing services', price: 99 },
        { id: 2, name: 'Electrical Installation', description: 'Professional electrical installation services', price: 149 },
        { id: 3, name: 'Deep Cleaning', description: 'Thorough cleaning for your home or office', price: 199 }
    ];

    const displayCategories = categories.length > 0 ? categories : fallbackCategories;
    const displayServices = featuredServices.length > 0 ? featuredServices : fallbackServices;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-blue-800/50"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA0NGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                                Professional Home Services
                                <br />
                                <span className="text-blue-300">At Your Doorstep</span>
                            </h1>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                                Book trusted professionals for all your home service needs. Quality guaranteed with every booking.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <div className="text-2xl font-bold text-blue-300">10,000+</div>
                                    <div className="text-sm text-blue-100">Happy Customers</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <div className="text-2xl font-bold text-blue-300">500+</div>
                                    <div className="text-sm text-blue-100">Verified Professionals</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Location Selection */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                            <h3 className="text-2xl font-semibold mb-6 text-white">Where do you need service?</h3>

                            <div className="space-y-6">
                                {/* Current Location Button */}
                                <button
                                    onClick={getCurrentPosition}
                                    disabled={isLoading}
                                    className="w-full flex items-center space-x-4 p-4 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                            <FaMapMarkerAlt className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-medium text-white">
                                            {isLoading ? 'Detecting your location...' : 'Use my current location'}
                                        </p>
                                        <p className="text-sm text-blue-100">
                                            {isLoading ? 'Please wait...' : 'We\'ll find services near you'}
                                        </p>
                                    </div>
                                    {isLoading && (
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/20"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 bg-blue-700 text-sm text-blue-100">or</span>
                                    </div>
                                </div>

                                {/* Map Selection Button */}
                                <button
                                    onClick={() => setShowMap(true)}
                                    className="w-full flex items-center space-x-4 p-4 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                            <FaSearch className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-medium text-white">Choose on map</p>
                                        <p className="text-sm text-blue-100">Select your location manually</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Choose from our wide range of professional home services
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.popularServices.map((service) => (
                            <div key={service.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="object-cover w-full h-48"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                                        <span className="text-2xl">{service.icon}</span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-blue-600 font-semibold">{service.price}</p>
                                        <div className="flex items-center">
                                            <FaStar className="h-5 w-5 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">{service.rating}</span>
                                            <span className="text-sm text-gray-400 ml-1">({service.reviews})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're committed to providing the best service experience
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.features.map((feature) => (
                            <div key={feature.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                    {feature.icon}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Modal */}
            {showMap && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-semibold text-gray-900">Select Your Location</h3>
                            <p className="text-gray-600 mt-2">Click on the map to choose your location</p>
                        </div>
                        <div className="h-96">
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
                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowMap(false)}
                                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLocation}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Confirm Location
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">FixiBee</h3>
                            <p className="text-gray-400 text-sm">
                                Professional home services at your fingertips. Quality guaranteed with every booking.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Services</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Services</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Plumbing</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Electrical</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Cleaning</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm">Handyman</a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-400 text-sm">
                                    <MapPinIcon className="h-5 w-5 mr-2" />
                                    <span>Fes, Morocco</span>
                                </li>
                                <li className="flex items-center text-gray-400 text-sm">
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>contact@fixibee.com</span>
                                </li>
                                <li className="flex items-center text-gray-400 text-sm">
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+212 6XX-XXXXXX</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-8 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} FixiBee. All rights reserved.
                            </p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
