import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy-load all pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProjectCreate = lazy(() => import('./pages/ProjectCreate'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const VideoEditor = lazy(() => import('./pages/VideoEditor'));
const SceneEditor = lazy(() => import('./pages/SceneEditor'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function SuspenseFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects/create" element={<ProtectedRoute><ProjectCreate /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/editor/:id" element={<ProtectedRoute><VideoEditor /></ProtectedRoute>} />
        <Route path="/scene/:id" element={<ProtectedRoute><SceneEditor /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <CustomCursor />
            <Toaster
              position="top-right"
              richColors
              expand={false}
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(14,14,26,0.95)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#f0eeff',
                  fontFamily: 'DM Sans, sans-serif',
                },
              }}
            />
            <Suspense fallback={<SuspenseFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
