import React, { useState, useEffect } from 'react';
import { Star, Clock, Shield, ChevronDown, User, Trophy,
   DollarSign, UserCheck,Users2, MessageSquare,} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TherapistHomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  // Mock stats data - you can replace with real API data
  const stats = {
    totalTherapists: 1247,
    verifiedTherapists: 892,
    totalSessions: 45623,
    averageRating: 4.8,
    monthlyEarnings: '۲۸,۵۰۰,۰۰۰',
    activeClients: 156,
    completedSessions: 1834
  };

  const specialties = [
    { key: 'anxiety', name: 'اضطراب', color: 'from-blue-500 to-teal-500', icon: '🧠' },
    { key: 'depression', name: 'افسردگی', color: 'from-indigo-500 to-blue-500', icon: '💙' },
    { key: 'couples', name: 'زوج‌درمانی', color: 'from-red-500 to-pink-500', icon: '❤️' },
    { key: 'family', name: 'خانواده‌درمانی', color: 'from-green-500 to-teal-500', icon: '👨‍👩‍👧‍👦' },
    { key: 'kids', name: 'کودکان', color: 'from-purple-500 to-pink-500', icon: '🧸' },
    { key: 'addiction', name: 'اعتیاد', color: 'from-orange-500 to-red-500', icon: '🚭' },
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'درآمد بالا',
      description: 'با ساعت‌های انعطاف‌پذیر درآمد مناسبی کسب کنید'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'زمان‌بندی انعطاف‌پذیر',
      description: 'برنامه کاری خود را طبق سلیقه تنظیم کنید'
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: 'دسترسی به کلاینت‌های بیشتر',
      description: 'با هزاران کلاینت در سراسر ایران ارتباط برقرار کنید'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'پلتفرم امن و قابل اعتماد',
      description: 'محیط کاری امن با پشتیبانی ۲۴ ساعته'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'ثبت‌نام و تأیید مدارک',
      description: 'مدارک و مجوزهای خود را بارگذاری کرده و منتظر تأیید باشید',
      icon: <UserCheck className="w-8 h-8" />
    },
    {
      step: 2,
      title: 'تکمیل پروفایل',
      description: 'پروفایل حرفه‌ای خود را با تخصص‌ها و تجربیات تکمیل کنید',
      icon: <User className="w-8 h-8" />
    },
    {
      step: 3,
      title: 'شروع مشاوره',
      description: 'کلاینت‌های خود را بپذیرید و جلسات درمانی برگزار کنید',
      icon: <MessageSquare className="w-8 h-8" />
    },
    {
      step: 4,
      title: 'دریافت درآمد',
      description: 'با ثبت درخواست برداشت، درآمد خود را به صورت هفتگی دریافت کنید',
      icon: <Trophy className="w-8 h-8" />
    }
  ];
const faqData = [
  {
    question: "چطور می‌تونم به عنوان درمانگر، کوچ یا مشاور کنکور در مشاوریتو فعالیت کنم؟",
    answer:
      "برای شروع همکاری، وارد سایت شوید، گزینه‌ی «ثبت‌نام مشاور» را انتخاب کرده، فرم مربوطه را تکمیل و مدارک مورد نیاز را بارگذاری کنید. پس از بررسی اطلاعات، تیم پشتیبانی با شما تماس خواهد گرفت.",
  },
  {
    question: "آیا ثبت‌نام و حضور در مشاوریتو هزینه‌ای دارد؟",
    answer:
      "خیر. عضویت و ساخت پروفایل برای مشاوران کاملاً رایگان است. تنها در صورت شروع همکاری، درصدی از هر جلسه به عنوان کارمزد پلتفرم کسر می‌شود.",
  },
  {
    question: "نحوه دریافت حق‌الزحمه جلسات چگونه است؟",
    answer:
      "درآمد شما از طریق حساب بانکی که در پروفایل ثبت کرده‌اید به صورت منظم و قابل برداشت خواهد بود. درخواست برداشت درآمد در هر زمان امکان‌پذیر است.",
  },
  {
    question: "آیا باید با موسسه یا کلینیک خاصی قرارداد داشته باشم؟",
    answer:
      "خیر. فعالیت شما در مشاوریتو به صورت کاملاً مستقل و بدون نیاز به همکاری با موسسه خاصی انجام می‌شود.",
  },
  {
    question: "چطور از کیفیت خدمات درمانگران اطمینان حاصل می‌شود؟",
    answer:
      "ما از طریق نظارت مداوم، بازخورد کاربران، امتیازدهی شفاف، بررسی رزومه و ویدیوهای معرفی مشاوران، کیفیت خدمات را کنترل و تضمین می‌کنیم.",
  },
  {
    question: "آیا می‌تونم قیمت جلسات رو خودم مشخص کنم؟",
    answer:
      "بله، شما می‌تونید بازه قیمتی خدمات‌تون رو مشخص کنید، مشروط به این که در چارچوب قیمت‌گذاری پیشنهادی پلتفرم باشد.",
  },
  {
    question: "آیا فقط جلسات آنلاین برگزار می‌شوند؟",
    answer:
      "در حال حاضر بله، مشاوریتو بر پایه مشاوره آنلاین طراحی شده و جلسات از طریق تماس تصویری، صوتی یا چت در بستر سایت برگزار می‌شن.",
  },
  {
    question: "چه تخصص‌هایی می‌تونن در مشاوریتو فعالیت کنن؟",
    answer:
      "روان‌درمانگران، مشاوران خانواده، مشاوران تحصیلی و کنکور، کوچ‌های شغلی، درمانگران کودک و نوجوان، درمانگران مذهبی و تحلیلی و سایر متخصصانی که مجوز رسمی دارند.",
  },
  {
    question: "پشتیبانی مشاورین در طول فعالیت چگونه است؟",
    answer:
      "تیم پشتیبانی مشاوریتو همیشه در کنار شماست تا در موارد فنی، برنامه‌ریزی، تنظیم قیمت و بهبود عملکرد حرفه‌ای همراهی‌تون کنه.",
  },
];

  const testimonials = [
    {
      name: 'دکتر سارا احمدی',
      specialty: 'روانشناس بالینی',
      text: 'مشاوریتو به من امکان کمک به افراد بیشتری را داده و درآمد بهتری کسب می‌کنم.',
      rating: 5,
      sessions: 450
    },
    {
      name: 'دکتر محمد کریمی',
      specialty: 'روان‌پزشک',
      text: 'پلتفرم بسیار حرفه‌ای و امن است. کلاینت‌هایم بسیار راضی هستند.',
      rating: 5,
      sessions: 320
    },
    {
      name: 'دکتر مریم رضایی',
      specialty: 'مشاور خانواده',
      text: 'امکانات عالی و پشتیبانی مناسب. توصیه می‌کنم به همه همکاران.',
      rating: 5,
      sessions: 280
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
  
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              به جمع
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> مشاوران </span>
              حرفه‌ای بپیوندید
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              با پیوستن به بزرگترین پلتفرم مشاوره آنلاین ایران، به هزاران نفر کمک کنید و درآمد مناسبی کسب کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={() => navigate('/wait')}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                همین حالا شروع کنید
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-2">
                {stats.totalTherapists.toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">مشاور فعال</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2">
                {stats.totalSessions.toLocaleString()}+
              </div>
              <div className="text-gray-600 text-sm">جلسه برگزار شده</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stats.averageRating}
              </div>
              <div className="text-gray-600 text-sm">امتیاز متوسط</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                ۹۵٪
              </div>
              <div className="text-gray-600 text-sm">رضایت کلاینت‌ها</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 px-4 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              تخصص‌های مورد نیاز
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              در هر یک از این حوزه‌ها می‌توانید فعالیت کنید و به کلاینت‌های مختلف کمک کنید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <div key={specialty.key} className="group">
                <div className={`bg-gradient-to-br ${specialty.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                  <div className="text-3xl mb-3">{specialty.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{specialty.name}</h3>
                  <div className="text-sm opacity-90">
                    تخصص پرطرفدار
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              چرا مشاوریتو؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              مزایای همکاری با ما را کشف کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-teal-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              نحوه شروع همکاری
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              در ۴ قدم ساده، همکاری خود را با مشاوریتو آغاز کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="flex justify-center text-teal-600 mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-white/30 backdrop-blur-sm px-4" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              سوالات متداول
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              پاسخ سوالات رایج درباره مشاوریتو
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
                <button
                  className="w-full text-right p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 flex-1">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${
                      activeAccordion === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              نظر همکاران ما
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              تجربه مشاوران حرفه‌ای که با مشاوریتو همکاری می‌کنند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(2)}
                  </div>
                  <div className="mr-3">
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.specialty}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="text-sm text-gray-500">
                  {testimonial.sessions} جلسه برگزار شده
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">
              آماده شروع همکاری هستید؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              به جمع هزاران مشاور حرفه‌ای بپیوندید و کمک به دیگران را شروع کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={() => navigate('/wait')}

              className="bg-white text-teal-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all shadow-lg">
                ثبت‌نام رایگان
              </button>
              <button
              onClick={() => navigate('/contact')}

               className="border-2 border-white text-black hover:bg-white hover:text-teal-600 px-8 py-4 rounded-full text-lg font-semibold transition-all">
              
                تماس با ما
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TherapistHomePage;