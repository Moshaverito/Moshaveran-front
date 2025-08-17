/* eslint react/prop-types: 0 */

import { Bell, CheckCircle, Loader2 } from "lucide-react";
import { useMarkAsRead } from "../../../hooks/useMarkAsRead";

function NotificationCard({ notification }) {
  const { markAsRead, isLoading } = useMarkAsRead();

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days} روز پیش`;
    if (hours > 0) return `${hours} ساعت پیش`;
    if (minutes > 0) return `${minutes} دقیقه پیش`;
    return "همین الان";
  };

  return (
    <div
      key={notification.id}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-tight">
              {notification.title}
            </h3>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {formatDate(notification.created_at)}
            </span>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
            {notification.text}
          </p>

          {/* Action Button */}
          <button
            onClick={() => markAsRead({ notifId: notification.id })}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading === notification.id ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>در حال علامت‌گذاری...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>علامت‌گذاری به عنوان خوانده‌شده</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
