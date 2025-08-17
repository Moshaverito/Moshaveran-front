import { ArrowRight, Bell, RefreshCcw } from "lucide-react";

/* eslint react/prop-types: 0 */

function NotificationsHeader({ loading, unreadCount, refetchNotifications }) {
  // Handle back button functionality
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history - you can customize this
      window.location.href = "/";
    }
  };
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2 -mr-2 bg-white"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base">بازگشت</span>
          </button>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              اعلان‌ها
            </h1>
            {/* count of unread notifications */}
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          {/* --------- Refresh Button --------- */}
          {/* This button will refetch notifications when clicked */}
          <button
            onClick={() => {
              refetchNotifications();
            }}
            disabled={loading}
            className="p-2 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors disabled:opacity-50"
          >
            <RefreshCcw
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsHeader;
