import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
import { Translation, useTranslation } from "react-i18next";

import { useRegularLogin } from "../hooks/useRegularLogin";
import { useSendOTP } from "../hooks/useSendOTP";
import { useOTPVerification } from "../hooks/useOTPVerification";

const MoshaveritoLogin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("regular"); // 'regular' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    otpCode: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { regularLogin, isLoggingIn } = useRegularLogin();
  const { sendOTP, isSendingOTP } = useSendOTP();
  const { otpVerification, isOtpVerifying } = useOTPVerification();

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Iranian phone number validation
  const validateIranianPhone = (phone) => {
    const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/;
    return iranianPhoneRegex.test(phone);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (loginType === "regular") {
      // Regular login validation
      if (!formData.phone) {
        newErrors.phone = "لطفاً شماره موبایل خود را وارد کنید";
      } else if (!validateIranianPhone(formData.phone)) {
        newErrors.phone = "شماره موبایل باید ایرانی باشد";
      }

      if (!formData.password) {
        newErrors.password = "لطفاً رمز عبور خود را وارد کنید";
      } else if (formData.password.length < 6) {
        newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
      }
    } else {
      // OTP login validation
      if (!formData.phone) {
        newErrors.phone = "لطفاً شماره موبایل خود را وارد کنید";
      } else if (!validateIranianPhone(formData.phone)) {
        newErrors.phone = "شماره موبایل باید ایرانی باشد";
      }

      if (showOtpInput && !formData.otpCode) {
        newErrors.otpCode = "لطفاً کد تأیید را وارد کنید";
      } else if (showOtpInput && formData.otpCode.length !== 6) {
        newErrors.otpCode = "کد تأیید باید ۶ رقم باشد";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle regular login and success login
  function handleRegularLogin(e) {
    e.preventDefault();
    if (!validateForm()) return;
    regularLogin(formData, {
      onSuccess: (data) => handleSuccessLogin(data),
    });
  }

  // Handle OTP request
  const handleOtpRequest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    sendOTP(formData, {
      onSuccess: () => {
        setOtpSent(true);
        setShowOtpInput(true);
        setOtpTimer(120); // 2 minutes
      },
    });
  };

  // Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    otpVerification(formData, {
      onSuccess: (data) => handleSuccessLogin(data),
    });
  };

  // handles the successful login process
  function handleSuccessLogin(data) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("accessToken", data.data.access);
    localStorage.setItem("refreshToken", data.data.refresh);
    // localStorage.setItem('userRole', data.role);
    // localStorage.setItem('streak', data.streak);

    // Update the parent App.jsx state
    setIsLoggedIn(true);

    // Dispatch the custom event
    window.dispatchEvent(new Event("loginStateChanged"));

    navigate("/dashboard");
  }

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 flex items-center justify-center"
      dir="rtl"
    >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
            مُشاوِریتو
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {loginType === "regular"
              ? "ورود به حساب کاربری"
              : "ورود با کد تأیید"}
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                setLoginType("regular");
                setFormData({ phone: "", password: "", otpCode: "" });
                setErrors({});
                setOtpSent(false);
                setShowOtpInput(false);
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                loginType === "regular"
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 bg-inherit"
              }`}
            >
              ورود معمولی
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType("otp");
                setFormData({ phone: "", password: "", otpCode: "" });
                setErrors({});
                setOtpSent(false);
                setShowOtpInput(false);
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                loginType === "otp"
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 bg-inherit"
              }`}
            >
              ورود با کد تأیید
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
          {/* General Error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          {loginType === "regular" ? (
            /* Regular Login Form */
            <div className="space-y-6">
              {/* Phone Input */}
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="phone"
                >
                  شماره موبایل
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-gray-50 placeholder:text-gray-400 text-gray-900"
                  />
                  <div
                    className="absolute right-3 text-gray-400 w-6 h-6"
                    style={{
                      top: "50%",
                      left: "0",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  رمز عبور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-gray-50 placeholder:text-gray-400 text-gray-900"
                  />
                  <div
                    className="absolute right-3 text-gray-400"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Lock className="w-6 h-6" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 hover:text-gray-600 bg-inherit"
                    style={{
                      top: "50%",
                      left: "0",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleRegularLogin}
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoggingIn ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    ورود
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* OTP Login Form */
            <div className="space-y-6">
              {/* Phone Input */}
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
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-gray-50 placeholder:text-gray-400 text-gray-900"
                    disabled={showOtpInput}
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <Phone className="w-6 h-6" />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* OTP Input */}
              {showOtpInput && (
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    کد تأیید
                  </label>
                  <input
                    type="text"
                    name="otpCode"
                    value={formData.otpCode}
                    onChange={handleInputChange}
                    placeholder="کد ۶ رقمی را وارد کنید"
                    maxLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-center text-lg tracking-widest bg-gray-50 placeholder:text-gray-400 text-gray-900"
                  />
                  {errors.otpCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.otpCode}
                    </p>
                  )}
                </div>
              )}

              {/* Timer Display */}
              {showOtpInput && otpTimer > 0 && (
                <div className="text-center text-gray-600">
                  <p>
                    درخواست مجدد کد تأیید تا {formatTimer(otpTimer)} دیگر
                    امکان‌پذیر است
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={
                  showOtpInput ? handleOtpVerification : handleOtpRequest
                }
                disabled={isSendingOTP || isOtpVerifying}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSendingOTP || isOtpVerifying ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : showOtpInput ? (
                  <>
                    تأیید کد
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </>
                ) : (
                  <>
                    ارسال کد تأیید
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </>
                )}
              </button>

              {/* Resend OTP Button */}
              {showOtpInput && otpTimer === 0 && (
                <button
                  type="button"
                  onClick={handleOtpRequest}
                  className="w-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 bg-inherit"
                >
                  ارسال مجدد کد تأیید
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          <p>
            حساب کاربری ندارید؟{" "}
            <a
              href="/signup"
              className="text-teal-600 hover:text-teal-700 font-bold"
            >
              ثبت نام کنید
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoshaveritoLogin;
