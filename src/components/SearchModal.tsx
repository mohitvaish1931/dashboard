import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Users, DollarSign, FileText } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Revenue analytics',
    'User engagement',
    'Monthly reports',
    'Dashboard settings'
  ]);

  const searchSuggestions = [
    { icon: TrendingUp, title: 'Revenue Trends', category: 'Analytics', description: 'View revenue growth patterns' },
    { icon: Users, title: 'User Analytics', category: 'Users', description: 'Analyze user behavior and engagement' },
    { icon: DollarSign, title: 'Financial Reports', category: 'Reports', description: 'Access financial data and insights' },
    { icon: FileText, title: 'Export Data', category: 'Tools', description: 'Export dashboard data to CSV/PDF' },
  ];

  const filteredSuggestions = searchSuggestions.filter(
    suggestion =>
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 3)]);
    }
    // Here you would implement actual search functionality
    console.log('Searching for:', query);
    onClose();
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
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
                {searchQuery ? (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Search Results</h3>
                    {filteredSuggestions.length > 0 ? (
                      <div className="space-y-2">
                        {filteredSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSearch(suggestion.title)}
                            className="w-full flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 text-left"
                          >
                            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 mr-3">
                              <suggestion.icon className="w-4 h-4 text-pink-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-medium">{suggestion.title}</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-mint-500/20 text-mint-400">
                                  {suggestion.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">{suggestion.description}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No results found for "{searchQuery}"</p>
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
                        {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleSearch(suggestion.title)}
                            className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                          >
                            <suggestion.icon className="w-4 h-4 text-pink-400 mr-2" />
                            <span className="text-sm text-white">{suggestion.title}</span>
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