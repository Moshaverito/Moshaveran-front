import { ArrowRight } from "lucide-react";
/* eslint react/prop-types: 0 */

function DashBoardHeader({ handleGoBack, token }) {
  return (
    <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-white/50 rounded-full transition-all bg-inherit"
          >
            <ArrowRight className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
            داشبورد مشاور
          </h1>
          {/* Token Status Indicator and Logout */}
          <div className="mr-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  token ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm text-gray-600">
                {token ? "متصل" : "قطع ارتباط"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHeader;
