import { useState, useEffect } from "react";
import NoAccess from "../components/uiComponents/DashBoard/NoAccess";
import DashBoardLoading from "../components/uiComponents/DashBoard/DashBoardLoading";
import CurrentSessions from "../components/uiComponents/DashBoard/CurrentSessions";
import PendingSessions from "../components/uiComponents/DashBoard/PendingSessions";
import EarningSection from "../components/uiComponents/DashBoard/EarningSection";
import SessionsHistory from "../components/uiComponents/DashBoard/SessionsHistory";
import ComingSoon from "../components/uiComponents/DashBoard/ComingSoon";
import DashBoardError from "../components/uiComponents/DashBoard/DashBoardError";
import { useGetCurrentSessions } from "../hooks/useGetCurrentSessions";
import DashBoardHeader from "../components/uiComponents/DashBoard/DashBoardHeader";
import { useGetSessionHistory } from "../hooks/useGetSessionHistory";
import { useGetMonthlyIncome } from "../hooks/useGetMonthlyIncome";
import SessionModal from "../components/uiComponents/DashBoard/SessionModal";
import { useGetPendingSessions } from "../hooks/useGetPendingSessions";
import { useUpdatePendingSessions } from "../hooks/useUpdatePendingSessions";

const MoshaverDashboard = () => {
  // const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [cancelSessionId, setCancelSessionId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("accessToken") || null;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  });

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [availablePayment, setAvailablePayment] = useState(0);
  const [error, setError] = useState(null);

  const { isLoadingCurrentSessions, currentSessions, refetchCurrentSessions } =
    useGetCurrentSessions();

  const { isLoadingSessionHistory, sessionHistory, refetchSessionHistory } =
    useGetSessionHistory();

  // const { isLoadingMonthlyIncome, monthlyIncome, refetchMonthlyIncome } =
  //   useGetMonthlyIncome();

  const { isLoadingPendingSessions, pendingSessions, refetchPendingSessions } =
    useGetPendingSessions();

  const { updatePendingSessions, pendingSessionsUpdating } =
    useUpdatePendingSessions();

  // Refetch data when token becomes available (e.g., after login)
  useEffect(() => {
    if (token) {
      refetchCurrentSessions && refetchCurrentSessions();
      refetchSessionHistory && refetchSessionHistory();
      refetchPendingSessions && refetchPendingSessions();
    }
  }, [token]);

  // API call functions

  // const fetchAvailablePayment = async () => {
  //   if (!token) return;

  //   try {
  //     const headers = { Authorization: `Bearer ${token}` };
  //     const response = await fetch(
  //       "https://api.moshaveritoo.ir/api/payment/income/available-income/",
  //       { headers }
  //     );

  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         setToken(null);
  //         setError("توکن دسترسی منقضی شده است");
  //         return;
  //       }
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setAvailablePayment(data.available_income ?? data.payment ?? 0);
  //   } catch (error) {
  //     console.error("Error fetching available payment:", error);
  //     setError("خطا در دریافت موجودی قابل برداشت - عدم اتصال به سرور");
  //   }
  // };

  const handleCancelSession = async (sessionId) => {
    setCancelSessionId(sessionId);
    setShowCancelConfirm(true);
  };

  // const confirmCancelSession = async () => {
  //   if (!token) return;

  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     const response = await fetch(
  //       "https://api.moshaveritoo.ir/api/sessions/sessions/cancel_by_moshaver/",
  //       {
  //         method: "POST",
  //         headers,
  //         body: JSON.stringify({ session_id: cancelSessionId }),
  //       }
  //     );

  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         setToken(null);
  //         setError("توکن دسترسی منقضی شده است");
  //         return;
  //       }
  //       throw new Error("Failed to cancel session");
  //     }

  //     setCurrentSessions((prev) =>
  //       prev.filter((session) => session.id !== cancelSessionId)
  //     );
  //     setShowCancelConfirm(false);
  //     setCancelSessionId(null);
  //   } catch (error) {
  //     console.error("Error canceling session:", error);
  //     alert("خطا در لغو جلسه");
  //   }
  // };

  // const handlePaymentRequest = async () => {
  //   if (!token) return;

  //   try {
  //     const amount = parseInt(paymentAmount);
  //     if (amount <= availablePayment && amount > 0) {
  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       };

  //       const response = await fetch(
  //         "https://api.moshaveritoo.ir/api/payment/income/request-payment/",
  //         {
  //           method: "POST",
  //           headers,
  //           body: JSON.stringify({ amount: amount }),
  //         }
  //       );

  //       if (!response.ok) {
  //         if (response.status === 401) {
  //           setToken(null);
  //           setError("توکن دسترسی منقضی شده است");
  //           return;
  //         }
  //         throw new Error("Failed to request payment");
  //       }

  //       setAvailablePayment((prev) => prev - amount);
  //       setPaymentAmount("");
  //       setShowPaymentModal(false);
  //       alert("درخواست پرداخت با موفقیت ارسال شد");
  //     } else {
  //       alert("مبلغ وارد شده نامعتبر است");
  //     }
  //   } catch (error) {
  //     console.error("Error requesting payment:", error);
  //     alert("خطا در درخواست پرداخت");
  //   }
  // };
  // // Handle back button functionality
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history - you can customize this
      window.location.href = "/";
    }
  };
  // // const handleLogout = () => {
  // //   setToken(null);
  // //   // In a real app, you would redirect to login
  // //   console.log('User logged out');
  // // };

  // Show login prompt if no token
  if (!token) {
    return <NoAccess />;
  }

  if (
    isLoadingCurrentSessions ||
    isLoadingSessionHistory ||
    isLoadingPendingSessions
  ) {
    return <DashBoardLoading error={error} />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800"
      dir="rtl"
    >
      {/* Header */}
      <DashBoardHeader token={token} handleGoBack={handleGoBack} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Error Alert */}
        {error && <DashBoardError error={error} />}

        {/* Current Sessions */}
        <CurrentSessions
          currentSessions={currentSessions}
          setShowSessionModal={setShowSessionModal}
          handleCancelSession={handleCancelSession}
        />
        {/* Pending Sessions (Waiting List) */}
        <PendingSessions
          pendingSessions={pendingSessions}
          updatePendingSessions={updatePendingSessions}
        />
        {/* Earnings Section */}
        {/* <EarningSection
          monthlyIncome={monthlyIncome}
          refetchMonthlyIncome={refetchMonthlyIncome}
          fetchAvailablePayment={fetchAvailablePayment}
          availablePayment={availablePayment}
          setShowPaymentModal={setShowPaymentModal}
        /> */}
        {/* Session History */}
        <SessionsHistory
          sessionHistory={sessionHistory}
          refetchSessionHistory={refetchSessionHistory}
        />
        {/* Coming Soon Section */}
        <ComingSoon />
      </div>
      {/* Session Modal  */}
      {showSessionModal && (
        <SessionModal
          setShowSessionModal={setShowSessionModal}
          currentSessions={currentSessions}
          handleCancelSession={handleCancelSession}
        />
      )}
      {/* Payment Modal */}
      {/* {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">درخواست پرداخت</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
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
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="مبلغ را وارد کنید"
                  max={availablePayment}
                />
                <div className="text-sm text-gray-500 mt-1">
                  حداکثر: {availablePayment.toLocaleString("fa-IR")} تومان
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePaymentRequest}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-all"
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
      )} */}
      {/* Cancel Confirmation Modal */}
      {/* {showCancelConfirm && (
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
                  onClick={confirmCancelSession}
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
      )} */}
    </div>
  );
};

export default MoshaverDashboard;
