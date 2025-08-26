import { useState, useEffect } from "react";
import NoAccess from "../components/uiComponents/DashBoard/NoAccess";
import DashBoardLoading from "../components/uiComponents/DashBoard/DashBoardLoading";
import CurrentSessions from "../components/uiComponents/DashBoard/CurrentSessions";
import PendingSessions from "../components/uiComponents/DashBoard/PendingSessions";
import EarningSection from "../components/uiComponents/DashBoard/EarningSection";
import SessionsHistory from "../components/uiComponents/DashBoard/SessionsHistory";
import ComingSoon from "../components/uiComponents/DashBoard/ComingSoon";
import DashBoardError from "../components/uiComponents/DashBoard/DashBoardError";
import DashBoardHeader from "../components/uiComponents/DashBoard/DashBoardHeader";

import SessionModal from "../components/uiComponents/DashBoard/SessionModal";
import CancelConfirmModal from "../components/uiComponents/DashBoard/CancelConfirmModal";
import PaymentModal from "../components/uiComponents/DashBoard/PaymentModal";
import toast from "react-hot-toast";
import { useGetCurrentSessions } from "../hooks/Sessions/useGetCurrentSessions.js";
import { useGetSessionHistory } from "../hooks/Sessions/useGetSessionHistory.js";
import { useGetMonthlyIncome } from "../hooks/Sessions/useGetMonthlyIncome.js";
import { useGetPendingSessions } from "../hooks/Sessions/useGetPendingSessions.js";
import { useUpdatePendingSessions } from "../hooks/Sessions/useUpdatePendingSessions.js";
import { useCancelSession } from "../hooks/Sessions/useCancelSession.js";
import { useGetAvailablePayment } from "../hooks/Sessions/useGetAvailablePayment.js";
import { useRequestPayments } from "../hooks/Sessions/useRequestPayments.js";

const MoshaverDashboard = () => {
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

  const [availablePayment, setAvailablePayment] = useState(0);
  const [error, setError] = useState(null);

  // Current Sessions API Call
  const { isLoadingCurrentSessions, currentSessions, refetchCurrentSessions } =
    useGetCurrentSessions();

  // Sessions History API Call
  const { isLoadingSessionHistory, sessionHistory, refetchSessionHistory } =
    useGetSessionHistory();

  // Monthly Income API Call
  const { isLoadingMonthlyIncome, monthlyInComeData, refetchMonthlyIncome } =
    useGetMonthlyIncome();

  // Pending Sessions API Call
  const { isLoadingPendingSessions, pendingSessions, refetchPendingSessions } =
    useGetPendingSessions();

  // Update Pending Sessions API Call
  const { updatePendingSessions, pendingSessionsUpdating } =
    useUpdatePendingSessions();

  // Cancel Session API Call
  const { cancelSession, cancelSessionLoading } = useCancelSession();

  // Request Payment API Call
  const {
    isLoadingAvailablePayment,
    availablePayments,
    refetchAvailablePayment,
  } = useGetAvailablePayment();

  // Request Payment API Call
  const { requestPayment, isLoading: isLoadingRequestPayment } =
    useRequestPayments();

  // Refetch data when token becomes available (e.g., after login)
  useEffect(() => {
    if (token) {
      refetchCurrentSessions && refetchCurrentSessions();
      refetchSessionHistory && refetchSessionHistory();
      refetchPendingSessions && refetchPendingSessions();
    }
  }, [token]);

  // Cancel Session handler
  const handleCancelSession = async (sessionId) => {
    setCancelSessionId(sessionId);
    setShowCancelConfirm(true);
  };

  // Confirm Cancel Session handler
  function handleConfirmCancelSession() {
    if (!cancelSessionId) return;

    cancelSession({ sessionId: cancelSessionId });
    setShowCancelConfirm(false);
    setCancelSessionId(null);
  }

  // Payment Request handler
  const handlePaymentRequest = async () => {
    const amount = parseInt(paymentAmount);
    if (amount <= availablePayments && amount > 0) {
      console.log(`requesting payment of ${amount}`);
      requestPayment({ amount });
    } else {
      toast.error("مبلغ وارد شده نامعتبر است");
    }
    setAvailablePayment((prev) => prev - amount);
    setPaymentAmount("");
    setShowPaymentModal(false);
  };

  // // Handle back button functionality
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history - you can customize this
      window.location.href = "/";
    }
  };

  // Show login prompt if no token
  if (!token) {
    return <NoAccess />;
  }
  //Loading Components
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
        <EarningSection
          monthlyIncome={monthlyInComeData}
          refetchMonthlyIncome={refetchMonthlyIncome}
          fetchAvailablePayment={refetchAvailablePayment}
          availablePayment={availablePayments}
          setShowPaymentModal={setShowPaymentModal}
        />
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
      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          availablePayment={availablePayments}
          handlePaymentRequest={handlePaymentRequest}
        />
      )}
      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <CancelConfirmModal
          setShowCancelConfirm={setShowCancelConfirm}
          handleConfirmCancelSession={handleConfirmCancelSession}
        />
      )}
    </div>
  );
};

export default MoshaverDashboard;
