import { Clock, RefreshCw } from "lucide-react";
import {
  formatDateTime,
  getSessionTypeColor,
  getSessionTypeIcon,
  getStatusColor,
  getStatusText,
} from "../../../lib/utils";
/* eslint react/prop-types: 0 */

function SessionsHistory({ sessionHistory, refetchSessionHistory }) {
  const sessions = Array.isArray(sessionHistory) ? sessionHistory : [];

  return (
    <section className="mb-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            تاریخچه جلسات ({sessions.length})
          </h2>
          <button
            onClick={refetchSessionHistory}
            className="text-purple-600 hover:text-purple-700 p-1 bg-gray-100"
            title="به‌روزرسانی"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${getSessionTypeColor(
                      session.session_type
                    )}`}
                  >
                    {getSessionTypeIcon(session.session_type)}
                  </div>
                  <div>
                    <div className="font-medium">{session.client_name}</div>
                    <div className="text-sm text-gray-600">
                      {formatDateTime(session.end_time)} • {session.duration}{" "}
                      دقیقه
                    </div>
                    <div className="text-sm text-gray-600">
                      سن: {session.client_age}
                    </div>
                    <div className="text-xs text-gray-500">
                      موضوع: {session.reason}
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-medium text-green-600">
                    {parseFloat(session.refund_amount || 0).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      session.status
                    )} mt-1`}
                  >
                    {getStatusText(session.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              هیچ سابقه جلسه‌ای وجود ندارد
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SessionsHistory;
