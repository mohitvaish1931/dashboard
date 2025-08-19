import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Users, DollarSign, FileText, BarChart, Settings, User } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const searchData = [
    { id: '1', icon: BarChart, title: 'Dashboard', category: 'Navigation', description: 'Main dashboard overview', url: '/' },
    { id: '2', icon: TrendingUp, title: 'Analytics', category: 'Navigation', description: 'Deep dive analytics', url: '/analytics' },
    { id: '3', icon: FileText, title: 'Reports', category: 'Navigation', description: 'Generate and view reports', url: '/reports' },
    { id: '4', icon: Settings, title: 'Settings', category: 'Navigation', description: 'App settings and preferences', url: '/settings' },
    { id: '5', icon: User, title: 'Profile', category: 'Navigation', description: 'User profile management', url: '/profile' },
    { id: '6', icon: Users, title: 'User Analytics', category: 'Analytics', description: 'Analyze user behavior and engagement', url: '/analytics' },
    { id: '7', icon: DollarSign, title: 'Revenue Trends', category: 'Analytics', description: 'View revenue growth patterns', url: '/analytics' },
    { id: '8', icon: FileText, title: 'Monthly Reports', category: 'Reports', description: 'Access monthly performance reports', url: '/reports' },
    { id: '9', icon: TrendingUp, title: 'Performance Metrics', category: 'Analytics', description: 'Track key performance indicators', url: '/analytics' },
  ];

  const { query, setQuery, results, recentSearches, addToRecentSearches } = useSearch(searchData);

  const handleSearch = (searchTerm: string, url?: string) => {
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm);
      if (url) {
        navigate(url);
      }
    }
    onClose();
  };

  const handleResultClick = (result: typeof searchData[0]) => {
    handleSearch(result.title, result.url);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <div className="bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center p-4 border-b border-white/10">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search dashboard, analytics, reports..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {query ? (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Search Results</h3>
                    {results.length > 0 ? (
                      <div className="space-y-2">
                        {results.map((result, index) => (
                          <motion.button
                            key={result.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleResultClick(result)}
                            className="w-full flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 text-left"
                          >
                            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 mr-3">
                              <result.icon className="w-4 h-4 text-pink-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-medium">{result.title}</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-mint-500/20 text-mint-400">
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">{result.description}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No results found for "{query}"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    {/* Recent Searches */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSearch(search)}
                            className="w-full flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                          >
                            <Clock className="w-4 h-4 text-gray-500 mr-3" />
                            <span className="text-gray-300">{search}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {searchData.slice(0, 4).map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleResultClick(item)}
                            className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                          >
                            <item.icon className="w-4 h-4 text-pink-400 mr-2" />
                            <span className="text-sm text-white">{item.title}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Press Enter to search</span>
                  <span>ESC to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;