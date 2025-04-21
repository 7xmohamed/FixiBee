import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import ProDashboard from './ProDashboard';

function Dashboard() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    switch (user.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'professional':
            return <ProDashboard />;
        default:
            return <Navigate to="/" />;
    }
}

export default Dashboard;