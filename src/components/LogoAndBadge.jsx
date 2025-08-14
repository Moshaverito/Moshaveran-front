import { Link } from "react-router-dom";
function LogoAndBadge({ closeMobileMenu }) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
        <Link
          to="/"
          className="relative overflow-hidden"
          onClick={closeMobileMenu}
        >
          مشاوریتو
        </Link>
      </div>
      {/* Badge - Always visible */}
      <div className="flex text-xs sm:text-sm bg-gradient-to-r from-green-500 to-teal-500 text-white px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
        ویژه مشاوران
      </div>
    </div>
  );
}

export default LogoAndBadge;
