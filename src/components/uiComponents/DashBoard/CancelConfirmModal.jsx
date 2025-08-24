import { AlertTriangle } from "lucide-react";

/* eslint react/prop-types: 0 */
function CancelConfirmModal({
  setShowCancelConfirm,
  handleConfirmCancelSession,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">آیا مطمئن هستید؟</h3>
          <p className="text-gray-600 mb-6">
            آیا از لغو این جلسه مطمئن هستید؟ این عمل قابل بازگشت نیست.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleConfirmCancelSession}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all"
            >
              بله، لغو کن
            </button>
            <button
              onClick={() => setShowCancelConfirm(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-all"
            >
              خیر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelConfirmModal;
