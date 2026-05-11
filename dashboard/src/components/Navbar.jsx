import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, Info, TrendingUp, PieChart, ShieldCheck, Database, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', path: '/', icon: <Info size={18} /> },
    { name: 'Dự Án', path: '/about', icon: <Database size={18} /> },
    { name: 'Hệ Thống BI', path: '/platform', icon: <PieChart size={18} /> },
    { name: 'Xu Hướng', path: '/trends', icon: <TrendingUp size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Báo Cáo', path: '/reports', icon: <BarChart3 size={18} /> },
    { name: 'Kiến Trúc', path: '/architecture', icon: <ShieldCheck size={18} /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="banking-container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-navy p-1.5 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-navy' : 'text-navy'}`}>Banking BI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              >
                <span>{link.name}</span>
              </Link>
            ))}
            <Link to="/dashboard" className="bg-navy hover:bg-navy-dark text-white px-5 py-2.5 rounded-xl transition-all shadow-card hover:shadow-lg font-semibold text-sm">
              Khám Phá Ngay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-navy p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-xl ${location.pathname === link.path ? 'bg-accent-light text-navy' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-navy text-white p-3 rounded-xl font-bold mt-4"
              >
                Vào Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
