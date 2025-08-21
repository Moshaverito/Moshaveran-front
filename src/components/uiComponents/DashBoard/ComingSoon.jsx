import { AlertCircle, PlayCircle } from "lucide-react";

function ComingSoon() {
  return (
    <section className="bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <PlayCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">به زودی...</h2>
        <p className="text-gray-600 mb-4">
          قابلیت ارائه دوره و وبینار برای کاربران به زودی اضافه خواهد شد. با این
          ویژگی می‌توانید دانش خود را با جمع بیشتری به اشتراک بگذارید.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full text-sm text-gray-600">
          <AlertCircle className="w-4 h-4" />
          <span>در حال توسعه</span>
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
