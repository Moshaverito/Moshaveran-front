'use client';

import { useState } from 'react';
import { Heart, Menu, X, User, LogOut, Settings, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn = false, userRole = 'user' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    setUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo and Badge */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              <Link
                to="/"
                className="relative overflow-hidden"
                onClick={closeMobileMenu}
              >
                مشاوریتو
              </Link>                
            </div>
            {/* Badge - Always visible */}
            <div className="flex text-xs sm:text-sm bg-gradient-to-r from-green-500 to-teal-500 text-white px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
              ویژه مشاوران
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="/about-us" className="text-gray-700 hover:text-teal-600 transition-colors">درباره ما</a>
            <a href="/TermsAndConditions" className="text-gray-700 hover:text-teal-600 transition-colors">قوانین و مقررات</a>
            {/* <a href="http://localhost:5173/#testimonials" className="text-gray-700 hover:text-teal-600 transition-colors">نظرات</a> */}
            <a href="/plans" className="text-gray-700 hover:text-teal-600 transition-colors">خرید اشتراک</a>
          </nav>

          {/* Right Side - Auth/User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isLoggedIn ? (
              // Not logged in - Login/Signup buttons
              <>
                <button 
                  onClick={() => {
                    navigate('/login');
                    closeMobileMenu();
                  }}
                  className="hidden sm:block text-gray-700 hover:text-teal-600 transition-colors text-sm sm:text-base"
                >
                  ورود
                </button>
                <button 
                  onClick={() => {
                    navigate('/wait');
                    closeMobileMenu();
                  }}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full hover:from-teal-600 hover:to-blue-600 transition-all text-sm sm:text-base whitespace-nowrap"
                >
                  شروع همکاری
                </button>
              </>
            ) : (
              // Logged in - User menu
              <>
                {/* Notifications - Desktop only */}
                <button className="hidden sm:block p-2 text-gray-600 hover:text-teal-600 transition-colors relative"
                        onClick={() => {
                          navigate('/notifications');
                        }} >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm text-gray-700">حساب کاربری</span>
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        پروفایل
                      </button>
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        داشبورد
                      </button>
                      <button
                        onClick={() => {
                          navigate('/setAvailability');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        تنظیم برنامه هفتگی
                      </button>                      
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        خروج
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {/* Navigation Links */}
              <a 
                href="/about-us" 
                className="text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base"
                onClick={closeMobileMenu}
              >
                درباره ما          
                 </a>
              <a 
                href="/TermsAndConditions" 
                className="text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base"
                onClick={closeMobileMenu}
              >
               قوانین و مقررات 
             </a>
              <a 
                href="/plans" 
                className="text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base"
                onClick={closeMobileMenu}
              >
                خرید اشتراک       
              </a>

              {/* Mobile-specific actions */}
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      navigate('/login');
                      closeMobileMenu();
                    }}
                    className="text-right text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base"
                  >
                    ورود
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/wait');
                      closeMobileMenu();
                    }}
                    className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-blue-600 transition-all text-sm sm:text-base"
                  >
                    شروع همکاری
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">


                  <button
                    onClick={() => {
                      navigate('/notifications');
                      closeMobileMenu();
                    }}
                    className="text-right text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    اعلان‌ها
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="text-right text-red-600 hover:text-red-700 py-2 text-sm sm:text-base flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}