"use client";

import { useState } from "react";
import { Heart, Menu, X, User, LogOut, Settings, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoAndBadge from "../LogoAndBadge";
import NavigationBar from "../NavigationBar";
import HeaderButtons from "../HeaderButtons";
import HeaderButtonLoggedIn from "../HeaderButtonLoggedIn";

export default function Header({ isLoggedIn = false, userRole = "user" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo and Badge */}
          <LogoAndBadge closeMobileMenu={closeMobileMenu} />
          {/* Desktop Navigation */}
          <NavigationBar />
          {/* Right Side - Auth/User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isLoggedIn ? (
              // Not logged in - Login/Signup buttons
              <HeaderButtons closeMobileMenu={closeMobileMenu} />
            ) : (
              // Logged in - User menu
              <HeaderButtonLoggedIn
                setUserMenuOpen={setUserMenuOpen}
                userMenuOpen={userMenuOpen}
                handleLogout={handleLogout}
              />
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 bg-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              )}
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
                      navigate("/login");
                      closeMobileMenu();
                    }}
                    className="text-right text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base"
                  >
                    ورود
                  </button>
                  <button
                    onClick={() => {
                      navigate("/wait");
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
                      navigate("/notifications");
                      closeMobileMenu();
                    }}
                    className="text-right text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base flex items-center gap-2 bg-white hover:from-teal-600"
                  >
                    <Bell className="w-4 h-4" />
                    اعلان‌ها
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="text-right text-red-600 hover:text-red-700 py-2 text-sm sm:text-base flex items-center gap-2 bg-red-50"
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
