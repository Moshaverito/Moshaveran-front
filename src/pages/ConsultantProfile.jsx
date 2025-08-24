import React, { useState, useEffect } from "react";
import {
  User,
  FileText,
  GraduationCap,
  Award,
  Image,
  Video,
  Mic,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react";

const ConsultantProfile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    license_number: "",
    degrees: "",
    specialty: "",
    image_url: "",
    video_url: "",
    audio_url: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const specialties = [
    { value: "clinical_psychology", label: "روانشناسی بالینی" },
    { value: "counseling_psychology", label: "روانشناسی مشاوره" },
    { value: "educational_psychology", label: "روانشناسی تربیتی" },
    { value: "cognitive_behavioral", label: "درمان شناختی-رفتاری" },
    { value: "family_therapy", label: "درمان خانواده" },
    { value: "couple_therapy", label: "مشاوره زوجین" },
    { value: "child_psychology", label: "روانشناسی کودک" },
    { value: "adolescent_psychology", label: "روانشناسی نوجوان" },
    { value: "addiction_counseling", label: "مشاوره اعتیاد" },
    { value: "trauma_therapy", label: "درمان ترومه" },
    { value: "business_coaching", label: "کوچینگ کسب و کار" },
    { value: "career_counseling", label: "مشاوره شغلی" },
    { value: "educational_consulting", label: "مشاوره تحصیلی" },
    { value: "other", label: "سایر" },
  ];

  // Load existing profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setProfileData(data);
          setFormData({
            bio: data.bio || "",
            license_number: data.license_number || "",
            degrees: data.degrees || "",
            specialty: data.specialty || "",
            image_url: data.image_url || "",
            video_url: data.video_url || "",
            audio_url: data.audio_url || "",
          });
        } else {
          setErrors({
            general: "پاسخ سرور معتبر نیست. لطفاً با پشتیبانی تماس بگیرید.",
          });
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
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

  // URL validation
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.bio || formData.bio.trim().length < 50) {
      newErrors.bio = "بیوگرافی باید حداقل ۵۰ کاراکتر باشد";
    }

    if (!formData.license_number || formData.license_number.trim().length < 5) {
      newErrors.license_number = "شماره پروانه نظام باید حداقل ۵ کاراکتر باشد";
    }

    if (!formData.degrees || formData.degrees.trim().length < 10) {
      newErrors.degrees = "مدارک تحصیلی باید حداقل ۱۰ کاراکتر باشد";
    }

    if (!formData.specialty) {
      newErrors.specialty = "لطفاً تخصص خود را انتخاب کنید";
    }

    if (formData.image_url && !validateUrl(formData.image_url)) {
      newErrors.image_url = "لینک تصویر معتبر نیست";
    }

    if (formData.video_url && !validateUrl(formData.video_url)) {
      newErrors.video_url = "لینک ویدیو معتبر نیست";
    }

    if (formData.audio_url && !validateUrl(formData.audio_url)) {
      newErrors.audio_url = "لینک صوتی معتبر نیست";
    }

    // At least one of video or audio must be provided
    if (!formData.video_url && !formData.audio_url) {
      newErrors.media = "حداقل یکی از لینک ویدیو یا صوتی باید وارد شود";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSaved(false);

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSaved(true);
        setProfileData(data);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setErrors({ general: data.message || "خطا در ذخیره اطلاعات" });
      }
    } catch (error) {
      setErrors({ general: "خطا در اتصال به سرور" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
            مُشاوِریتو
          </h1>
          <p className="text-base sm:text-lg text-gray-600">پروفایل مشاور</p>
        </div>

        {/* Profile Status */}
        {profileData && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    profileData.is_verified ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span className="font-medium text-gray-700">
                  {profileData.is_verified ? "تأیید شده" : "در انتظار تأیید"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                جلسات انجام شده: {profileData.session_count || 0}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 ml-3" />
            <span className="text-green-800">اطلاعات با موفقیت ذخیره شد</span>
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
              <AlertCircle className="w-5 h-5 ml-2" />
              {errors.general}
            </div>
          )}

          {/* Media Error */}
          {errors.media && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
              <AlertCircle className="w-5 h-5 ml-2" />
              {errors.media}
            </div>
          )}

          <div className="space-y-6">
            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                بیوگرافی و معرفی
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="درباره خود، تجربیات و روش‌های کاری‌تان بنویسید... (حداقل ۵۰ کاراکتر)"
                rows="6"
                className="w-full bg-inherit px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                {errors.bio && (
                  <p className="text-red-500 text-sm">{errors.bio}</p>
                )}
                <p className="text-gray-500 text-sm">
                  {formData.bio.length}/500
                </p>
              </div>
            </div>

            {/* License Number */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                شماره پروانه نظام
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleInputChange}
                  placeholder="شماره پروانه نظام خود را وارد کنید"
                  className="w-full pr-12 pl-4 py-3 border bg-inherit border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              {errors.license_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.license_number}
                </p>
              )}
            </div>

            {/* Degrees */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                مدارک تحصیلی
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="degrees"
                  value={formData.degrees}
                  onChange={handleInputChange}
                  placeholder="مدارک تحصیلی خود را وارد کنید (مثال: کارشناسی ارشد روانشناسی - دانشگاه تهران)"
                  className="w-full pr-12 pl-4 py-3 border bg-inherit border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
              {errors.degrees && (
                <p className="text-red-500 text-sm mt-1">{errors.degrees}</p>
              )}
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">تخصص</label>
              <div className="relative">
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="w-full pr-12 pl-4 py-3 border bg-inherit border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 appearance-none"
                >
                  <option value="">تخصص خود را انتخاب کنید</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 text-gray-400">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              {errors.specialty && (
                <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                لینک تصویر پروفایل (اختیاری)
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pr-12 pl-4 py-3 border bg-inherit border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <Image className="w-6 h-6" />
                </div>
              </div>
              {errors.image_url && (
                <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>
              )}
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                لینک ویدیو معرفی *
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-inherit pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <Video className="w-6 h-6" />
                </div>
              </div>
              {errors.video_url && (
                <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>
              )}
            </div>

            {/* Audio URL */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                لینک صوتی معرفی *
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="audio_url"
                  value={formData.audio_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/audio.mp3"
                  className="w-full pr-12 bg-inherit pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <Mic className="w-6 h-6" />
                </div>
              </div>
              {errors.audio_url && (
                <p className="text-red-500 text-sm mt-1">{errors.audio_url}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  ذخیره اطلاعات
                  <Save className="w-5 h-5 mr-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mr-3">
              <p className="text-sm text-blue-800">
                <strong>نکات مهم:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• حداقل یکی از لینک ویدیو یا صوتی باید وارد شود</li>
                <li>• بیوگرافی شما برای کاربران نمایش داده می‌شود</li>
                <li>• تأیید پروفایل توسط تیم ما انجام می‌شود</li>
                <li>• لطفاً اطلاعات دقیق و کامل وارد کنید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
