import { Video, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Video className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              <span className="text-xl font-display font-bold">ClipCrafters</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI-powered video editing platform that transforms your ideas into stunning videos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-light-primary dark:text-gray-400 dark:hover:text-dark-primary">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-light-primary dark:text-gray-400 dark:hover:text-dark-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-light-primary dark:text-gray-400 dark:hover:text-dark-primary">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/#features" className="text-gray-600 hover:text-light-primary dark:text-gray-400">Features</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-light-primary dark:text-gray-400">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-light-primary dark:text-gray-400">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-light-primary dark:text-gray-400">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 ClipCrafters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
