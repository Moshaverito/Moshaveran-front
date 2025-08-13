import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, CreditCard, UserCheck, ArrowRight, CheckCircle, Briefcase, GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';

const CounselorWaitlist = () => {
  const [step, setStep] = useState(1); // 1: counselor type selection, 2: form details
  const [formData, setFormData] = useState({
    counselorType: '',
    // Common fields
    nationalCode: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    // Therapist/Couple specific
    parvaneNezam: '',
    // Business specific
    profession: '',
    // Educational specific
    educationLevel: '',
    university: '',
    workExperience: '',
    // Islamic specific
    workYears: '',
    licenseSource: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const counselorTypes = [
    { value: 'therapist', label: 'روانشناس / روان‌درمانگر', icon: User },
    { value: 'couple', label: 'زوج درمانگر', icon: UserCheck },
    { value: 'business', label: 'مشاور کسب و کار/کوچینگ', icon: Briefcase },
    { value: 'educational', label: 'کنکور/مشاور تحصیلی', icon: GraduationCap },
    { value: 'islamic', label: 'مشاور اسلامی', icon: BookOpen }
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
    
    // Limit phone number to 11 digits
    if (name === 'phone' && value.length > 11) return;
    
    // Limit national code to 10 digits
    if (name === 'nationalCode' && value.length > 10) return;
    
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

  // Handle counselor type selection
  const handleCounselorTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, counselorType: type }));
    setStep(2);
  };
  // Handle back button functionality
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history - you can customize this
      window.location.href = '/';
    }
  };
  // Validate form based on counselor type
  const validateForm = () => {
    const newErrors = {};
    const { counselorType } = formData;

    // Common validations
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

    // Type-specific validations
    if (counselorType === 'therapist' || counselorType === 'couple') {
      if (!formData.parvaneNezam) {
        newErrors.parvaneNezam = 'لطفاً شماره پروانه نظام را وارد کنید';
      } else if (formData.parvaneNezam.length < 5) {
        newErrors.parvaneNezam = 'شماره پروانه نظام باید حداقل ۵ رقم باشد';
      }
    } else if (counselorType === 'business') {
      if (!formData.profession) {
        newErrors.profession = 'لطفاً تخصص خود را وارد کنید';
      } else if (formData.profession.length < 2) {
        newErrors.profession = 'تخصص باید حداقل ۲ کاراکتر باشد';
      }
    } else if (counselorType === 'educational') {
      if (!formData.educationLevel) {
        newErrors.educationLevel = 'لطفاً مقطع تحصیلی خود را وارد کنید';
      }
      if (!formData.university) {
        newErrors.university = 'لطفاً نام دانشگاه خود را وارد کنید';
      }
      if (!formData.workExperience) {
        newErrors.workExperience = 'لطفاً سابقه کاری خود را وارد کنید';
      }
    } else if (counselorType === 'islamic') {
      if (!formData.workYears) {
        newErrors.workYears = 'لطفاً سال‌های تجربه کاری خود را وارد کنید';
      }
      if (!formData.licenseSource) {
        newErrors.licenseSource = 'لطفاً محل دریافت مجوز را وارد کنید';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.moshaveritoo.ir/api/accounts/Mregister/register_moshaver_from_waitlist/', {
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
          counselorType: '',
          nationalCode: '',
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          parvaneNezam: '',
          profession: '',
          educationLevel: '',
          university: '',
          workExperience: '',
          workYears: '',
          licenseSource: ''
        });
        setStep(1);
      } else {
        setErrors({ general: data.message || 'خطا در ثبت اطلاعات' });
      }
    } catch (error) {
      setErrors({ general: 'خطا در اتصال به سرور' });
    } finally {
      setLoading(false);
    }
  };

  // Success page
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

        {/* Step 1: Counselor Type Selection */}
        {step === 1 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              نوع مشاوره خود را انتخاب کنید
            </h3>
            <div className="space-y-4">
              {counselorTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => handleCounselorTypeSelect(type.value)}
                    className="w-full p-4 bg-white/50 hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-500 hover:text-white border border-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-between group"
                  >
                    <div className="flex items-center">
                      <IconComponent className="w-6 h-6 text-teal-600 group-hover:text-white ml-3" />
                      <span className="font-medium text-gray-700 group-hover:text-white">
                        {type.label}
                      </span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Form Details */}
        {step === 2 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Back Button */}
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-teal-600 hover:text-teal-700 mb-4 transition-colors"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              بازگشت
            </button>

            {/* Selected Type Display */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg p-3 mb-6 text-center">
              <span className="font-bold">
                {counselorTypes.find(t => t.value === formData.counselorType)?.label}
              </span>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-6">
              {/* Type-specific fields first */}
              {(formData.counselorType === 'therapist' || formData.counselorType === 'couple') && (
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
              )}

              {formData.counselorType === 'business' && (
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    تخصص شما
                  </label>
                  <div className="relative">
                    <textarea
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      placeholder="تخصص و حوزه فعالیت خود را بنویسید..."
                      rows="4"
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 resize-none"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <Briefcase className="w-6 h-6" />
                    </div>
                  </div>
                  {errors.profession && (
                    <p className="text-red-500 text-sm mt-1">{errors.profession}</p>
                  )}
                </div>
              )}

              {formData.counselorType === 'educational' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      مقطع تحصیلی
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        placeholder="مثال: کارشناسی ارشد"
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    </div>
                    {errors.educationLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      دانشگاه
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        placeholder="نام دانشگاه محل تحصیل"
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    </div>
                    {errors.university && (
                      <p className="text-red-500 text-sm mt-1">{errors.university}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      سابقه کاری (سال)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleInputChange}
                        placeholder="تعداد سال‌های تجربه کاری"
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                    {errors.workExperience && (
                      <p className="text-red-500 text-sm mt-1">{errors.workExperience}</p>
                    )}
                  </div>
                </>
              )}

              {formData.counselorType === 'islamic' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      سال‌های تجربه کاری
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="workYears"
                        value={formData.workYears}
                        onChange={handleInputChange}
                        placeholder="تعداد سال‌های فعالیت در زمینه مشاوره اسلامی"
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                    {errors.workYears && (
                      <p className="text-red-500 text-sm mt-1">{errors.workYears}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      محل دریافت مجوز
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="licenseSource"
                        value={formData.licenseSource}
                        onChange={handleInputChange}
                        placeholder="مؤسسه یا مرجعی که مجوز را دریافت کرده‌اید"
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    </div>
                    {errors.licenseSource && (
                      <p className="text-red-500 text-sm mt-1">{errors.licenseSource}</p>
                    )}
                  </div>
                </>
              )}

              {/* Common fields */}
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
                    maxLength="11"
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
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    ثبت در لیست انتظار
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Info Box - only show on step 2 */}
        {step === 2 && (
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
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          <p>قبلاً ثبت نام کرده‌اید؟ <a href="#" className="text-teal-600 hover:text-teal-700 font-bold">وارد شوید</a></p>
        </div>
      </div>
    </div>
  );
};

export default CounselorWaitlist;