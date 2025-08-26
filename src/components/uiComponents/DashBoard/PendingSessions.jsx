import { CheckSquare, Hourglass, XSquare } from "lucide-react";
import {
  formatDate,
  formatDateTime,
  formatTime,
  getSessionTypeColor,
  getSessionTypeIcon,
} from "../../../lib/utils";

/* eslint react/prop-types: 0 */
function PendingSessions({ pendingSessions, updatePendingSessions }) {
  return (
    <section className="mb-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Hourglass className="w-6 h-6 text-orange-600" />
          لیست انتظار ({pendingSessions?.length})
        </h2>

        <div className="space-y-4">
          {(Array.isArray(pendingSessions) ? pendingSessions : []).map(
            (session) => (
              <div key={session.id} className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
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
                        {session.reason} • {session.duration} دقیقه
                      </div>
                      <div className="text-sm text-gray-600">
                        سن: {session.client_age}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        updatePendingSessions({
                          sessionId: session?.id,
                          action: `accept`,
                        });
                      }}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                      title="پذیرش جلسه"
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        updatePendingSessions({
                          sessionId: session?.id,
                          action: `ignored`,
                        })
                      }
                      className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-all"
                      title="نادیده گرفتن"
                    >
                      <XSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>درخواست برای: {formatDate(session.start_time)}</span>
                  <span>ساعت: {formatTime(session.start_time)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ایجاد شده: {formatDateTime(session.created_at)}
                </div>
              </div>
            )
          )}

          {pendingSessions?.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              هیچ جلسه در انتظاری وجود ندارد
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PendingSessions;
