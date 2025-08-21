import { AlertTriangle } from "lucide-react";

function NoAccess() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center"
      dir="rtl"
    >
      <div className="text-center bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">دسترسی محدود</h2>
        <p className="text-gray-600 mb-6">
          برای دسترسی به داشبورد لطفاً وارد شوید
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition-all"
        >
          ورود به سیستم
        </button>
      </div>
    </div>
  );
}

export default NoAccess;
