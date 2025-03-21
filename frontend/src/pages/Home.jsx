import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const Home = () => {
    const [location, setLocation] = useState('');

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    alert(`Your current location is Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to retrieve your location.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section id="hero" className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    Welcome to FixiBee
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                    Your trusted partner for home services.
                </p>

                {/* Location Form */}
                <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                    <form className="flex flex-col space-y-4">
                        <select
                            value={location}
                            onChange={handleLocationChange}
                            className="p-2 rounded-lg border border-gray-300"
                        >
                            <option value="">Select your city</option>
                            <option value="New York">New York</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="Chicago">Chicago</option>
                            <option value="Houston">Houston</option>
                            <option value="Phoenix">Phoenix</option>
                        </select>
                        <button
                            type="button"
                            onClick={getCurrentLocation}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Use My Current Location
                        </button>
                    </form>
                </div>

                <a href="#services" className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition duration-300">
                    <span>Explore Services</span>
                    <FaArrowDown className="text-lg" />
                </a>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Our Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Slide 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/images/service1.jpg" alt="Service 1" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-2xl font-semibold mt-4">Plumbing</h3>
                            <p className="text-gray-600 mt-2">
                                Expert plumbing services for your home. We fix leaks, install pipes, and more.
                            </p>
                            <a href="#plumbing" className="text-blue-500 hover:text-blue-600 flex items-center mt-4">
                                <span>Learn More</span>
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>

                        {/* Slide 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/images/service2.jpg" alt="Service 2" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-2xl font-semibold mt-4">Electrical</h3>
                            <p className="text-gray-600 mt-2">
                                Reliable electrical repairs and installations to keep your home safe.
                            </p>
                            <a href="#electrical" className="text-blue-500 hover:text-blue-600 flex items-center mt-4">
                                <span>Learn More</span>
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>

                        {/* Slide 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/images/service3.jpg" alt="Service 3" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-2xl font-semibold mt-4">Carpentry</h3>
                            <p className="text-gray-600 mt-2">
                                Custom carpentry solutions for your home, including furniture and repairs.
                            </p>
                            <a href="#carpentry" className="text-blue-500 hover:text-blue-600 flex items-center mt-4">
                                <span>Learn More</span>
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>

                        {/* Slide 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/images/service4.jpg" alt="Service 4" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-2xl font-semibold mt-4">Painting</h3>
                            <p className="text-gray-600 mt-2">
                                Professional painting services to refresh your home&apos;s interior and exterior.
                            </p>
                            <a href="#painting" className="text-blue-500 hover:text-blue-600 flex items-center mt-4">
                                <span>Learn More</span>
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>

                        {/* Slide 5 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/images/service5.jpg" alt="Service 5" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-2xl font-semibold mt-4">Cleaning</h3>
                            <p className="text-gray-600 mt-2">
                                Thorough cleaning services to keep your home spotless and hygienic.
                            </p>
                            <a href="#cleaning" className="text-blue-500 hover:text-blue-600 flex items-center mt-4">
                                <span>Learn More</span>
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>

                        {/* Slide 6 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/images/service6.jpg" alt="Service 6" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-2xl font-semibold mt-4">Gardening</h3>
                            <p className="text-gray-600 mt-2">
                                Beautiful garden designs and maintenance to enhance your outdoor space.
                            </p>
                            <a href="#gardening" className="text-blue-500 hover:text-blue-600 flex items-center mt-4">
                                <span>Learn More</span>
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;