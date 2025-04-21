import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Error parsing stored user:', err);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            // TODO: Replace with actual API call
            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: email,
                role: 'user'
            };
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (err) {
            setError(err.message || 'Failed to login');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);
            // TODO: Replace with actual API call
            setUser(null);
            localStorage.removeItem('user');
        } catch (err) {
            setError(err.message || 'Failed to logout');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            // TODO: Replace with actual API call
            const mockUser = {
                id: 1,
                name: userData.name,
                email: userData.email,
                role: 'user'
            };
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (err) {
            setError(err.message || 'Failed to register');
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