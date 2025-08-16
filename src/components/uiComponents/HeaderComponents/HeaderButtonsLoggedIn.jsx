import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";

/* eslint react/prop-types: 0 */

function HeaderButtonsLoggedIn({
  setUserMenuOpen,
  userMenuOpen,
  handleLogout,
}) {
  return (
    <>
      {/* Notifications - Desktop only */}
      <NotificationButton />
      {/* User Menu */}
      <UserMenu
        setUserMenuOpen={setUserMenuOpen}
        userMenuOpen={userMenuOpen}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default HeaderButtonsLoggedIn;
