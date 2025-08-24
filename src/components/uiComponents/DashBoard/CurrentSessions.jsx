import { Calendar, ChevronRight, X } from "lucide-react";
import {
  formatDate,
  formatTime,
  getSessionTypeColor,
  getSessionTypeIcon,
  getStatusColor,
  getStatusText,
} from "../../../lib/utils";

/* eslint react/prop-types: 0 */

function CurrentSessions({
  currentSessions,
  setShowSessionModal,
  handleCancelSession,
}) {
  return (
    <section className="mb-8">
      <div className="bg-gray-100 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-teal-600" />
            جلسات فعلی ({currentSessions?.length})
          </h2>
          <button
            onClick={() => setShowSessionModal(true)}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-2 bg-inherit"
          >
            <span>مشاهده همه</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Array.isArray(currentSessions) ? currentSessions : [])
            .slice(0, 2)
            .map((session) => (
              <div key={session.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-full ${getSessionTypeColor(
                        session?.session_type
                      )}`}
                    >
                      {getSessionTypeIcon(session.session_type)}
                    </div>
                    <div>
                      <div className="font-medium">{session.client_name}</div>
                      <div className="text-sm text-gray-600">
                        {session.duration} دقیقه
                      </div>
                      <div className="text-sm text-gray-600">
                        سن: {session.client_age}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        session?.status
                      )}`}
                    >
                      {getStatusText(session.status)}
                    </div>
                    <button
                      onClick={() => handleCancelSession(session.id)}
                      className="text-red-500 hover:text-red-700 p-1 bg-inherit"
                      title="لغو جلسه"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatDate(session.start_time)}</span>
                  <span>{formatTime(session.start_time)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  موضوع: {session.reason}
                </div>
              </div>
            ))}

          {currentSessions?.length === 0 && (
            <div className="col-span-2 text-center text-gray-500 py-8">
              هیچ جلسه فعلی وجود ندارد
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CurrentSessions;
