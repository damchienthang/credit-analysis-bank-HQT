import React from 'react';
import { Landmark, Mail, Phone, MapPin, Share2, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-cols-2">
            <div className="flex items-center gap-2 mb-6">
              <Landmark className="h-8 w-8 text-banking-gold" />
              <span className="text-2xl font-bold tracking-tighter uppercase">LendingClub BI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Hệ thống Business Intelligence tiên tiến hỗ trợ phân tích và quản trị dữ liệu tín dụng. 
              Giải pháp tối ưu hóa lợi nhuận và kiểm soát rủi ro nợ xấu cho doanh nghiệp tài chính.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-banking-gold transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-banking-gold transition-colors">
                <Code className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-banking-gold uppercase tracking-wider">Hệ thống</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard Phân Tích</a></li>
              <li><a href="/platform" className="hover:text-white transition-colors">Kiến Trúc Dữ Liệu</a></li>
              <li><a href="/trends" className="hover:text-white transition-colors">Xu Hướng Ngành</a></li>
              <li><a href="/reports" className="hover:text-white transition-colors">Báo Cáo Insights</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-banking-gold uppercase tracking-wider">Liên hệ</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-banking-gold" />
                <span>Ho Chi Minh City, Vietnam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-banking-gold" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-banking-gold" />
                <span>contact@lendingclub-bi.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 LendingClub Enterprise BI Platform. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
