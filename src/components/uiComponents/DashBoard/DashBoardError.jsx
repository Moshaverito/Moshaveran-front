import { AlertTriangle } from "lucide-react";

function DashBoardError({ error }) {
  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-red-800 font-medium">خطا در اتصال به سرور</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-sm"
      >
        تلاش مجدد
      </button>
    </div>
  );
}

export default DashBoardError;
