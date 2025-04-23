import { BrowserRouter as Router, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import {router} from './router/index.jsx';

// Protected Route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <RouterProvider router={router}  />
  );
}

export default App;
