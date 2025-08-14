import React from "react";
import { Users, BookOpen, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const handleGoBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Fallback if there's no history - you can customize this
    window.location.href = "/";
  }
};
const AboutUs = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800 sm: px-4"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="p-2 hover:bg-white/50 rounded-full transition-all bg-inherit"
            >
              <ArrowRight className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              داشبورد مشاور
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center py-12">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          درباره{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            مشاوریتو
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          تصور کن دنیایی که در اون، تنها با چند سوال ساده، دقیق‌ترین و بهترین
          مشاور، درمانگر یا کوچ شغلی و کنکور، متناسب با شخصیت و نیازت پیدا میشه.
          اینجا، مشاوریتو است؛ اپلیکیشنی که پلی‌ست به سمت یک زندگی بهتر و مسیر
          درست برای هر قدم مهم.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">انتخاب هوشمند</h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              ما سه دنیای متفاوت — روان‌درمانی، کوچینگ شغلی و مشاوره کنکور — را
              در یک اپلیکیشن با سیستم هوشمند و خلاقانه گرد هم آوردیم.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              شفافیت و آگاهی
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              مشاوران و درمانگران حرفه‌ای با معرفی ویدیویی و پروفایل شفاف،
              انتخابی آگاهانه و مطمئن را برایت فراهم می‌کنند.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Star className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">تضمین کیفیت</h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              با نظارت دقیق و پشتیبانی فعال، تضمین می‌کنیم خدمات همیشه در
              بالاترین کیفیت ممکن باشد و تو تجربه‌ای منحصر به فرد داشته باشی.
            </p>
          </motion.div>
        </div>

        <motion.p
          className="text-base sm:text-lg text-gray-600 leading-relaxed mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          ماموریت ما ساده است: هر فرد پس از مشاوره در مشاوریتو، لبخند رضایت به
          لب داشته باشد. آینده‌ای روشن‌تر، آرام‌تر و هدفمندتر را با مشاوریتو
          تجربه کن؛ چون تو شایسته بهترین حمایت و راهنمایی هستی.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutUs;
