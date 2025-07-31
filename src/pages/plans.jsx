import React, { useState } from 'react';
import { ArrowRight, Crown, Star, Zap, Check, Gift, AlertCircle, CheckCircle, Users, Shield, Clock, Award } from 'lucide-react';

const PlansPage = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountStatus, setDiscountStatus] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckingDiscount, setIsCheckingDiscount] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const plans = [
    {
      id: 1001,
      name: 'یک ماهه',
      duration: '1 ماه',
      originalPrice: 200000,
      discount: 0,
      popular: false,
      features: [
        'دسترسی کامل به پروفایل',

      ]
    },
    {
      id: 1002,
      name: 'سه ماهه',
      duration: '3 ماه',
      originalPrice: 600000,
      discount: 30,
      popular: true,
      features: [
      ]
    },
    {
      id: 1003,
      name: 'یک ساله',
      duration: '12 ماه',
      originalPrice: 2400000,
      discount: 40,
      popular: false,
      features: [

      ]
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const calculateFinalPrice = (plan) => {
    const planDiscount = plan.discount;
    const totalDiscount = Math.min(planDiscount + discountPercent, 70); // Max 70% total discount
    return Math.round(plan.originalPrice * (1 - totalDiscount / 100));
  };

  const checkDiscountCode = async () => {
    if (!discountCode.trim()) {
      setDiscountStatus('error');
      return;
    }
    
    setIsCheckingDiscount(true);
    
    try {
      // Simulate API call to check discount code
      const response = await fetch('/api/getdiscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: discountCode })
      });
      
      if (response.ok) {
        const data = await response.json();
        setDiscountPercent(data.percent || 0);
        setDiscountStatus('success');
      } else {
        setDiscountStatus('error');
        setDiscountPercent(0);
      }
    } catch (error) {
      // Simulate discount check for demo
      setTimeout(() => {
        if (discountCode.toLowerCase() === 'welcome10') {
          setDiscountPercent(10);
          setDiscountStatus('success');
        } else if (discountCode.toLowerCase() === 'special20') {
          setDiscountPercent(20);
          setDiscountStatus('success');
        } else {
          setDiscountStatus('error');
          setDiscountPercent(0);
        }
        setIsCheckingDiscount(false);
      }, 1000);
      return;
    }
    
    setIsCheckingDiscount(false);
  };

  const handlePayment = async (plan) => {
    setSelectedPlan(plan.id);
    setIsProcessingPayment(true);
    
    try {
      // Get access token from localStorage or auth context
      const accessToken = localStorage.getItem('accessToken') || 'demo-token';
      
      const response = await fetch('/api/sendpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          planCode: plan.id,
          discountCode: discountCode || null,
          finalPrice: calculateFinalPrice(plan)
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setPaymentStatus('success');
        // Redirect to payment gateway or success page
        window.location.href = data.paymentUrl || '/success';
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      // Simulate payment process for demo
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate for demo
        setPaymentStatus(success ? 'success' : 'error');
        setIsProcessingPayment(false);
        setSelectedPlan(null);
        
        if (success) {
          setTimeout(() => {
            alert('پرداخت با موفقیت انجام شد! به صفحه پروفایل هدایت می‌شوید.');
          }, 500);
        }
        
        setTimeout(() => {
          setPaymentStatus(null);
        }, 3000);
      }, 2000);
      return;
    }
    
    setIsProcessingPayment(false);
    setSelectedPlan(null);
  };

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
              پلن‌های اشتراک
            </h1>
          </div>
        </div>
      </div>


      {/* Discount Code Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-teal-600" />
              <h3 className="text-lg font-bold text-gray-800">کد تخفیف دارید؟</h3>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف خود را وارد کنید"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={checkDiscountCode}
                disabled={isCheckingDiscount}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
              >
                {isCheckingDiscount ? 'بررسی...' : 'اعمال'}
              </button>
            </div>
            
            {/* Discount Status */}
            {discountStatus && (
              <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${
                discountStatus === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {discountStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>کد تخفیف معتبر است! {discountPercent}% تخفیف اضافی اعمال شد</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>کد تخفیف نامعتبر است</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const finalPrice = calculateFinalPrice(plan);
              const totalDiscount = plan.discount + discountPercent;
              
              return (
                <div key={plan.id} className={`relative bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''
                }`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        محبوب‌ترین
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        plan.id === 1001 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                        plan.id === 1002 ? 'bg-gradient-to-r from-teal-500 to-blue-500' :
                        'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}>
                        {plan.id === 1001 && <Clock className="w-8 h-8 text-white" />}
                        {plan.id === 1002 && <Zap className="w-8 h-8 text-white" />}
                        {plan.id === 1003 && <Award className="w-8 h-8 text-white" />}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                      <p className="text-gray-600">{plan.duration}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-6">
                      {(plan.discount > 0 || discountPercent > 0) && (
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-gray-500 line-through text-lg">
                            {formatPrice(plan.originalPrice)} تومان
                          </span>
                          {totalDiscount > 0 && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                              {totalDiscount}% تخفیف
                            </span>
                          )}
                        </div>
                      )}
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                        {formatPrice(finalPrice)} تومان
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {plan.id === 1001 ? 'ماهانه' : plan.id === 1002 ? 'هر 3 ماه' : 'سالانه'}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handlePayment(plan)}
                      disabled={isProcessingPayment && selectedPlan === plan.id}
                      className={`w-full py-4 px-6 rounded-xl font-medium transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white'
                          : 'bg-white/50 hover:bg-white/70 text-gray-800 border border-gray-300'
                      } disabled:opacity-50`}
                    >
                      {isProcessingPayment && selectedPlan === plan.id ? (
                        'در حال پردازش...'
                      ) : (
                        'انتخاب و پرداخت'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Status */}
      {paymentStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            {paymentStatus === 'success' ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">پرداخت موفق</h3>
                <p className="text-gray-600">اشتراک شما با موفقیت فعال شد</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">خطا در پرداخت</h3>
                <p className="text-gray-600">لطفاً دوباره تلاش کنید</p>
              </>
            )}
          </div>
        </div>
      )}


    </div>
  );
};

export default PlansPage;