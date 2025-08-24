import { CreditCard, RefreshCw, TrendingUp } from "lucide-react";
/* eslint react/prop-types: 0 */

function EarningSection({
  monthlyIncome,
  refetchMonthlyIncome,
  fetchAvailablePayment,
  availablePayment,
  setShowPaymentModal,
}) {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              درآمد ماهانه
            </h3>
            <button
              onClick={refetchMonthlyIncome}
              className="text-green-600 hover:text-green-700 p-1 bg-gray-100"
              title="به‌روزرسانی"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {typeof monthlyIncome === "number"
              ? monthlyIncome.toLocaleString("fa-IR")
              : 0}{" "}
            تومان
          </div>
          <div className="text-sm text-gray-600">درآمد ماه جاری</div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              قابل برداشت
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchAvailablePayment}
                className="text-blue-600 hover:text-blue-700 p-1 bg-gray-100"
                title="به‌روزرسانی"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-all"
              >
                درخواست پرداخت
              </button>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {availablePayment?.toLocaleString("fa-IR")} تومان
          </div>
          <div className="text-sm text-gray-600">موجودی قابل برداشت</div>
        </div>
      </div>
    </section>
  );
}

export default EarningSection;
