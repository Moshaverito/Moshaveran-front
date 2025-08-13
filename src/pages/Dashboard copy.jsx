
import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, Clock, Shield, CheckCircle, PlayCircle,AlertCircle,Play, MessageCircle, Video, Phone, BookOpen, Heart, Menu, X, ChevronDown, Smartphone, Globe, Award, User, Calendar, Trophy, Eye, DollarSign, FileText, AlertTriangle, Plus, Minus, CreditCard, TrendingUp, ChevronRight, CheckSquare, XSquare, Hourglass } from 'lucide-react';

const MoshaverDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [cancelSessionId, setCancelSessionId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [token, setToken] = useState(() => {
      try {
        return localStorage.getItem('accessToken') || null;
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
      }
    });
  
  // Data states
  const [currentSessions, setCurrentSessions] = useState([]);
  const [pendingSessions, setPendingSessions] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [availablePayment, setAvailablePayment] = useState(0);
  const [error, setError] = useState(null);

  // API call functions
  const fetchCurrentSessions = async () => {
    if (!token) {
      setError('توکن دسترسی یافت نشد');
      return;
    }

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('https://api.moshaveritoo.ir/api/sessions/sessions/moshaver_sessions/', { headers });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است. لطفاً مجدداً وارد شوید');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCurrentSessions(data);
    } catch (error) {
      console.error('Error fetching current sessions:', error);
      setError('خطا در دریافت جلسات فعلی - عدم اتصال به سرور');
    }
  };

  const fetchSessionHistory = async () => {
    if (!token) return;

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('https://api.moshaveritoo.ir/api/sessions/sessions/history_moshaver/', { headers });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSessionHistory(data);
    } catch (error) {
      console.error('Error fetching session history:', error);
      setError('خطا در دریافت تاریخچه جلسات - عدم اتصال به سرور');
    }
  };

  const fetchMonthlyIncome = async () => {
    if (!token) return;

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('https://api.moshaveritoo.ir/api/payment/income/monthly-income/', { headers });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMonthlyIncome(data.income ?? data.amount ?? 0);
    } catch (error) {
      console.error('Error fetching monthly income:', error);
      setError('خطا در دریافت درآمد ماهانه - عدم اتصال به سرور');
    }
  };

  const fetchAvailablePayment = async () => {
    if (!token) return;

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('https://api.moshaveritoo.ir/api/payment/income/available-income/', { headers });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAvailablePayment(data.available_income ?? data.payment ?? 0);
    } catch (error) {
      console.error('Error fetching available payment:', error);
      setError('خطا در دریافت موجودی قابل برداشت - عدم اتصال به سرور');
    }
  };

  const fetchPendingSessions = async () => {
    if (!token) return;

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('https://api.moshaveritoo.ir/api/sessions/sessions/pending_sessions/', { headers });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPendingSessions(data);
    } catch (error) {
      console.error('Error fetching pending sessions:', error);
      setError('خطا در دریافت جلسات در انتظار - عدم اتصال به سرور');
    }
  };

  // Load all data
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchCurrentSessions(),
          fetchSessionHistory(),
          fetchMonthlyIncome(),
          fetchAvailablePayment(),
          fetchPendingSessions()
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('خطا در بارگذاری داده‌های داشبورد');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadAllData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleCancelSession = async (sessionId) => {
    setCancelSessionId(sessionId);
    setShowCancelConfirm(true);
  };

  const confirmCancelSession = async () => {
    if (!token) return;

    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      const response = await fetch('https://api.moshaveritoo.ir/api/sessions/sessions/cancel_by_moshaver/', {
        method: 'POST',
        headers,
        body: JSON.stringify({ session_id: cancelSessionId })
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است');
          return;
        }
        throw new Error('Failed to cancel session');
      }
      
      setCurrentSessions(prev => prev.filter(session => session.id !== cancelSessionId));
      setShowCancelConfirm(false);
      setCancelSessionId(null);
    } catch (error) {
      console.error('Error canceling session:', error);
      alert('خطا در لغو جلسه');
    }
  };

  const handlePendingSession = async (sessionId, action) => {
    if (!token) return;

    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      const response = await fetch('https://api.moshaveritoo.ir/api/sessions/sessions/update_session_status/', {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          session_id: sessionId, 
          action: action 
        })
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setError('توکن دسترسی منقضی شده است');
          return;
        }
        throw new Error('Failed to update session');
      }
      
      if (action === 'accept') {
        const session = pendingSessions.find(s => s.id === sessionId);
        if (session) {
          setCurrentSessions(prev => [...prev, {
            ...session,
            status: 'approved'
          }]);
        }
      }
      setPendingSessions(prev => prev.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error('Error updating session:', error);
      alert('خطا در به‌روزرسانی جلسه');
    }
  };

  const handlePaymentRequest = async () => {
    if (!token) return;

    try {
      const amount = parseInt(paymentAmount);
      if (amount <= availablePayment && amount > 0) {
        const headers = { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        
        const response = await fetch('https://api.moshaveritoo.ir/api/payment/income/request-payment/', {
          method: 'POST',
          headers,
          body: JSON.stringify({ amount: amount })
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            setToken(null);
            setError('توکن دسترسی منقضی شده است');
            return;
          }
          throw new Error('Failed to request payment');
        }
        
        setAvailablePayment(prev => prev - amount);
        setPaymentAmount('');
        setShowPaymentModal(false);
        alert('درخواست پرداخت با موفقیت ارسال شد');
      } else {
        alert('مبلغ وارد شده نامعتبر است');
      }
    } catch (error) {
      console.error('Error requesting payment:', error);
      alert('خطا در درخواست پرداخت');
    }
  };

  const handleLogout = () => {
    setToken(null);
    // In a real app, you would redirect to login
    console.log('User logged out');
  };

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageCircle className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getSessionTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-green-600 bg-green-100';
      case 'phone': return 'text-blue-600 bg-blue-100';
      case 'chat': return 'text-teal-600 bg-teal-100';
      default: return 'text-teal-600 bg-teal-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'ongoing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-purple-600 bg-purple-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'ignored': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'در انتظار';
      case 'approved': return 'تأیید شده';
      case 'ongoing': return 'در حال انجام';
      case 'completed': return 'تکمیل شده';
      case 'cancelled': return 'لغو شده';
      case 'ignored': return 'نادیده گرفته شده';
      default: return status;
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('fa-IR') + ' - ' + date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('fa-IR');
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };

  const getClientName = (client) => {
    // If client has name, use it, otherwise show generic name
    if (client && (client.first_name || client.last_name)) {
      return `${client.first_name || ''} ${client.last_name || ''}`.trim();
    }
    return client?.username || 'مراجع ناشناس';
  };

  // Show login prompt if no token
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center" dir="rtl">
        <div className="text-center bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">دسترسی محدود</h2>
          <p className="text-gray-600 mb-6">
            برای دسترسی به داشبورد لطفاً وارد شوید
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition-all"
          >
            ورود به سیستم
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">در حال بارگذاری داشبورد...</p>
          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/50 rounded-full transition-all">
              <ArrowRight className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              داشبورد مشاور
            </h1>
            {/* Token Status Indicator and Logout */}
            <div className="mr-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${token ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {token ? 'متصل' : 'قطع ارتباط'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all text-sm"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Error Alert */}
        {error && (
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
        )}

        {/* Current Sessions */}
        <section className="mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-teal-600" />
                جلسات فعلی ({currentSessions.length})
              </h2>
              <button 
                onClick={() => setShowSessionModal(true)}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1"
              >
                مشاهده همه
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSessions.slice(0, 2).map((session) => (
                <div key={session.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${getSessionTypeColor(session.session_type)}`}>
                        {getSessionTypeIcon(session.session_type)}
                      </div>
                      <div>
                        <div className="font-medium">{getClientName(session.client)}</div>
                        <div className="text-sm text-gray-600">{session.duration} دقیقه</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                        {getStatusText(session.status)}
                      </div>
                      <button 
                        onClick={() => handleCancelSession(session.id)}
                        className="text-red-500 hover:text-red-700 p-1"
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
              
              {currentSessions.length === 0 && (
                <div className="col-span-2 text-center text-gray-500 py-8">
                  هیچ جلسه فعلی وجود ندارد
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pending Sessions (Waiting List) */}
        <section className="mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Hourglass className="w-6 h-6 text-orange-600" />
              لیست انتظار ({pendingSessions.length})
            </h2>
            
            <div className="space-y-4">
              {pendingSessions.map((session) => (
                <div key={session.id} className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getSessionTypeColor(session.session_type)}`}>
                        {getSessionTypeIcon(session.session_type)}
                      </div>
                      <div>
                        <div className="font-medium">{getClientName(session.client)}</div>
                        <div className="text-sm text-gray-600">{session.reason} • {session.duration} دقیقه</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handlePendingSession(session.id, 'accept')}
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                        title="پذیرش جلسه"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handlePendingSession(session.id, 'ignore')}
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
              ))}
              
              {pendingSessions.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  هیچ جلسه در انتظاری وجود ندارد
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Earnings Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  درآمد ماهانه
                </h3>
                <button 
                  onClick={fetchMonthlyIncome}
                  className="text-green-600 hover:text-green-700 p-1"
                  title="به‌روزرسانی"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {monthlyIncome.toLocaleString('fa-IR')} تومان
              </div>
              <div className="text-sm text-gray-600">درآمد ماه جاری</div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  قابل برداشت
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={fetchAvailablePayment}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="به‌روزرسانی"
                  >
                    <ChevronRight className="w-4 h-4" />
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
                {availablePayment.toLocaleString('fa-IR')} تومان
              </div>
              <div className="text-sm text-gray-600">موجودی قابل برداشت</div>
            </div>
          </div>
        </section>

        {/* Session History */}
        <section className="mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-600" />
                تاریخچه جلسات ({sessionHistory.length})
              </h2>
              <button 
                onClick={fetchSessionHistory}
                className="text-purple-600 hover:text-purple-700 p-1"
                title="به‌روزرسانی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {sessionHistory.map((session) => (
                <div key={session.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getSessionTypeColor(session.session_type)}`}>
                        {getSessionTypeIcon(session.session_type)}
                      </div>
                      <div>
                        <div className="font-medium">{getClientName(session.client)}</div>
                        <div className="text-sm text-gray-600">
                          {formatDateTime(session.end_time)} • {session.duration} دقیقه
                        </div>
                        <div className="text-xs text-gray-500">
                          موضوع: {session.reason}
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-green-600">
                        {parseFloat(session.refund_amount || 0).toLocaleString('fa-IR')} تومان
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)} mt-1`}>
                        {getStatusText(session.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {sessionHistory.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  هیچ سابقه جلسه‌ای وجود ندارد
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">به زودی...</h2>
            <p className="text-gray-600 mb-4">
              قابلیت ارائه دوره و وبینار برای کاربران به زودی اضافه خواهد شد. با این ویژگی می‌توانید دانش خود را با جمع بیشتری به اشتراک بگذارید.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              <span>در حال توسعه</span>
            </div>
          </div>
        </section>
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">همه جلسات</h3>
                <button 
                  onClick={() => setShowSessionModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {currentSessions.map((session) => (
                  <div key={session.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${getSessionTypeColor(session.session_type)}`}>
                          {getSessionTypeIcon(session.session_type)}
                        </div>
                        <div>
                          <div className="font-medium">{session.client_name}</div>
                          <div className="text-sm text-gray-600">{session.duration} دقیقه</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCancelSession(session.id)}
                        className="text-red-500 hover:text-red-700 p-1"
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
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
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
                  حداکثر: {availablePayment.toLocaleString('fa-IR')} تومان
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handlePaymentRequest}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-all"
                  disabled={!paymentAmount || parseInt(paymentAmount) > availablePayment}
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
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
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
      )}
    </div>
  );
};

export default MoshaverDashboard;