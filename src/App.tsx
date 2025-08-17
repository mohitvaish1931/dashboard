import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import BackgroundPattern from './components/BackgroundPattern';
import Navbar from './components/Navbar';
import StatsCard from './components/StatsCard';
import ChartCard from './components/ChartCard';
import FilterPanel from './components/FilterPanel';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import { 
  statsData, 
  lineChartData, 
  areaChartData, 
  barChartData, 
  pieChartData, 
  tableData, 
  tableColumns 
} from './data/mockData';

// Icon mapping
const iconMap = {
  users: Users,
  dollar: DollarSign,
  trending: TrendingUp,
  activity: Activity,
};

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '7days',
    chartType: 'all',
    category: 'all'
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Here you would typically update your data based on filters
    console.log('Filters updated:', newFilters);
  };

  return (
    <div className="min-h-screen bg-[#0B0C1A] text-white overflow-x-hidden">
      <BackgroundPattern />
      <Navbar />
      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
      />

      <main className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-pink-200 to-mint-200 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Real-time insights and data visualization
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 backdrop-blur-sm border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300"
            >
              <Filter className="w-5 h-5 text-pink-400" />
              <span>Filters</span>
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsData.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={IconComponent}
                  gradient={stat.gradient}
                  delay={index * 0.1}
                />
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ChartCard
              title="Revenue Trend"
              type="line"
              data={lineChartData}
              delay={0.2}
            />
            <ChartCard
              title="Weekly Activity"
              type="area"
              data={areaChartData}
              delay={0.3}
            />
            <ChartCard
              title="Quarterly Performance"
              type="bar"
              data={barChartData}
              delay={0.4}
            />
            <ChartCard
              title="Device Distribution"
              type="pie"
              data={pieChartData}
              delay={0.5}
            />
          </div>

          {/* Data Table */}
          <DataTable
            data={tableData}
            columns={tableColumns}
            delay={0.6}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;