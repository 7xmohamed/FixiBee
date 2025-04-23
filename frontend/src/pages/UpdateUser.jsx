import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';

function Profile() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        address: '',
        phone: '',
        profile_picture: null,
    });

    const [preview, setPreview] = useState(null); // For image preview
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || '',
                address: user.address || '',
                phone: user.phone || '',
                profile_picture: null,
            });
            setLoading(false);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile_picture: file });
        setPreview(file ? URL.createObjectURL(file) : null); // Set preview URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await api.put('/updateprofile', formDataToSend);

            setSuccess('Profile updated successfully.');
            console.log('Updated user:', response.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full bg-white p-8 shadow rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>

                {error && <div className="mb-4 text-red-600">{error}</div>}
                {success && <div className="mb-4 text-green-600">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            name="profile_picture"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="mt-4 w-24 h-24 rounded-full object-cover"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role
                            <span> : {formData.role}</span>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
