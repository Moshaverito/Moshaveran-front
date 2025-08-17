import React, { useState, useEffect } from "react";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Timer,
  ArrowRight,
  ArrowLeft,
  User,
} from "lucide-react";

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  // Validate Iranian phone number
  const validatePhoneNumber = (phone) => {
    const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/;
    return iranianPhoneRegex.test(phone);
  };

  // Validate password strength
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid:
        minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar,
    };
  };

  // Normalize phone number
  const normalizePhoneNumber = (phone) => {
    let normalized = phone.replace(/\s+/g, "");
    if (normalized.startsWith("+98")) {
      normalized = "0" + normalized.slice(3);
    }
    return normalized;
  };

  // API call to send OTP
  const sendOTP = async () => {
    setLoading(true);
    setErrors({});

    try {
      const normalizedPhone = normalizePhoneNumber(formData.phoneNumber);

      const response = await fetch(
        "https://api.moshaveritoo.ir/api/accounts/register/sendCode/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: normalizedPhone,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setCountdown(120); // 2 minutes
        setCanResend(false);
      } else {
        setErrors({ phone: data.error || "خطا در ارسال کد تایید" });
      }
    } catch (error) {
      setErrors({ phone: "خطا در اتصال به سرور" });
    } finally {
      setLoading(false);
    }
  };

  // API call to verify OTP
  const verifyOTP = async () => {
    setLoading(true);
    setErrors({});

    try {
      const normalizedPhone = normalizePhoneNumber(formData.phoneNumber);

      const response = await fetch(
        "https://api.moshaveritoo.ir/api/accounts/register/verify/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: normalizedPhone,
            code: formData.verificationCode,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStep(3);
      } else {
        setErrors({ code: data.error || "کد تایید نامعتبر است" });
      }
    } catch (error) {
      setErrors({ code: "خطا در اتصال به سرور" });
    } finally {
      setLoading(false);
    }
  };

  // API call to register user
  const registerUser = async () => {
    setLoading(true);
    setErrors({});

    try {
      const normalizedPhone = normalizePhoneNumber(formData.phoneNumber);

      const response = await fetch(
        "https://api.moshaveritoo.ir/api/accounts/register/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: normalizedPhone,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store tokens
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        setStep(4);

        // Redirect to login or dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setErrors({ general: data.error || "خطا در ثبت‌نام" });
      }
    } catch (error) {
      setErrors({ general: "خطا در اتصال به سرور" });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for each step
  const handleSubmit = () => {
    if (step === 1) {
      // Validate phone number
      if (!formData.phoneNumber.trim()) {
        setErrors({ phone: "شماره همراه الزامی است" });
        return;
      }

      if (!validatePhoneNumber(formData.phoneNumber)) {
        setErrors({ phone: "شماره همراه معتبر نیست" });
        return;
      }

      sendOTP();
    } else if (step === 2) {
      // Validate OTP
      if (!formData.verificationCode.trim()) {
        setErrors({ code: "کد تایید الزامی است" });
        return;
      }

      if (formData.verificationCode.length !== 6) {
        setErrors({ code: "کد تایید باید ۶ رقم باشد" });
        return;
      }

      verifyOTP();
    } else if (step === 3) {
      // Validate password
      if (!formData.password.trim()) {
        setErrors({ password: "رمز عبور الزامی است" });
        return;
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        setErrors({ password: "رمز عبور شرایط امنیتی را ندارد" });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "تکرار رمز عبور مطابقت ندارد" });
        return;
      }

      registerUser();
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (canResend) {
      sendOTP();
    }
  };

  // Step 1: Phone Number Input
  const renderPhoneStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
          <Phone className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          شماره همراه خود را وارد کنید
        </h2>
        <p className="text-gray-600">
          کد تایید به شماره همراه شما ارسال خواهد شد
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            شماره همراه
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="09123456789"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-left bg-white text-gray-800"
              dir="ltr"
            />
            <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "در حال ارسال..." : "ارسال کد تایید"}
        </button>
      </div>
    </div>
  );

  // Step 2: OTP Verification
  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Timer className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          کد تایید را وارد کنید
        </h2>
        <p className="text-gray-600">
          کد ۶ رقمی ارسال شده به شماره {formData.phoneNumber} را وارد کنید
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            کد تایید
          </label>
          <input
            type="text"
            value={formData.verificationCode}
            onChange={(e) =>
              handleInputChange(
                "verificationCode",
                e.target.value.replace(/\D/g, "").slice(0, 6)
              )
            }
            placeholder="123456"
            maxLength="6"
            className="w-full px-4 py-3 border bg-white text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-2xl tracking-widest"
            dir="ltr"
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.code}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend}
            className="text-sm text-teal-600 bg-white hover:text-teal-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {canResend ? "ارسال مجدد کد" : `ارسال مجدد در ${countdown} ثانیه`}
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-gray-600 hover:text-gray-700 flex items-center gap-1 bg-white px-3 py-2 rounded-lg transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
            ویرایش شماره
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || formData.verificationCode.length !== 6}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "در حال تایید..." : "تایید کد"}
        </button>
      </div>
    </div>
  );

  // Step 3: Password Setup
  const renderPasswordStep = () => {
    const passwordValidation = validatePassword(formData.password);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            رمز عبور خود را تنظیم کنید
          </h2>
          <p className="text-gray-600">
            رمز عبور قوی برای امنیت حساب کاربری شما انتخاب کنید
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.minLength
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={
                      passwordValidation.minLength
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    حداقل ۸ کاراکتر
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.hasUpperCase
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={
                      passwordValidation.hasUpperCase
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    حرف بزرگ انگلیسی
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.hasLowerCase
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={
                      passwordValidation.hasLowerCase
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    حرف کوچک انگلیسی
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.hasNumbers
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={
                      passwordValidation.hasNumbers
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    عدد
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      passwordValidation.hasSpecialChar
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={
                      passwordValidation.hasSpecialChar
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    کاراکتر خاص
                  </span>
                </div>
              </div>
            )}

            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تکرار رمز عبور
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="رمز عبور خود را مجدداً وارد کنید"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  رمز عبور و تکرار آن باید یکسان باشند
                </p>
              )}

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.general && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.general}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              مرحله قبل
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                loading ||
                !passwordValidation.isValid ||
                formData.password !== formData.confirmPassword
              }
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Step 4: Success
  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ثبت‌نام با موفقیت انجام شد!
        </h2>
        <p className="text-gray-600 mb-4">
          خوش آمدید! حساب کاربری شما با موفقیت ایجاد شد.
        </p>
        <p className="text-sm text-gray-500">در حال انتقال به صفحه ورود...</p>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stepNum <= step
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNum}
                </div>
              ))}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form content */}
          <div onSubmit={handleSubmit}>
            {step === 1 && renderPhoneStep()}
            {step === 2 && renderOTPStep()}
            {step === 3 && renderPasswordStep()}
            {step === 4 && renderSuccessStep()}
          </div>

          {/* Footer */}
          {step < 4 && (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                قبلاً حساب کاربری دارید؟{" "}
                <a
                  href="/login"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  ورود
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
