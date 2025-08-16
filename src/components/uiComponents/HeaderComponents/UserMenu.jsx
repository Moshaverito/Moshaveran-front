import UserMenuButton from "./UserMenuButton";
import UserMenuDropDown from "./UserMenuDropDown";

/* eslint react/prop-types: 0 */

function UserMenu({ setUserMenuOpen, userMenuOpen }) {
  return (
    <div className="relative">
      {/* User menu button */}
      <UserMenuButton
        setUserMenuOpen={setUserMenuOpen}
        userMenuOpen={userMenuOpen}
      />
      {/* User menu dropdown */}
      {userMenuOpen && <UserMenuDropDown setUserMenuOpen={setUserMenuOpen} />}
    </div>
  );
}

export default UserMenu;
