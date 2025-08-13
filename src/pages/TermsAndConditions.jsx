import React, { useState } from 'react';
import { ArrowRight, Shield, User, Clock, CreditCard, RefreshCw, Lock, AlertTriangle, FileText, CheckCircle, Eye, Heart, MessageCircle, Phone, Video, Star, Menu, X, ChevronDown, Users, Award } from 'lucide-react';

const TermsAndConditionsPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const termsData = [
    {
      id: 1,
      title: "تعاریف",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-teal-500",
      items: [
        { term: "مشاوریتو", definition: "بستر آنلاین ارائه خدمات روانشناسی و روان‌درمانی" },
        { term: "درمانگر", definition: "روانشناس یا روان‌درمانگر دارای مجوز رسمی که از طریق پلتفرم به ارائه خدمات مشاوره می‌پردازد" },
        { term: "درمانجو", definition: "فرد دریافت‌کننده خدمات درمانی" },
        { term: "جلسه مشاوره", definition: "هرگونه ارتباط متنی، صوتی یا تصویری که از طریق پلتفرم برقرار می‌شود" },
        { term: "حساب کاربری", definition: "فضای اختصاصی درمانجو برای مدیریت نوبت‌ها و خدمات" },
        { term: "کیف پول مشاوریتو", definition: "فضای مالی مجازی برای واریز، برداشت و مدیریت اعتبار کاربران" },
        { term: "اعتبار", definition: "مبلغ شارژشده توسط درمانجو در حساب کاربری خود" }
      ]
    },
    {
      id: 2,
      title: "شرایط استفاده و عضویت",
      icon: <User className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      rules: [
        "ثبت‌نام در سامانه به‌معنای پذیرش کامل این قوانین است",
        "هر فرد تنها مجاز به داشتن یک حساب کاربری فعال است",
        "درج اطلاعات نادرست یا ناقص ممکن است منجر به تعلیق حساب شود",
        "مسئولیت حفظ اطلاعات حساب کاربری، ازجمله رمز عبور، برعهده درمانجو است",
        "اطلاعات کاربران محرمانه تلقی شده و صرفاً با حکم قانونی در اختیار مراجع ذی‌صلاح قرار می‌گیرد"
      ]
    },
    {
      id: 3,
      title: "اصول اخلاقی و رفتاری درمانجو",
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      rules: [
        "برقراری ارتباط خارج از اپلیکیشن با درمانگر، از طریق پیام‌رسان‌ها، تماس مستقیم یا پرداخت‌های شخصی، اکیداً ممنوع است",
        "ارائه هرگونه اطلاعات نادرست درباره وضعیت روانی، سوابق دارویی یا بیماری، ممکن است بر کیفیت درمان تأثیر بگذارد و مسئولیت آن بر عهده درمانجو خواهد بود",
        "رفتار تهدیدآمیز، توهین‌آمیز یا تحقیرآمیز نسبت به درمانگر یا پشتیبانی پلتفرم، موجب مسدودی حساب و پیگیری قانونی می‌شود",
        "در صورتی که درمانجو مدعی وقوع تخلفی از سوی درمانگر باشد، موضوع می‌بایست از طریق پشتیبانی گزارش شده و در موارد لازم به سازمان نظام روانشناسی و مشاوره کشور ارجاع داده خواهد شد"
      ]
    },
    {
      id: 4,
      title: "جلسات مشاوره و حضور به‌موقع",
      icon: <Clock className="w-6 h-6" />,
      color: "from-purple-500 to-blue-500",
      rules: [
        "حضور در جلسه، دقیقاً در زمان تعیین‌شده الزامی است",
        "عدم حضور درمانجو در زمان رزرو، به منزله برگزاری جلسه تلقی می‌شود و مبلغی بازگردانده نخواهد شد",
        "تغییر یا لغو جلسه صرفاً از طریق اپلیکیشن و با حداقل ۳ ساعت فاصله تا زمان برگزاری امکان‌پذیر است",
        "تأخیر درمانجو باعث کاهش مدت زمان جلسه خواهد شد؛ زمان جلسه قابل تمدید نیست"
      ]
    },
    {
      id: 5,
      title: "هزینه‌ها و پرداخت‌ها",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      rules: [
        "کلیه هزینه‌ها (شامل دستمزد درمانگر و کارمزد پلتفرم) پیش از جلسه نمایش داده شده و باید از طریق درگاه رسمی پرداخت شوند",
        "پرداخت‌هایی که خارج از سامانه (نظیر کارت‌به‌کارت) انجام شوند، فاقد اعتبار هستند",
        "پس از آغاز جلسه، وجه پرداختی قابل بازگشت نیست"
      ]
    },
    {
      id: 6,
      title: "لغو و استرداد وجه",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "from-teal-500 to-green-500",
      rules: [
        "لغو جلسه تا ۳ ساعت پیش از شروع، منجر به بازگشت وجه به کیف پول درمانجو می‌شود",
        "در صورت عدم حضور درمانگر یا کنسل‌شدن جلسه از سمت ایشان، کاربر می‌تواند انتخاب کند که جلسه جایگزین برگزار شود یا وجه به کیف پول بازگردانده شود",
        "درخواست بازگشت وجه باید حداکثر تا ۴ ساعت پس از بروز مشکل از طریق پشتیبانی ثبت شود"
      ]
    },
    {
      id: 7,
      title: "حریم خصوصی و امنیت اطلاعات",
      icon: <Lock className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      rules: [
        "تمام اطلاعات درمانجویان (ازجمله پیام‌ها، فایل‌ها، تاریخچه درمان و...) محرمانه و طبق قوانین کشور نگهداری می‌شود",
        "ضبط جلسات صرفاً با هدف ارتقاء کیفیت و امنیت صورت می‌گیرد و امکان حذف آن‌ها با درخواست رسمی و پس از ۶ ماه امکان‌پذیر است",
        "در صورت وقوع بحران‌های روانی (افکار خودکشی، دگرکشی یا آسیب به دیگران)، درمانگر موظف به اطلاع‌رسانی به پشتیبانی بوده و ممکن است در صورت لزوم، موضوع به مراجع قانونی یا اورژانس ارجاع شود"
      ]
    },
    {
      id: 8,
      title: "محدودیت استفاده از خدمات",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      rules: [
        "درمانجو مجاز به استفاده هم‌زمان از حداکثر ۳ درمانگر همکار مشاوریتو است",
        "در صورت سوءاستفاده از این امکان، دسترسی به خدمات محدود خواهد شد"
      ]
    },
    {
      id: 9,
      title: "ثبت نظر و بازخورد",
      icon: <Star className="w-6 h-6" />,
      color: "from-pink-500 to-red-500",
      rules: [
        "درمانجو مجاز به ثبت نظر درباره جلسه مشاوره است؛ با رعایت موارد زیر:",
        "ممنوعیت انتشار اطلاعات شخصی درمانگر (شماره تماس، آدرس، عکس و...)",
        "پرهیز از توهین، اتهام بی‌اساس یا ادعاهای درمانی اثبات‌نشده",
        "نظرات باید به زبان فارسی و با نام واقعی ثبت شود"
      ]
    },
    {
      id: 10,
      title: "مسئولیت‌ها و محدودیت‌ها",
      icon: <Shield className="w-6 h-6" />,
      color: "from-gray-500 to-blue-500",
      rules: [
        "مشاوریتو صرفاً بستر ارتباطی امن برای ارائه خدمات روانشناسی است و در قبال محتوای جلسات، دخالتی ندارد",
        "هرگونه استفاده غیرمجاز از محتوا یا برند مشاوریتو پیگرد قانونی خواهد داشت"
      ]
    }
  ];
  // Handle back button functionality
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history - you can customize this
      window.location.href = '/';
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
            onClick={handleGoBack}
              className="p-2 hover:bg-white/50 rounded-full transition-all"
            >
              <ArrowRight className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              قوانین و مقررات مشاوریتو
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              قوانین و مقررات کاربران (درمانجویان)
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              با ثبت‌نام و استفاده از خدمات «مشاوریتو»، شما به عنوان درمانجو، متعهد به رعایت قوانین زیر خواهید بود. 
              هدف از این قوانین، تضمین کیفیت خدمات، حفظ حریم خصوصی، امنیت روانی و اخلاقی طرفین است.
            </p>
            <div className="mt-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-sm text-teal-700">
                <CheckCircle className="w-4 h-4" />
                <span>تاریخ آخرین به‌روزرسانی: ۱۴۰۳/۰۵/۳۰</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {termsData.map((section) => (
              <div key={section.id} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-right flex items-center justify-between hover:bg-white/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center text-white`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        ماده {section.id} – {section.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-500 transition-transform ${
                      expandedSection === section.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedSection === section.id && (
                  <div className="px-6 pb-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      {section.items ? (
                        <div className="space-y-4">
                          {section.items.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex gap-3">
                                <div className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full whitespace-nowrap">
                                  {item.term}
                                </div>
                                <div className="text-gray-700 leading-relaxed">
                                  {item.definition}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {section.rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                              <p className="text-gray-700 leading-relaxed">{rule}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Acceptance Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white text-center shadow-lg">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">پذیرش نهایی</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              استفاده از خدمات مشاوریتو به‌منزله پذیرش کامل این قوانین است. 
              به‌روزرسانی قوانین از طریق اپلیکیشن یا ایمیل اطلاع‌رسانی می‌شود. 
              ادامه استفاده، به منزله موافقت با نسخه جدید قوانین تلقی خواهد شد.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">نیاز به پشتیبانی دارید؟</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              در صورت بروز هرگونه اختلاف یا نارضایتی از خدمات درمانگر، لطفاً از طریق بخش پشتیبانی با ما تماس بگیرید. 
              موارد تخصصی نیز در صورت لزوم به سازمان نظام روانشناسی و مشاوره جمهوری اسلامی ایران ارجاع داده خواهند شد.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                تماس با پشتیبانی
              </button>
              <button className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                تماس تلفنی
              </button>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default TermsAndConditionsPage;