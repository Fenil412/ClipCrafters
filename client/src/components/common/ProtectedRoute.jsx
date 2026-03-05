import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../ui/Loader';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
