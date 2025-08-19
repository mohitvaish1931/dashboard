import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Calendar, BarChart, TrendingUp, X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: string;
  chartType: string;
  category: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, onFilterChange }) => {
  const [dateRange, setDateRange] = useState('7days');
  const [chartType, setChartType] = useState('all');
  const [category, setCategory] = useState('all');

  const handleFilterChange = () => {
    const filters: FilterState = {
      dateRange,
      chartType,
      category
    };
    onFilterChange(filters);
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [dateRange, chartType, category]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-gray-900/90 backdrop-blur-md border-r border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20">
                    <Filter className="w-5 h-5 text-pink-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Filters</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400/50 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Date Range Filter */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-4 h-4 text-mint-400" />
                  <h3 className="text-white font-medium">Date Range</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { value: '24hours', label: 'Last 24 Hours' },
                    { value: '7days', label: 'Last 7 Days' },
                    { value: '30days', label: 'Last 30 Days' },
                    { value: '90days', label: 'Last 90 Days' },
                    { value: '1year', label: 'Last Year' }
                  ].map((option) => (
                    <motion.label
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-mint-400/30 cursor-pointer transition-all duration-300"
                    >
                      <input
                        type="radio"
                        name="dateRange"
                        value={option.value}
                        checked={dateRange === option.value}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-4 h-4 text-mint-400 bg-transparent border-white/30 focus:ring-mint-400 focus:ring-2"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Chart Type Filter */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-white font-medium">Chart Type</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Charts' },
                    { value: 'line', label: 'Line Charts' },
                    { value: 'bar', label: 'Bar Charts' },
                    { value: 'pie', label: 'Pie Charts' },
                    { value: 'area', label: 'Area Charts' }
                  ].map((option) => (
                    <motion.label
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-400/30 cursor-pointer transition-all duration-300"
                    >
                      <input
                        type="radio"
                        name="chartType"
                        value={option.value}
                        checked={chartType === option.value}
                        onChange={(e) => setChartType(e.target.value)}
                        className="w-4 h-4 text-yellow-400 bg-transparent border-white/30 focus:ring-yellow-400 focus:ring-2"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-pink-400" />
                  <h3 className="text-white font-medium">Category</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Categories' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'marketing', label: 'Marketing' },
                    { value: 'users', label: 'Users' },
                    { value: 'revenue', label: 'Revenue' }
                  ].map((option) => (
                    <motion.label
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400/30 cursor-pointer transition-all duration-300"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={option.value}
                        checked={category === option.value}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-4 h-4 text-pink-400 bg-transparent border-white/30 focus:ring-pink-400 focus:ring-2"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-pink-500 to-mint-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                onClick={handleFilterChange}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;