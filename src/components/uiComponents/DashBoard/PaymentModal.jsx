import { X } from "lucide-react";

/* eslint react/prop-types: 0 */
function PaymentModal({
  setShowPaymentModal,
  paymentAmount,
  setPaymentAmount,
  availablePayment,
  handlePaymentRequest,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">درخواست پرداخت</h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full bg-inherit"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مبلغ درخواستی (تومان)
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-inherit "
              placeholder="مبلغ را وارد کنید"
              max={availablePayment}
              min={1}
            />
            <div className="text-sm text-gray-500 mt-1">
              حداکثر: {availablePayment.toLocaleString("fa-IR")} تومان
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePaymentRequest}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-all hover:cursor-pointer disabled:bg-green-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={
                !paymentAmount || parseInt(paymentAmount) > availablePayment
              }
            >
              ارسال درخواست
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-all"
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
