import { Menu, X } from "lucide-react";

/* eslint react/prop-types: 0 */

function MobileMenuButton({ setMobileMenuOpen, mobileMenuOpen }) {
  return (
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
  );
}

export default MobileMenuButton;
