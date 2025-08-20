import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, Calendar, Download } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import StatsCard from '../components/StatsCard';
import { useAppContext } from '../context/AppContext';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const { notifications } = useAppContext();

  const analyticsStats = [
    {
      title: "Page Views",
      value: 245680,
      change: 18.2,
      icon: "activity",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Unique Visitors",
      value: 89340,
      change: 12.8,
      icon: "users",
      gradient: "from-mint-500 to-mint-600"
    },
    {
      title: "Conversion Rate",
      value: 4.67,
      change: -2.3,
      icon: "trending",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Avg. Session Duration",
      value: 342,
      change: 8.9,
      icon: "activity",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  const trafficData = [
    { name: 'Jan', organic: 4000, paid: 2400, direct: 2400 },
    { name: 'Feb', organic: 3000, paid: 1398, direct: 2210 },
    { name: 'Mar', organic: 2000, paid: 9800, direct: 2290 },
    { name: 'Apr', organic: 2780, paid: 3908, direct: 2000 },
    { name: 'May', organic: 1890, paid: 4800, direct: 2181 },
    { name: 'Jun', organic: 2390, paid: 3800, direct: 2500 },
    { name: 'Jul', organic: 3490, paid: 4300, direct: 2100 },
  ];

  const conversionData = [
    { name: 'Landing Page', value: 85 },
    { name: 'Product Page', value: 65 },
    { name: 'Checkout', value: 45 },
    { name: 'Payment', value: 35 },
    { name: 'Confirmation', value: 32 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 52 },
    { name: 'Mobile', value: 38 },
    { name: 'Tablet', value: 10 },
  ];

  const iconMap = {
    users: Users,
    dollar: DollarSign,
    trending: TrendingUp,
    activity: Activity,
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-pink-200 to-mint-200 bg-clip-text text-transparent">
              Analytics
            </h1>
            <p className="text-gray-400 text-lg">
              Deep dive into your data insights
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                notifications.addNotification({
                  type: 'success',
                  title: 'Export Started',
                  message: 'Analytics data export has been initiated.',
                  icon: Download
                });
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 border border-pink-500/30 text-white hover:border-pink-400/50 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {analyticsStats.map((stat, index) => {
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
            title="Traffic Sources"
            type="area"
            data={trafficData}
            delay={0.2}
          />
          <ChartCard
            title="Conversion Funnel"
            type="bar"
            data={conversionData}
            delay={0.3}
          />
          <ChartCard
            title="Device Distribution"
            type="pie"
            data={deviceData}
            delay={0.4}
          />
          <ChartCard
            title="User Engagement"
            type="line"
            data={trafficData}
            delay={0.5}
          />
        </div>

        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Top Pages */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Top Pages</h3>
            <div className="space-y-3">
              {[
                { page: '/dashboard', views: 12450, change: 15.2 },
                { page: '/analytics', views: 8930, change: 8.7 },
                { page: '/reports', views: 6780, change: -2.1 },
                { page: '/settings', views: 4560, change: 12.3 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="text-white font-medium">{item.page}</div>
                    <div className="text-sm text-gray-400">{item.views.toLocaleString()} views</div>
                  </div>
                  <div className={`text-sm font-medium ${item.change >= 0 ? 'text-mint-400' : 'text-pink-400'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              {[
                { source: 'Organic Search', percentage: 45.2, color: 'bg-mint-500' },
                { source: 'Direct', percentage: 28.7, color: 'bg-pink-500' },
                { source: 'Social Media', percentage: 15.8, color: 'bg-yellow-500' },
                { source: 'Referral', percentage: 10.3, color: 'bg-purple-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{item.source}</span>
                    <span className="text-gray-400 text-sm">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Activity */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Real-time Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Users</span>
                <span className="text-2xl font-bold text-mint-400">1,247</span>
              </div>
              <div className="space-y-2">
                {[
                  { event: 'Page view', time: '2s ago', user: 'Anonymous' },
                  { event: 'Sign up', time: '15s ago', user: 'john@example.com' },
                  { event: 'Purchase', time: '32s ago', user: 'jane@example.com' },
                  { event: 'Page view', time: '45s ago', user: 'Anonymous' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 rounded bg-white/5"
                  >
                    <div>
                      <div className="text-white text-sm">{activity.event}</div>
                      <div className="text-xs text-gray-400">{activity.user}</div>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;