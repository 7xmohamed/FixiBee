import { FaServicestack, FaUser, FaSignOutAlt, FaClipboardList, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <>
            <nav className="bg-gray-800 text-white w-full font-sans">
                {/* Desktop and Tablet Navigation */}
                <div className="hidden sm:flex justify-between items-center p-2 w-full max-w-7xl mx-auto">
                    {/* Logo on the left */}
                    <div className="flex items-center cursor-pointer">
                        <Link to="/" className="text-2xl font-semibold">FixiBee</Link>
                    </div>

                    {/* Links on the right */}
                    <div className="flex space-x-6 items-center">
                        <Link to="#services" className="hover:text-gray-300 text-md font-medium transition duration-300 cursor-pointer">
                            Services
                        </Link>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 hover:text-gray-300 focus:outline-none"
                                >
                                    <FaUser className="text-xl" />
                                    <span className="text-sm">{user.name}</span>
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <FaUser className="mr-2" /> Profile
                                        </Link>
                                        {user.role !== 'client' && (
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <FaClipboardList className="mr-2" /> Dashboard
                                            </Link>
                                        )}
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <FaCog className="mr-2" /> Settings
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white-500 hover:bg-blue-600 text-white text-md font-medium px-5 py-1.5 rounded-lg transition duration-300 cursor-pointer">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation - Fixed to bottom with z-index to stay on top */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around items-center p-2 z-50">
                    <Link to="#services" className="flex flex-col items-center text-xs hover:text-gray-300 transition duration-300 cursor-pointer">
                        <FaServicestack className="text-xl" />
                        <span className="mt-1">Services</span>
                    </Link>
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex flex-col items-center text-xs hover:text-gray-300 transition duration-300 cursor-pointer"
                            >
                                <FaUser className="text-xl" />
                                <span className="mt-1">Profile</span>
                            </button>
                            {showDropdown && (
                                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FaUser className="mr-2" /> Profile
                                    </Link>
                                    {user.role !== 'client' && (
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <FaClipboardList className="mr-2" /> Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FaCog className="mr-2" /> Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex flex-col items-center text-xs hover:text-gray-300 transition duration-300 cursor-pointer">
                            <FaUser className="text-xl" />
                            <span className="mt-1">Login</span>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;