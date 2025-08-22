import { X } from "lucide-react";
import { getSessionTypeColor, getSessionTypeIcon } from "../../../lib/utils";
/* eslint react/prop-types: 0 */

function SessionModal({
  setShowSessionModal,
  currentSessions,
  handleCancelSession,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">همه جلسات</h3>
            <button
              onClick={() => setShowSessionModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full bg-inherit"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {currentSessions?.map((session) => (
              <div key={session.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-6">
                    <div
                      className={` p-2 rounded-full ${getSessionTypeColor(
                        session.session_type
                      )}`}
                    >
                      {getSessionTypeIcon(session.session_type)}
                    </div>
                    <div>
                      <div className="font-medium">{session.client_name}</div>
                      <div className="text-sm text-gray-600">
                        {session.duration} دقیقه
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      سن: {session.client_age}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelSession(session.id)}
                    className="text-red-500 hover:text-red-700 p-1 bg-inherit "
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{session.scheduled_date}</span>
                  <span>{session.scheduled_time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionModal;
