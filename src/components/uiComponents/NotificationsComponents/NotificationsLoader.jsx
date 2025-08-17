import { Loader2 } from "lucide-react";

// this component is used to show a loading state while notifications are being fetched
function NotificationsLoader() {
  return (
    <div className="text-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
      <p className="text-gray-600 text-sm sm:text-base">
        در حال بارگذاری اعلان‌ها...
      </p>
    </div>
  );
}

export default NotificationsLoader;
