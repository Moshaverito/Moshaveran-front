import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetNotifications } from "../../../hooks/Notification/useGetNotifications";

function NotificationButton() {
  const navigate = useNavigate();
  const { notifications } = useGetNotifications();
  return (
    <button
      className="hidden sm:block p-2 text-gray-600 hover:text-teal-600 transition-colors relative bg-gray-50"
      onClick={() => {
        navigate("/notifications");
      }}
    >
      <Bell className="w-5 h-5" />
      {notifications?.length > 0 && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
}

export default NotificationButton;
