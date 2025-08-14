import { Bell, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeaderButtonLoggedIn({ setUserMenuOpen, userMenuOpen, handleLogout }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Notifications - Desktop only */}
      <button
        className="hidden sm:block p-2 text-gray-600 hover:text-teal-600 transition-colors relative bg-gray-50"
        onClick={() => {
          navigate("/notifications");
        }}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors bg-white"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center ">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="hidden sm:block text-sm text-gray-700 ">
            حساب کاربری
          </span>
        </button>

        {/* User Dropdown */}
        {userMenuOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
            <button
              onClick={() => {
                navigate("/profile");
                setUserMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2 bg-gray-50"
            >
              <User className="w-4 h-4" />
              پروفایل
            </button>
            <button
              onClick={() => {
                navigate("/dashboard");
                setUserMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              داشبورد
            </button>
            <button
              onClick={() => {
                navigate("/setAvailability");
                setUserMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              تنظیم برنامه هفتگی
            </button>
            <hr className="my-1" />
            <button
              onClick={handleLogout}
              className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-100 flex items-center gap-2 bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default HeaderButtonLoggedIn;
