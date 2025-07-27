'use client';

import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50" dir="rtl">
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
          <Link
            to="/"
            className={`text-xl font-b6 relative overflow-hidden
            `}
          >
                            مشاوریتو

          </Link>                
              </div>
              <div className="hidden md:flex text-sm bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full">
                ویژه مشاوران
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-teal-600 transition-colors">ویژگی‌ها</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-teal-600 transition-colors">نحوه کار</a>
              <a href="#testimonials" className="text-gray-700 hover:text-teal-600 transition-colors">نظرات</a>
              <a href="#pricing" className="text-gray-700 hover:text-teal-600 transition-colors">درآمد</a>
            </nav>

            <div className="flex items-center gap-3">
              <button 
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-teal-600 transition-colors">
                ورود
              </button>
              <button 
              onClick={() => navigate('/wait')}
              
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-blue-600 transition-all">
                شروع همکاری
              </button>
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-teal-600">ویژگی‌ها</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-teal-600">نحوه کار</a>
                <a href="#testimonials" className="text-gray-700 hover:text-teal-600">نظرات</a>
                <a href="#pricing" className="text-gray-700 hover:text-teal-600">درآمد</a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
