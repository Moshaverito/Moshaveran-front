import { useNavigate } from "react-router-dom";
/* eslint react/prop-types: 0 */

function UserMenuDropDownLink({
  setUserMenuOpen,
  navigateLink,
  type,
  children,
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(navigateLink);
        setUserMenuOpen(false);
      }}
      className={`w-full text-right px-4 py-2 text-sm flex items-center gap-2 ${
        type === "logout"
          ? "bg-red-50 text-red-600 hover:bg-red-100 "
          : "bg-gray-50 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export default UserMenuDropDownLink;
