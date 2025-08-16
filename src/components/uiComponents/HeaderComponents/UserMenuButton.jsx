import { User } from "lucide-react";

/* eslint react/prop-types: 0 */

function UserMenuButton({ userMenuOpen, setUserMenuOpen }) {
  return (
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
  );
}

export default UserMenuButton;
