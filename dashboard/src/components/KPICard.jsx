import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const KPICard = ({ title, value, change, trend, icon }) => {
  const Icon = LucideIcons[icon];
  const isUp = trend === 'up';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-premium border border-gray-100 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${isUp ? 'bg-accent-light text-navy' : 'bg-red-50 text-red-600'}`}>
          {Icon && <Icon size={24} />}
        </div>
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isUp ? <LucideIcons.ArrowUpRight size={14} className="mr-1" /> : <LucideIcons.ArrowDownRight size={14} className="mr-1" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-navy">{value}</h3>
      </div>
    </motion.div>
  );
};

export default KPICard;
