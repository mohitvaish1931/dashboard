import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient, 
  delay = 0 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = value / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, rotateX: 5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl" 
           style={{ background: gradient }}></div>
      
      <div className="relative p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-20 backdrop-blur-sm`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`text-right ${change >= 0 ? 'text-mint-400' : 'text-pink-400'}`}>
            <span className="text-sm font-medium">
              {change >= 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            {formatNumber(count)}
          </h3>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
             style={{
               background: `linear-gradient(135deg, ${gradient.includes('pink') ? '#FF4D8D' : gradient.includes('mint') ? '#29F19C' : '#FFD93D'}20, transparent)`,
               filter: 'blur(10px)'
             }}>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;