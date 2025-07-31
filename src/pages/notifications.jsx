import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle, RefreshCcw, ArrowRight, Loader2 } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [markingAsRead, setMarkingAsRead] = useState(null);

  // Mock navigation function for demo
  const navigateBack = () => {
    console.log('Navigate back');
    // In your real app, use: navigate(-1)
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const res = await fetch('http://localhost:8000/api/accounts/notify/notifList/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notifId) => {
    setMarkingAsRead(notifId);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const res = await fetch('http://localhost:8000/api/accounts/notify/seenMsg/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notif_id: notifId }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Remove the notification from the list since it's now seen
      setNotifications(prev => prev.filter(n => n.id !== notifId));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    } finally {
      setMarkingAsRead(null);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Since we only show unseen notifications from the API, we don't need complex filtering
  const unreadCount = notifications.length;

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
    return 'همین الان';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Header with Back Button - Mobile Optimized */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2 -mr-2"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">بازگشت</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">اعلان‌ها</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </div>

            <button
              onClick={fetchNotifications}
              disabled={loading}
              className="p-2 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors disabled:opacity-50"
            >
              <RefreshCcw className={`w-5 h-5 sm:w-6 sm:h-6 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        {/* Summary Card - Mobile Optimized */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                اعلان‌های خوانده‌نشده
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {unreadCount} اعلان جدید دارید
              </p>
            </div>
            <div className="text-2xl sm:text-3xl">
              {unreadCount === 0 ? '✅' : '📢'}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
            <p className="text-gray-600 text-sm sm:text-base">در حال بارگذاری اعلان‌ها...</p>
          </div>
        ) : notifications.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-6xl sm:text-7xl mb-4">🔔</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              اعلان جدیدی ندارید
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              همه اعلان‌های شما خوانده شده‌اند
            </p>
            <button
              onClick={fetchNotifications}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              بررسی مجدد
            </button>
          </div>
        ) : (
          /* Notifications List - Mobile Optimized */
          <div className="space-y-3 sm:space-y-4">
            {notifications.map((notification) => (
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
                      onClick={() => markAsRead(notification.id)}
                      disabled={markingAsRead === notification.id}
                      className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {markingAsRead === notification.id ? (
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
            ))}
          </div>
        )}

        {/* Bottom Spacing for Mobile */}
        <div className="h-20 sm:h-8"></div>
      </div>
    </div>
  );
};

export default NotificationsPage;