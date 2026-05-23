import { Code, Database, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const systemLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Báo cáo', href: '/reports' },
  { name: 'Kiến trúc', href: '/architecture' },
  { name: 'Nền tảng BI', href: '/platform' },
];

const Footer = () => (
  <footer className="site-footer rich-footer">
    <div className="rich-footer-inner">
      <section className="rich-footer-brand">
        <div className="rich-footer-logo">
          <ShieldCheck size={18} />
        </div>
        <div>
          <h2>CreditBI Analytics</h2>
          <p>
            Hệ thống Business Intelligence hỗ trợ phân tích danh mục tín dụng,
            theo dõi rủi ro nợ xấu và trực quan hóa dữ liệu LendingClub.
          </p>
        </div>
      </section>

      <section>
        <h3>Hệ thống</h3>
        <nav className="rich-footer-links" aria-label="Liên kết hệ thống">
          {systemLinks.map((link) => (
            <Link key={link.href} to={link.href}>{link.name}</Link>
          ))}
        </nav>
      </section>

      <section>
        <h3>Thông tin</h3>
        <div className="rich-footer-info">
          <span><Database size={14} /> LendingClub 2007-2018</span>
          <span><MapPin size={14} /> Hà Nội, Việt Nam</span>
          <a href="mailto:thangd595@gmail.com"><Mail size={14} /> thangd595@gmail.com</a>
          <a
            href="https://github.com/damchienthang/BTN-HQT-CSDL-Commercial-bank-credit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code size={14} /> Github
          </a>
        </div>
      </section>
    </div>

    <div className="rich-footer-bottom">
      <span>© 2026 CreditBI Analytics · Dự án Hệ Quản Trị Cơ Sở Dữ Liệu · Nhóm 14</span>
      <span className="rich-footer-policy">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Settings</a>
      </span>
    </div>
  </footer>
);

export default Footer;
