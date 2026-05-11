import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Landmark, BarChart3, PieChart, Info, TrendingUp, ShieldCheck, Database } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Trang chủ', href: '/', icon: Landmark },
    { name: 'Business Intelligence', href: '/platform', icon: Database },
    { name: 'Xu hướng', href: '/trends', icon: TrendingUp },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Báo cáo', href: '/reports', icon: PieChart },
    { name: 'Kiến trúc', href: '/architecture', icon: ShieldCheck },
    { name: 'Giới thiệu', href: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 enterprise-shadow">
      <div className="w-full px-4 sm:px-10 lg:px-12">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-navy rounded-xl group-hover:bg-accent-blue transition-colors">
                <Landmark className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-navy leading-tight tracking-tight uppercase">LendingClub</span>
                <span className="text-[10px] font-medium text-accent-blue tracking-[0.2em] uppercase">Enterprise BI</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${isActive
                    ? 'bg-navy/5 text-navy border-b-2 border-navy'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                  }`
                }
              >


                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-navy hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-4 rounded-md text-base font-medium flex items-center gap-3 ${isActive
                    ? 'bg-navy text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
