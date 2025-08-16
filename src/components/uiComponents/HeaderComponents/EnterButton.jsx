import { useNavigate } from "react-router-dom";
/* eslint react/prop-types: 0 */

function EnterButton({ children, navigateLink, closeMobileMenu, type }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(navigateLink);
        type === "sm" && closeMobileMenu();
      }}
      className={`${
        type === "sm"
          ? "text-right text-gray-700 hover:text-teal-600 py-2 text-sm sm:text-base bg-blue-100"
          : "hidden sm:block text-gray-700 hover:text-teal-600 transition-colors text-sm sm:text-base bg-blue-100 "
      }`}
    >
      {children}
    </button>
  );
}

export default EnterButton;
