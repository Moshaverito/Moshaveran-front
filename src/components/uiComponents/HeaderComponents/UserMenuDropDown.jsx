import { LogOut, Settings, User } from "lucide-react";
import UserMenuDropDownLink from "./UserMenuDropDownLink";
import { useLogOut } from "../../../hooks/Auth/useLogOut";
/* eslint react/prop-types: 0 */

function UserMenuDropDown({ setUserMenuOpen }) {
  const { logout } = useLogOut();

  function handleLogout() {
    logout();
  }
  return (
    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
      <UserMenuDropDownLink
        navigateLink={"/profile"}
        setUserMenuOpen={setUserMenuOpen}
      >
        <User className="w-4 h-4" />
        پروفایل
      </UserMenuDropDownLink>

      <UserMenuDropDownLink
        navigateLink={"/dashboard"}
        setUserMenuOpen={setUserMenuOpen}
      >
        <Settings className="w-4 h-4" />
        داشبورد
      </UserMenuDropDownLink>

      <UserMenuDropDownLink
        navigateLink={"/setAvailability"}
        setUserMenuOpen={setUserMenuOpen}
      >
        <Settings className="w-4 h-4" />
        تنظیم برنامه هفتگی
      </UserMenuDropDownLink>
      <hr className="my-1" />
      <UserMenuDropDownLink
        type={`logout`}
        handleLogout={handleLogout}
        setUserMenuOpen={setUserMenuOpen}
      >
        <LogOut className="w-4 h-4" />
        خروج
      </UserMenuDropDownLink>
    </div>
  );
}

export default UserMenuDropDown;
