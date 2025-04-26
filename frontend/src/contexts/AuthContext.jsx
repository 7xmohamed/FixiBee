import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import api from '../lib/api';

/**
 * @typedef {Object} AuthState
 * @property {Object|null} user - The authenticated user object
 * @property {boolean} loading - Loading state for auth operations
 * @property {string|null} error - Error message if auth operation fails
 * @property {boolean} isAuthenticated - Whether user is authenticated
 */

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - The authenticated user
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message
 * @property {boolean} isAuthenticated - Auth status
 * @property {(email: string, password: string) => Promise<void>} login - Login function
 * @property {() => Promise<void>} logout - Logout function
 * @property {(formData: FormData) => Promise<void>} register - Registration function
 */

const AuthContext = createContext(/** @type {AuthContextType|null} */(null));

// Token management utilities
const TOKEN_KEY = 'auth_token';
const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
const storeToken = token => localStorage.setItem(TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// Update authorization header
const setAuthHeader = token => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

/**
 * Authentication Provider Component
 * @param {{ children: React.ReactNode }} props
 */
export function AuthProvider({ children }) {
    const [state, setState] = useState({
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false
    });

    // Handle authentication state changes
    const updateAuthState = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    // Initialize auth state with retry mechanism
    useEffect(() => {
        let retryCount = 0;
        const MAX_RETRIES = 3;

        const initAuth = async () => {
            const token = getStoredToken();
            if (!token) {
                updateAuthState({ loading: false });
                return;
            }

            try {
                setAuthHeader(token);
                const { data: user } = await api.get('/user');
                updateAuthState({
                    user,
                    isAuthenticated: true,
                    loading: false,
                    error: null
                });
            } catch (err) {
                if (retryCount < MAX_RETRIES && err.response?.status === 503) {
                    retryCount++;
                    setTimeout(initAuth, 1000 * retryCount);
                    return;
                }

                removeToken();
                setAuthHeader(null);
                updateAuthState({
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                    error: 'Session expired'
                });
            }
        };

        initAuth();
    }, [updateAuthState]);

    // Authentication methods
    const login = async (email, password) => {
        try {
            updateAuthState({ loading: true, error: null });
            const { data } = await api.post('/login', { email, password });

            storeToken(data.access_token);
            setAuthHeader(data.access_token);

            updateAuthState({
                user: data.user,
                isAuthenticated: true,
                loading: false
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Authentication failed';
            updateAuthState({ error: errorMsg, loading: false });
            throw new Error(errorMsg);
        }
    };

    const logout = async () => {
        try {
            updateAuthState({ loading: true });
            await api.post('/logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            removeToken();
            setAuthHeader(null);
            updateAuthState({
                user: null,
                isAuthenticated: false,
                loading: false
            });
        }
    };

    const register = async (formData) => {
        try {
            updateAuthState({ loading: true, error: null });
            const { data } = await api.post('/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            storeToken(data.access_token);
            setAuthHeader(data.access_token);

            updateAuthState({
                user: data.user,
                isAuthenticated: true,
                loading: false
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed';
            updateAuthState({ error: errorMsg, loading: false });
            throw new Error(errorMsg);
        }
    };

    const contextValue = {
        ...state,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};