import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, CreditCard, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';

const CounselorWaitlist = () => {
  const [formData, setFormData] = useState({
    parvaneNezam: '',
    nationalCode: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    counselorType: 'therapist'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const counselorTypes = [
    { value: 'therapist', label: 'روانشناس / روان‌درمانگر' },
    { value: 'business', label: 'مشاور کسب و کار' },
    { value: 'educational', label: 'مشاور تحصیلی' },
    { value: 'career', label: 'مشاور شغلی' },
    { value: 'family', label: 'مشاور خانواده' },
    { value: 'other', label: 'سایر' }
  ];

  // Iranian national code validation
  const validateNationalCode = (code) => {
    if (!/^\d{10}$/.test(code)) return false;
    const check = parseInt(code[9]);
    const sum = code.slice(0, 9).split('').reduce((acc, digit, index) => {
      return acc + parseInt(digit) * (10 - index);
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? check === remainder : check === 11 - remainder;
  };

  // Iranian phone number validation
  const validateIranianPhone = (phone) => {
    const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/;
    return iranianPhoneRegex.test(phone);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.parvaneNezam) {
      newErrors.parvaneNezam = 'لطفاً شماره پروانه نظام را وارد کنید';
    } else if (formData.parvaneNezam.length < 5) {
      newErrors.parvaneNezam = 'شماره پروانه نظام باید حداقل ۵ رقم باشد';
    }

    if (!formData.nationalCode) {
      newErrors.nationalCode = 'لطفاً کد ملی خود را وارد کنید';
    } else if (!validateNationalCode(formData.nationalCode)) {
      newErrors.nationalCode = 'کد ملی وارد شده معتبر نیست';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'لطفاً نام خود را وارد کنید';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'نام باید حداقل ۲ کاراکتر باشد';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'لطفاً نام خانوادگی خود را وارد کنید';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'نام خانوادگی باید حداقل ۲ کاراکتر باشد';
    }

    if (!formData.phone) {
      newErrors.phone = 'لطفاً شماره موبایل خود را وارد کنید';
    } else if (!validateIranianPhone(formData.phone)) {
      newErrors.phone = 'شماره موبایل باید ایرانی باشد';
    }

    if (!formData.city) {
      newErrors.city = 'لطفاً شهر محل سکونت خود را وارد کنید';
    } else if (formData.city.length < 2) {
      newErrors.city = 'نام شهر باید حداقل ۲ کاراکتر باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/accounts/Mregister/register_moshaver_from_waitlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          parvaneNezam: '',
          nationalCode: '',
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          counselorType: 'therapist'
        });
      } else {
        setErrors({ general: data.message || 'خطا در ثبت اطلاعات' });
      }
    } catch (error) {
      setErrors({ general: 'خطا در اتصال به سرور' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 flex items-center justify-center" dir="rtl">
        <div className="max-w-md w-full">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              درخواست شما با موفقیت ثبت شد
            </h2>
            <p className="text-gray-600 mb-6">
              اطلاعات شما در لیست انتظار قرار گرفت. به زودی با شما تماس خواهیم گرفت.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              درخواست جدید
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 flex items-center justify-center" dir="rtl">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
            مُشاوِریتو
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            عضویت در لیست انتظار مشاوران
          </p>
        </div>

        {/* Counselor Type Selection */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            نوع مشاوره
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {counselorTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, counselorType: type.value }))}
                className={`py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  formData.counselorType === type.value
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
          {/* General Error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parvane Nezam */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                شماره پروانه نظام
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="parvaneNezam"
                  value={formData.parvaneNezam}
                  onChange={handleInputChange}
                  placeholder="شماره پروانه نظام خود را وارد کنید"
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              {errors.parvaneNezam && (
                <p className="text-red-500 text-sm mt-1">{errors.parvaneNezam}</p>
              )}
            </div>

            {/* National Code */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                کد ملی
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="nationalCode"
                  value={formData.nationalCode}
                  onChange={handleInputChange}
                  placeholder="کد ملی ۱۰ رقمی"
                  maxLength="10"
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>
              {errors.nationalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.nationalCode}</p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                نام
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="نام خود را وارد کنید"
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <User className="w-6 h-6" />
                </div>
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                نام خانوادگی
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="نام خانوادگی خود را وارد کنید"
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                شماره موبایل
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                شهر محل سکونت
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="شهر محل سکونت خود را وارد کنید"
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  ثبت در لیست انتظار
                  <ArrowRight className="w-5 h-5 mr-2" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mr-3">
              <p className="text-sm text-blue-800">
                <strong>توجه:</strong> لطفاً تمامی اطلاعات را به دقت تکمیل کنید. پس از بررسی مدارک، تیم ما با شما تماس خواهد گرفت.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          <p>قبلاً ثبت نام کرده‌اید؟ <a href="#" className="text-teal-600 hover:text-teal-700 font-bold">وارد شوید</a></p>
        </div>
      </div>
    </div>
  );
};

export default CounselorWaitlist;