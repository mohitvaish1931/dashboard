import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

interface DataTableProps {
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }>;
  delay?: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, delay = 0 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Data Overview</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-mint-400 rounded-full"></div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all duration-300"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              {columns.map((column) => (
                <th key={column.key} className="text-left py-4 px-4">
                  {column.sortable ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <span>{column.label}</span>
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ArrowUpDown className="w-4 h-4 opacity-50" />
                      )}
                    </motion.button>
                  ) : (
                    <span className="text-gray-300">{column.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-4 px-4 text-gray-300">
                    {typeof row[column.key] === 'number' ? (
                      <span className="font-medium text-white">
                        {row[column.key].toLocaleString()}
                      </span>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No data found matching your search criteria.
        </div>
      )}
    </motion.div>
  );
};

export default DataTable;