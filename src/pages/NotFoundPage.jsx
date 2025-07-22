import React from 'react';
import { Ghost, ArrowRight } from 'lucide-react';

const NotFound = () => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-green-50 text-gray-800 font-sans" dir="rtl">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12 text-center max-w-2xl">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
          <Ghost className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">اوه! صفحه پیدا نشد</h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
          به نظر می‌رسد صفحه‌ای که دنبال آن هستید وجود ندارد یا شاید به مکان دیگری منتقل شده باشد.
        </p>
        <button 
          onClick={goHome}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
        >
          بازگشت به خانه
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
    </div>
  );
};

export default NotFound;
