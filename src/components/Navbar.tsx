import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Search, Bell, Settings, User, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface NavbarProps {
  onSearchClick: () => void;
  onNotificationClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onNotificationClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { notifications } = useAppContext();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Reports', path: '/reports' },
    { name: 'Settings', path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 backdrop-blur-sm border border-pink-500/30">
              <BarChart3 className="w-6 h-6 text-pink-400" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-mint-400 bg-clip-text text-transparent">
              DataViz Pro
            </h1>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(item.path)}
                className={`transition-colors duration-300 relative group ${
                  isActive(item.path) 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-mint-400 transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onSearchClick}
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-300"
            >
              <Search className="w-5 h-5 text-gray-400 hover:text-pink-400 transition-colors" />
            </motion.button>

            {/* Notification Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNotificationClick}
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-mint-400/50 transition-all duration-300 relative"
            >
              <Bell className="w-5 h-5 text-gray-400 hover:text-mint-400 transition-colors" />
              {notifications.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-yellow-400 text-black text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}
                </span>
              )}
            </motion.button>

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/settings')}
              className={`p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-300 ${
                isActive('/settings') ? 'border-yellow-400/50' : ''
              }`}
            >
              <Settings className={`w-5 h-5 transition-colors ${
                isActive('/settings') ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
              }`} />
            </motion.button>

            {/* Profile Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/profile')}
              className={`w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-mint-500 p-0.5 ${
                isActive('/profile') ? 'ring-2 ring-pink-400/50' : ''
              }`}
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;