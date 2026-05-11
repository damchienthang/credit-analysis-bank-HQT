import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const ChartCard = ({ title, children, subtitle, info }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-premium border border-gray-100 h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-lg font-bold text-navy">{title}</h4>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {info && (
          <div className="group relative">
            <Info size={18} className="text-gray-400 cursor-help" />
            <div className="absolute right-0 top-full mt-2 w-48 bg-navy text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              {info}
            </div>
          </div>
        )}
      </div>
      <div className="flex-grow flex items-center justify-center min-h-[300px]">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;
