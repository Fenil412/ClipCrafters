import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Video, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Video className="w-8 h-8 text-light-primary dark:text-dark-primary" />
            <span className="text-xl font-display font-bold">ClipCrafters</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Home
            </Link>
            <Link to="/#features" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">
              Features
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                Login
              </Link>
            )}
            <ThemeToggle />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block hover:text-light-primary dark:hover:text-dark-primary">
              Home
            </Link>
            <Link to="/#features" className="block hover:text-light-primary dark:hover:text-dark-primary">
              Features
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block hover:text-light-primary dark:hover:text-dark-primary">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full text-left hover:text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block hover:text-light-primary dark:hover:text-dark-primary">
                Login
              </Link>
            )}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
