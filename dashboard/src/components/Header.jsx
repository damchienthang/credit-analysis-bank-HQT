import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Database,
  FileText,
  Home,
  Info,
  Menu,
  Network,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';

const primaryNav = [
  { name: 'Trang chủ', href: '/', icon: Home },
  { name: 'Xu hướng', href: '/trends', icon: TrendingUp },
  { name: 'Nền tảng BI', href: '/platform', icon: Database },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Báo cáo', href: '/reports', icon: FileText },
]

const menuNav = [
  { name: 'Kiến trúc', href: '/architecture', icon: Network, desc: 'Data warehouse' },
  { name: 'Báo cáo', href: '/reports', icon: FileText, desc: 'Insight và khuyến nghị' },
  { name: 'Giới thiệu', href: '/about', icon: Info, desc: 'Thông tin nhóm thực hiện' },
];

const navLinkClass = ({ isActive }) =>
  ['header-nav-link', isActive ? 'header-nav-link-active' : ''].join(' ');

const menuLinkClass = ({ isActive }) =>
  ['menu-nav-link', isActive ? 'menu-nav-link-active' : ''].join(' ');

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink to="/" className="brand-mark" aria-label="CreditBI Analytics">
          <span className="brand-icon">
            <ShieldCheck size={15} />
          </span>
          <span className="brand-copy">
            <span className="brand-title">CreditBI</span>
            <span className="brand-subtitle">Risk Intelligence</span>
          </span>
        </NavLink>

        <div className="header-actions">
          <nav className="header-nav hidden md:flex" aria-label="Điều hướng chính">
            {primaryNav.map((item) => (
              <NavLink key={item.name} to={item.href} className={navLinkClass}>
                <item.icon size={13} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="menu-button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            className="menu-backdrop"
            aria-label="Đóng menu"
            onClick={() => setIsOpen(false)}
          />
          <nav className="app-menu" aria-label="Menu đầy đủ">
            <div className="app-menu-head">
              <span>Menu</span>
              <strong>CreditBI Analytics</strong>
            </div>
            <div className="app-menu-grid">
              {menuNav.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={menuLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="menu-link-icon">
                    <item.icon size={15} />
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.desc}</small>
                  </span>
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
