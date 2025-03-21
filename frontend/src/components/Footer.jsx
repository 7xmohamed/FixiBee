import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-sm text-gray-400">
                            FixeBee is your go-to platform for finding trusted home service professionals with ease. From plumbing and electrical work to cleaning and handyman services, we connect you with skilled experts ready to get the job done. Our mission is to make home maintenance simple, fast, and stress-free, ensuring quality service and customer satisfaction every step of the way.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="text-sm text-gray-400">
                            <li className="mb-2">
                                <a href="#home" className="hover:text-white">Home</a>
                            </li>
                            <li className="mb-2">
                                <a href="#services" className="hover:text-white">Services</a>
                            </li>
                            <li className="mb-2">
                                <a href="#about" className="hover:text-white">About</a>
                            </li>
                            <li className="mb-2">
                                <a href="#contact" className="hover:text-white">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="text-sm text-gray-400">
                            <li className="mb-2">Email: info@example.com</li>
                            <li className="mb-2">Phone: +1 234 567 890</li>
                            <li className="mb-2">Address: 123 Main St, City, Country</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                                <FaFacebook className="text-2xl" />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                                <FaTwitter className="text-2xl" />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;