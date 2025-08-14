import { useNavigate } from "react-router-dom";

function HeaderButtons({ closeMobileMenu }) {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate("/login");
          closeMobileMenu();
        }}
        className="hidden sm:block text-gray-700 hover:text-teal-600 transition-colors text-sm sm:text-base bg-blue-100 "
      >
        ورود
      </button>
      <button
        onClick={() => {
          navigate("/wait");
          closeMobileMenu();
        }}
        className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full hover:from-teal-600 hover:to-blue-600 transition-all text-sm sm:text-base whitespace-nowrap"
      >
        شروع همکاری
      </button>
    </>
  );
}

export default HeaderButtons;
