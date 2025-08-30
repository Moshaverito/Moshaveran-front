"use client";

import { useState } from "react";

import LogoAndBadge from "../uiComponents/HeaderComponents/LogoAndBadge";
import NavigationBar from "../uiComponents/HeaderComponents/NavigationBar";
import HeaderButtons from "../uiComponents/HeaderComponents/HeaderButtons";
import HeaderButtonsLoggedIn from "../uiComponents/HeaderComponents/HeaderButtonsLoggedIn";
import MobileMenuButton from "../uiComponents/HeaderComponents/MobileMenuButton";
import MobileNavigation from "../uiComponents/HeaderComponents/MobileNavigation";
/* eslint react/prop-types: 0 */

export default function Header({ isLoggedIn = false, userRole = "user" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const token = localStorage.getItem("accessToken");

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
          <LogoAndBadge handleCloseMobileMenu={closeMobileMenu} />
          {/* Desktop Navigation */}
          <NavigationBar />
          {/* Right Side - Auth/User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isLoggedIn && !token ? (
              // Not logged in - Login/Signup buttons
              <HeaderButtons closeMobileMenu={closeMobileMenu} />
            ) : (
              // Logged in - User menu
              <HeaderButtonsLoggedIn
                setUserMenuOpen={setUserMenuOpen}
                userMenuOpen={userMenuOpen}
                handleLogout={handleLogout}
              />
            )}

            {/* Mobile Menu Button */}
            <MobileMenuButton
              setMobileMenuOpen={setMobileMenuOpen}
              mobileMenuOpen={mobileMenuOpen}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <MobileNavigation
              closeMobileMenu={closeMobileMenu}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
