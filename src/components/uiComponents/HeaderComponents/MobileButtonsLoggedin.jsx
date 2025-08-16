import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
/* eslint react/prop-types: 0 */

function MobileButtonsLoggedin({ closeMobileMenu, handleLogout }) {
  const navigate = useNavigate();
  return (
    <>
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
    </>
  );
}

export default MobileButtonsLoggedin;
