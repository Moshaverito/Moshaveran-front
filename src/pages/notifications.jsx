import NotificationsHeader from "../components/uiComponents/NotificationsComponents/NotificationsHeader";
import EmptyNotifications from "../components/uiComponents/NotificationsComponents/EmptyNotifications";
import NotificationsSummary from "../components/uiComponents/NotificationsComponents/NotificationsSummary";
import NotificationsLoader from "../components/uiComponents/NotificationsComponents/NotificationsLoader";
import NotificationCard from "../components/uiComponents/NotificationsComponents/NotificationCard";
import { useGetNotifications } from "../hooks/Notification/useGetNotifications";
import NoAccess from "../components/uiComponents/DashBoard/NoAccess";

const NotificationsPage = ({ isLoggedIn }) => {
  const token = localStorage.getItem("accessToken");

  const { notifications, isLoading, refetchNotifications } =
    useGetNotifications();

  // Since we only show unseen notifications from the API, we don't need complex filtering

  // number of unread notifications will be passed to the header and summary components
  const unreadCount = notifications?.length;

  if (!token && !isLoggedIn) {
    return <NoAccess />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800"
      dir="rtl"
    >
      {/* Header with Back Button - Mobile Optimized */}
      <NotificationsHeader
        unreadCount={unreadCount}
        loading={isLoading}
        refetchNotifications={refetchNotifications}
      />
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        {/* Summary Card - Mobile Optimized */}
        <NotificationsSummary unreadCount={unreadCount} />

        {/* Loading State */}
        {isLoading ? (
          <NotificationsLoader />
        ) : notifications?.length === 0 ? (
          /* Empty State */
          <EmptyNotifications refetchNotifications={refetchNotifications} />
        ) : (
          /* Notifications List - Mobile Optimized */
          <div className="space-y-3 sm:space-y-4">
            {notifications?.map((notification) => (
              <NotificationCard
                notification={notification}
                key={notification.id}
              />
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
