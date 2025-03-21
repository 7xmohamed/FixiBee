import { FaHome, FaServicestack, FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <>
            <nav className="bg-gray-800 text-white w-full font-sans">
                {/* Desktop and Tablet Navigation */}
                <div className="hidden sm:flex justify-between items-center p-2 w-full max-w-7xl mx-auto">
                    {/* Logo on the left */}
                    <div className="flex items-center">
                        <img src="/images/bee.png" alt="Logo" className="h-14" /> {/* Adjusted logo size */}
                    </div>

                    {/* Links on the right */}
                    <div className="flex space-x-6 items-center">
                        <a href="#home" className="hover:text-gray-300 text-md font-medium transition duration-300">
                            About
                        </a>
                        <a href="#services" className="hover:text-gray-300 text-md font-medium transition duration-300">
                            Services
                        </a>
                        <button className="bg-white-500 hover:bg-blue-600 text-white text-md font-medium px-5 py-1.5 rounded-lg transition duration-300">
                            Login
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around items-center p-2">
                    <a href="#home" className="flex flex-col items-center text-xs hover:text-gray-300 transition duration-300">
                        <FaHome className="text-xl" />
                        <span className="mt-1">Home</span>
                    </a>
                    <a href="#services" className="flex flex-col items-center text-xs hover:text-gray-300 transition duration-300">
                        <FaServicestack className="text-xl" />
                        <span className="mt-1">Services</span>
                    </a>
                    <a href="#profile" className="flex flex-col items-center text-xs hover:text-gray-300 transition duration-300">
                        <FaUser className="text-xl" />
                        <span className="mt-1">Profile</span>
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;