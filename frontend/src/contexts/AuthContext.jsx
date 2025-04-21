import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await api.get('/user');
                    setUser(response.data);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/login', { email, password });
            const { user, access_token } = response.data;

            // Store token and user data
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // Set authorization header
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            setUser(user);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);

            await api.post('/logout');

            // Clear storage and headers
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common['Authorization'];

            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to logout');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { access_token, user } = response.data;

            // Store token and user data
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // Set authorization header
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            setUser(user);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}