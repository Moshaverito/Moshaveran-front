import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  Camera,
  Video,
  Plus,
  X,
  FileText,
  Calendar,
  BookOpen,
  Upload,
  CheckCircle,
  AlertCircle,
  User,
  Save,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Mic,
  CreditCard,
  Clock,
} from "lucide-react";
import { useGetUserInfo } from "../hooks/userProfile/useGetUserInfo";
import { useUploadImage } from "../hooks/userProfile/useUploadImage";
import { useUploadVideo } from "../hooks/userProfile/useUploadVideo";
import { useUploadAudio } from "../hooks/userProfile/useUploadAudio";
import { useUpdateUserInfo } from "../hooks/userProfile/useUpdateUserInfo";
import NoAccess from "../components/uiComponents/DashBoard/NoAccess";

const MoshaverProfile = () => {
  const [userLevel, setUserLevel] = useState(1); // Will be fetched from API
  const [profile, setProfile] = useState({
    bio: "",
    birthdate: "", // Will be in Georgian format for API
    birthdateDisplay: "", // Jalali display format
    imageUrl: "",
    videoUrl: "",
    audioUrl: "",
    creditCardNumber: "",
    degrees: [],
  });

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("accessToken");
  const [showVideo, setShowVideo] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [newDegree, setNewDegree] = useState({
    title: "",
    major: "",
    university: "",
    year_obtained: "",
  });
  const [showAddDegree, setShowAddDegree] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);

  // Get user info
  const { userInfoData, isUserInfoDataLoading } = useGetUserInfo();

  const { uploadImage, isUploadingImage } = useUploadImage();

  const { uploadVideo, isUploadingVideo } = useUploadVideo();

  const { uploadAudio, isUploadingAudio } = useUploadAudio();

  const { updateUserInfo, isUpdatingUserInfo } = useUpdateUserInfo();

  console.log(userInfoData);

  // Fetch user info on component mount
  useEffect(() => {
    if (userInfoData) {
      setUserLevel(userInfoData.level || 1);
      setProfile((prev) => ({
        ...prev,
        bio: userInfoData.bio || "",
        birthdate: userInfoData.birthdate || "",
        birthdateDisplay: userInfoData.birthdate
          ? georgianToJalali(userInfoData.birthdate)
          : "",
        imageUrl: userInfoData.image_url,
        videoUrl: userInfoData.video_url || "",
        audioUrl: userInfoData.audio_url || "",
        creditCardNumber: userInfoData.credit_card_number || "",
        degrees: userInfoData.degrees || [],
      }));
    }
  }, [userInfoData]);

  // Jalali to Georgian date conversion
  const jalaliToGeorgian = (jalaliDate) => {
    if (!jalaliDate) return "";
    const [year, month, day] = jalaliDate.split("/").map(Number);
    const georgianYear = year + 621;
    return `${georgianYear}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  // Georgian to Jalali date conversion
  const georgianToJalali = (georgianDate) => {
    if (!georgianDate) return "";
    const date = new Date(georgianDate);
    const georgianYear = date.getFullYear();
    const jalaliYear = georgianYear - 621;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${jalaliYear}/${String(month).padStart(2, "0")}/${String(
      day
    ).padStart(2, "0")}`;
  };

  // Validate media file duration (under 1 minute)
  const validateMediaDuration = (file, type) => {
    return new Promise((resolve, reject) => {
      const element = document.createElement(type);
      element.preload = "metadata";

      element.onloadedmetadata = () => {
        if (element.duration > 60) {
          reject(
            new Error(
              `مدت زمان ${
                type === "video" ? "ویدیو" : "صوت"
              } نباید بیش از یک دقیقه باشد`
            )
          );
        } else {
          resolve();
        }
      };

      element.onerror = () => {
        reject(new Error("خطا در بارگذاری فایل"));
      };

      element.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "لطفاً یک فایل تصویری انتخاب کنید",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "حجم فایل نباید بیش از 5 مگابایت باشد",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, image: "" }));
    const formData = new FormData();
    formData.append("image", file);
    uploadImage(formData, {
      onSuccess: (data) => {
        setProfile((prev) => ({ ...prev, imageUrl: data?.image }));
      },
    });
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setErrors((prev) => ({
        ...prev,
        video: "لطفاً یک فایل ویدیویی انتخاب کنید",
      }));
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        video: "حجم فایل نباید بیش از 50 مگابایت باشد",
      }));
      return;
    }
    try {
      await validateMediaDuration(file, "video");
      setErrors((prev) => ({ ...prev, video: "" }));
      const formData = new FormData();
      formData.append("video", file);
      uploadVideo(formData, {
        onSuccess: (data) => {
          setProfile((prev) => ({ ...prev, videoUrl: data.video }));
        },
      });
    } catch (error) {
      setErrors((prev) => ({ ...prev, video: error.message }));
      return;
    }
  };

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      setErrors((prev) => ({
        ...prev,
        audio: "لطفاً یک فایل صوتی انتخاب کنید",
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        audio: "حجم فایل نباید بیش از 10 مگابایت باشد",
      }));
      return;
    }

    try {
      await validateMediaDuration(file, "audio");
      setErrors((prev) => ({ ...prev, audio: "" }));
      const formData = new FormData();
      formData.append("audio", file);
      uploadAudio(formData, {
        onSuccess: (data) => {
          setProfile((prev) => ({ ...prev, audioUrl: data.audio }));
        },
      });
    } catch (error) {
      setErrors((prev) => ({ ...prev, audio: error.message }));
    }
  };

  const handleBirthdateChange = (jalaliDate) => {
    const georgianDate = jalaliToGeorgian(jalaliDate);
    setProfile((prev) => ({
      ...prev,
      birthdate: georgianDate,
      birthdateDisplay: jalaliDate,
    }));
  };

  const addDegree = () => {
    if (!newDegree.title.trim() || !newDegree.university.trim()) {
      setErrors((prev) => ({
        ...prev,
        degree: "لطفاً عنوان مدرک و نام موسسه را وارد کنید",
      }));
      return;
    }

    if (profile.degrees.length >= 30) {
      setErrors((prev) => ({
        ...prev,
        degree: "حداکثر 30 مدرک قابل اضافه کردن است",
      }));
      return;
    }

    setProfile((prev) => ({
      ...prev,
      degrees: [...prev.degrees, { ...newDegree, id: Date.now() }],
    }));

    setNewDegree({ title: "", university: "", year_obtained: "", major: "" });
    setShowAddDegree(false);
    setErrors((prev) => ({ ...prev, degree: "" }));
  };

  const removeDegree = (degreeId) => {
    setProfile((prev) => ({
      ...prev,
      degrees: prev.degrees.filter((degree) => degree.id !== degreeId),
    }));
  };

  const validateLevel1 = () => {
    const errors = {};

    if (!profile.imageUrl && userLevel === 1) {
      errors.image = "آپلود تصویر پروفایل الزامی است";
    }

    if (!profile.videoUrl && !profile.audioUrl && userLevel === 1) {
      errors.media = "آپلود حداقل یکی از فایل‌های ویدیو یا صوت الزامی است";
    }

    if (!profile.bio.trim() && userLevel === 1) {
      errors.bio = "وارد کردن بیوگرافی الزامی است";
    }

    return errors;
  };

  const validateLevel2 = () => {
    const errors = validateLevel1();

    if (!profile.birthdateDisplay && userLevel === 2) {
      errors.birthdate = "وارد کردن تاریخ تولد الزامی است";
    }

    if (!profile.creditCardNumber.trim() && userLevel === 2) {
      errors.creditCard = "وارد کردن شماره کارت الزامی است";
    } else if (
      !/^\d{16}$/.test(profile.creditCardNumber.replace(/\s/g, "")) &&
      userLevel === 2
    ) {
      errors.creditCard = "شماره کارت باید 16 رقم باشد";
    }

    if (profile.degrees.length === 0 && userLevel === 2) {
      errors.degrees = "افزودن حداقل یک مدرک تحصیلی الزامی است";
    }

    return errors;
  };

  const handleSaveProfile = () => {
    let payload;
    setErrors({});
    // Validate based on current level
    const validationErrors =
      userLevel === 1 ? validateLevel1() : validateLevel2();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (userLevel === 1) {
      payload = {
        bio: profile.bio,
        image_url: profile.imageUrl,
        video_url: profile.videoUrl,
        audio_url: profile.audioUrl,
        level: 2,
      };
    } else {
      payload = {
        birthdate: profile.birthdate,
        credit_card_number: profile.creditCardNumber.replace(/\s/g, ""),
        degrees: profile.degrees,
        level: 2,
      };
    }

    updateUserInfo(payload);
    // If completing level 2, redirect to questionnaire
    if (userLevel === 2) {
      window.location.href = "/TQuestionnaire";
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted;
  };

  if (isUserInfoDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Handle back button functionality
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history - you can customize this
      window.location.href = "/";
    }
  };

  if (!token) {
    return <NoAccess />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="p-2 hover:bg-white/50 rounded-full transition-all bg-inherit"
            >
              <ArrowRight className="w-6 h-6 text-gray-700 " />
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              پروفایل مشاور - مرحله {userLevel}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              پیشرفت تکمیل پروفایل
            </span>
            <span className="text-sm font-medium text-teal-600">
              مرحله {userLevel} از 3
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userLevel / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Profile Photo Section */}
        {userLevel === 1 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              تصویر پروفایل
              <span className="text-red-500 text-sm">*</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt="تصویر پروفایل"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <button
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  {isUploadingImage ? "در حال آپلود..." : "انتخاب تصویر"}
                </button>

                <p className="text-sm text-gray-600 mt-2">
                  فرمت‌های مجاز: JPG, PNG, GIF - حداکثر 5 مگابایت
                </p>

                {errors.image && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.image}
                  </div>
                )}
              </div>
            </div>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Media Section */}
        {userLevel === 1 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5" />
              ویدیو یا صوت معرفی
              <span className="text-red-500 text-sm">*</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video Section */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  ویدیو معرفی
                </h3>

                {profile.videoUrl && (
                  <div className="mb-4">
                    <div className="relative bg-black rounded-xl overflow-hidden">
                      {showVideo ? (
                        <video
                          src={profile.videoUrl}
                          controls
                          className="w-full max-h-48 object-contain"
                        />
                      ) : (
                        <div className="h-32 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <button
                            onClick={() => setShowVideo(true)}
                            className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all"
                          >
                            <Eye className="w-6 h-6 text-white" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setShowVideo(!showVideo)}
                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 bg-blue-50"
                      >
                        {showVideo ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                        {showVideo ? "مخفی کردن" : "مشاهده"}
                      </button>
                      <button
                        onClick={() =>
                          setProfile((prev) => ({ ...prev, videoUrl: "" }))
                        }
                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => videoInputRef.current?.click()}
                  disabled={isUploadingVideo}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  {isUploadingVideo ? "در حال آپلود..." : "انتخاب ویدیو"}
                </button>

                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  حداکثر 1 دقیقه - MP4, MOV, AVI - حداکثر 50MB
                </p>

                {errors.video && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.video}
                  </div>
                )}

                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </div>

              {/* Audio Section */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  صوت معرفی
                </h3>

                {profile.audioUrl && (
                  <div className="mb-4">
                    <div className="bg-gray-100 rounded-xl p-4">
                      {showAudio ? (
                        <audio
                          src={profile.audioUrl}
                          controls
                          className="w-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-16">
                          <button
                            onClick={() => setShowAudio(true)}
                            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-3 transition-all"
                          >
                            <Mic className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setShowAudio(!showAudio)}
                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                      >
                        {showAudio ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                        {showAudio ? "مخفی کردن" : "پخش"}
                      </button>
                      <button
                        onClick={() =>
                          setProfile((prev) => ({ ...prev, audioUrl: "" }))
                        }
                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => audioInputRef.current?.click()}
                  disabled={isUploadingAudio}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  {isUploadingAudio ? "در حال آپلود..." : "انتخاب صوت"}
                </button>

                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  حداکثر 1 دقیقه - MP3, WAV, M4A - حداکثر 10MB
                </p>

                {errors.audio && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.audio}
                  </div>
                )}

                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </div>
            </div>

            {errors.media && (
              <div className="mt-4 text-sm text-red-600 flex items-center gap-1 justify-center">
                <AlertCircle className="w-4 h-4" />
                {errors.media}
              </div>
            )}
          </div>
        )}

        {/* Basic Info Section */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            اطلاعات پایه
          </h2>

          <div className="space-y-4">
            {/* Bio */}
            {userLevel === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  بیوگرافی
                  <span className="text-red-500 text-sm">*</span>
                </label>
                <textarea
                  placeholder="درباره خود، تخصص‌ها و تجربیاتتان بنویسید..."
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  rows={4}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <div className="text-sm text-gray-500">
                    {profile.bio.length}/500 کاراکتر
                  </div>
                  {errors.bio && (
                    <div className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.bio}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Level 2 majors */}
            {userLevel >= 2 && (
              <>
                {/* Birthdate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاریخ تولد (شمسی)
                    <span className="text-red-500 text-sm">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1370/01/01"
                      value={profile.birthdateDisplay}
                      onChange={(e) => handleBirthdateChange(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left pl-10"
                      dir="ltr"
                    />
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.birthdate && (
                    <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.birthdate}
                    </div>
                  )}
                </div>

                {/* Credit Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره کارت
                    <span className="text-red-500 text-sm">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formatCardNumber(profile.creditCardNumber)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        if (value.length <= 16 && /^\d*$/.test(value)) {
                          setProfile((prev) => ({
                            ...prev,
                            creditCardNumber: value,
                          }));
                        }
                      }}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left pl-10"
                      dir="ltr"
                      maxLength={19}
                    />
                    <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.creditCard && (
                    <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.creditCard}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Education Section - Only for Level 2 */}
        {userLevel >= 2 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                مدارک تحصیلی
                <span className="text-red-500 text-sm">*</span>
              </h2>
              <button
                onClick={() => setShowAddDegree(true)}
                disabled={profile.degrees.length >= 30}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                افزودن مدرک
              </button>
            </div>

            {/* Add Degree Form */}
            {showAddDegree && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="عنوان مدرک (مثل: کارشناسی روانشناسی)"
                    value={newDegree.title}
                    onChange={(e) =>
                      setNewDegree((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="نام موسسه یا دانشگاه"
                    value={newDegree.university}
                    onChange={(e) =>
                      setNewDegree((prev) => ({
                        ...prev,
                        university: e.target.value,
                      }))
                    }
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="سال اخذ مدرک"
                    value={newDegree.year_obtained}
                    onChange={(e) =>
                      setNewDegree((prev) => ({
                        ...prev,
                        year_obtained: e.target.value,
                      }))
                    }
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="رشته تحصیلی"
                    value={newDegree.major}
                    onChange={(e) =>
                      setNewDegree((prev) => ({
                        ...prev,
                        major: e.target.value,
                      }))
                    }
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={addDegree}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl text-sm transition-all"
                  >
                    <CheckCircle className="w-4 h-4 inline ml-1" />
                    ذخیره
                  </button>
                  <button
                    onClick={() => {
                      setShowAddDegree(false);
                      setNewDegree({
                        title: "",
                        university: "",
                        year_obtained: "",
                        major: "",
                      });
                      setErrors((prev) => ({ ...prev, degree: "" }));
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm transition-all"
                  >
                    <X className="w-4 h-4 inline ml-1" />
                    انصراف
                  </button>
                </div>

                {errors.degree && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.degree}
                  </div>
                )}
              </div>
            )}

            {/* Degrees List */}
            <div className="space-y-3">
              {profile.degrees?.map((degree) => (
                <div
                  key={degree.id}
                  className="bg-white rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {degree.title}
                      </h3>
                      <p className="text-gray-600">{degree.university}</p>
                      {(degree.year_obtained || degree.major) && (
                        <div className="flex gap-4 mt-1 text-sm text-gray-500">
                          {degree.year_obtained && (
                            <span>سال: {degree.year_obtained}</span>
                          )}
                          {degree.major && <span>رشته: {degree.major}</span>}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeDegree(degree.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {profile.degrees.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>هنوز مدرکی اضافه نشده است</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                {profile.degrees.length}/30 مدرک
              </div>
              {errors.degrees && (
                <div className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.degrees}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Survey Section - Only show for Level 2 completion */}
        {userLevel === 2 && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">تکمیل پرسشنامه</h2>
                  <p className="text-white/90 mb-4">
                    پس از تکمیل و ذخیره این مرحله، به صفحه پرسشنامه هدایت خواهید
                    شد تا مرحله نهایی را تکمیل کنید.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Save Button */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <button
            onClick={handleSaveProfile}
            disabled={isUpdatingUserInfo}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {isUpdatingUserInfo ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                در حال ذخیره...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {userLevel === 1
                  ? "ذخیره و ادامه به مرحله بعد"
                  : userLevel === 2
                    ? "ذخیره و رفتن به پرسشنامه"
                    : "ذخیره پروفایل"}
              </>
            )}
          </button>

          {errors.profile && (
            <div className="mt-4 text-sm text-red-600 flex items-center gap-1 justify-center">
              <AlertCircle className="w-4 h-4" />
              {errors.profile}
            </div>
          )}

          {errors.userInfo && (
            <div className="mt-4 text-sm text-red-600 flex items-center gap-1 justify-center">
              <AlertCircle className="w-4 h-4" />
              {errors.userInfo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoshaverProfile;
