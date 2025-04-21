import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaBriefcase } from 'react-icons/fa';

function SignUp() {
    const navigate = useNavigate();
    const { register, user, error: authError } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        address: '',
        phone: '',
        id_card_front: null,
        id_card_back: null
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewFront, setPreviewFront] = useState(null);
    const [previewBack, setPreviewBack] = useState(null);
    const [step, setStep] = useState(1); // Step 1: Choose role, Step 2: Fill details

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setError('Image size should not exceed 2MB');
                return;
            }

            setFormData(prev => ({
                ...prev,
                [name]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                if (name === 'id_card_front') {
                    setPreviewFront(reader.result);
                } else {
                    setPreviewBack(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            return setError('Passwords do not match');
        }

        if (!formData.role) {
            return setError('Please select your role');
        }

        if (formData.role === 'professional' && (!formData.id_card_front || !formData.id_card_back)) {
            return setError('Please upload both sides of your ID card');
        }

        try {
            setError('');
            setLoading(true);

            // Create FormData object to handle file uploads
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            await register(formDataToSend);
            // Navigation will be handled by the useEffect when user is set
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create an account');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({ ...prev, role }));
        setStep(2);
    };

    if (step === 1) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Join FixiBee
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Choose how you want to use FixiBee
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <button
                            onClick={() => handleRoleSelect('client')}
                            className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-blue-500 flex flex-col items-center"
                        >
                            <FaUser className="h-12 w-12 text-blue-500 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">Join as a Client</h3>
                            <p className="mt-2 text-sm text-gray-500 text-center">
                                Find and book services from skilled professionals
                            </p>
                        </button>

                        <button
                            onClick={() => handleRoleSelect('professional')}
                            className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-blue-500 flex flex-col items-center"
                        >
                            <FaBriefcase className="h-12 w-12 text-blue-500 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">Join as a Professional</h3>
                            <p className="mt-2 text-sm text-gray-500 text-center">
                                Offer your services and grow your business
                            </p>
                        </button>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Complete your {formData.role === 'professional' ? 'Professional' : 'Client'} Profile
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Fill in your details to get started
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {formData.role === 'professional' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID Card Front</label>
                                    <div className="mt-1 flex items-center">
                                        <input
                                            type="file"
                                            name="id_card_front"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            disabled={loading}
                                        />
                                    </div>
                                    {previewFront && (
                                        <div className="mt-2">
                                            <img src={previewFront} alt="ID Card Front Preview" className="h-32 w-auto object-cover rounded-md" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID Card Back</label>
                                    <div className="mt-1 flex items-center">
                                        <input
                                            type="file"
                                            name="id_card_back"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            disabled={loading}
                                        />
                                    </div>
                                    {previewBack && (
                                        <div className="mt-2">
                                            <img src={previewBack} alt="ID Card Back Preview" className="h-32 w-auto object-cover rounded-md" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            ← Back to role selection
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
