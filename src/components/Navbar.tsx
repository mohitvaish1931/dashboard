import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Search, Bell, Settings, User } from 'lucide-react';

const Navbar: React.FC = () => {
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
            className="flex items-center space-x-3"
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 backdrop-blur-sm border border-pink-500/30">
              <BarChart3 className="w-6 h-6 text-pink-400" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-mint-400 bg-clip-text text-transparent">
              DataViz Pro
            </h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Dashboard', 'Analytics', 'Reports', 'Settings'].map((item, index) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-mint-400 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-300"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-mint-400/50 transition-all duration-300 relative"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-300"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-mint-500 p-0.5"
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;