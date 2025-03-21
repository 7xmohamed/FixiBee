import { useState } from 'react';
import axios from 'axios';

const useAuthApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('/api/auth/login', credentials);
            setSuccess(true);
            return response.data; // Return the response data (e.g., user, token)
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err; // Re-throw the error for further handling
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('/api/auth/register', userData);
            setSuccess(true);
            return response.data; // Return the response data (e.g., user, token)
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err; // Re-throw the error for further handling
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, login, register };
};

export default useAuthApi;