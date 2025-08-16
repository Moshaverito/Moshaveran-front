import { useNavigate } from "react-router-dom";
/* eslint react/prop-types: 0 */

function StartWorkingWithUsButton({ children, type, closeMobileMenu }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/wait");
        closeMobileMenu();
      }}
      className={`bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:from-teal-600 hover:to-blue-600 transition-all text-sm sm:text-base  ${
        type === "sm"
          ? "px-4 py-2 "
          : "px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap"
      }`}
    >
      {children}
    </button>
  );
}

export default StartWorkingWithUsButton;
