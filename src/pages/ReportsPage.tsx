import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Eye, 
  Share2, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'Monthly Revenue Report',
      description: 'Comprehensive analysis of revenue trends and performance metrics',
      category: 'Financial',
      status: 'completed',
      createdAt: '2024-01-15',
      size: '2.4 MB',
      format: 'PDF',
      downloads: 45
    },
    {
      id: 2,
      title: 'User Engagement Analytics',
      description: 'Detailed insights into user behavior and engagement patterns',
      category: 'Analytics',
      status: 'completed',
      createdAt: '2024-01-14',
      size: '1.8 MB',
      format: 'Excel',
      downloads: 32
    },
    {
      id: 3,
      title: 'Q4 Performance Summary',
      description: 'Quarterly performance review with key metrics and insights',
      category: 'Performance',
      status: 'processing',
      createdAt: '2024-01-13',
      size: '3.1 MB',
      format: 'PDF',
      downloads: 0
    },
    {
      id: 4,
      title: 'Marketing Campaign Results',
      description: 'Analysis of recent marketing campaigns and their effectiveness',
      category: 'Marketing',
      status: 'completed',
      createdAt: '2024-01-12',
      size: '1.5 MB',
      format: 'PowerPoint',
      downloads: 28
    },
    {
      id: 5,
      title: 'Customer Satisfaction Survey',
      description: 'Results and analysis from the latest customer satisfaction survey',
      category: 'Customer',
      status: 'failed',
      createdAt: '2024-01-11',
      size: '0 MB',
      format: 'PDF',
      downloads: 0
    },
    {
      id: 6,
      title: 'Weekly Traffic Report',
      description: 'Website traffic analysis with detailed breakdowns by source',
      category: 'Analytics',
      status: 'completed',
      createdAt: '2024-01-10',
      size: '900 KB',
      format: 'CSV',
      downloads: 67
    }
  ];

  const categories = ['all', 'Financial', 'Analytics', 'Performance', 'Marketing', 'Customer'];
  const statuses = ['all', 'completed', 'processing', 'failed'];

  const filteredReports = reports.filter(report => {
    const categoryMatch = selectedCategory === 'all' || report.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || report.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-mint-400" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-mint-400 bg-mint-500/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-pink-200 to-mint-200 bg-clip-text text-transparent">
              Reports
            </h1>
            <p className="text-gray-400 text-lg">
              Generate and manage your data reports
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-mint-500 text-white hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>New Report</span>
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Filters:</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-mint-400/50"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-mint-400/50"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20">
                  <FileText className="w-6 h-6 text-pink-400" />
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(report.status)}
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {report.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </span>
                  <span>{report.size}</span>
                  <span>{report.format}</span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-mint-500/20 text-mint-400">
                  {report.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {report.status === 'completed' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-white/10 hover:bg-mint-500/20 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-mint-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-white/10 hover:bg-yellow-500/20 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4 text-yellow-400" />
                      </motion.button>
                    </>
                  )}
                </div>
                
                {report.status === 'completed' && (
                  <div className="text-xs text-gray-500">
                    {report.downloads} downloads
                  </div>
                )}
              </div>

              {/* Progress bar for processing reports */}
              {report.status === 'processing' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Processing...</span>
                    <span className="text-xs text-yellow-400">65%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 2 }}
                      className="h-1 rounded-full bg-yellow-400"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-semibold text-white mb-2">No reports found</h3>
            <p className="text-gray-400 mb-6">
              No reports match your current filter criteria.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-4 py-2 rounded-lg bg-mint-500 text-white hover:bg-mint-600 transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;