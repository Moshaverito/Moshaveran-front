import React, { useState } from 'react';
import { ArrowRight, Code, Database, Mail, Users, Star, CheckCircle, Globe, Laptop, Server, Layers, Share2 } from 'lucide-react';

const WorkWithUsPage = () => {
  const [hoveredJob, setHoveredJob] = useState(null);

  const openGmailCompose = (position) => {
    const subject = encodeURIComponent(`درخواست همکاری - ${position}`);
    const body = encodeURIComponent(`سلام،

من علاقه‌مند به همکاری در پست ${position} هستم. رزومه من را ضمیمه کرده‌ام.

با تشکر`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=moshaveritoo@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const jobPositions = [
    {
      id: 1,
      title: 'توسعه‌دهنده Frontend',
      subtitle: 'React + Vite + Tailwind',
      description: 'برای توسعه رابط کاربری مدرن و واکنش‌گرا به دنبال یک توسعه‌دهنده با تجربه در React هستیم.',
      icon: Code,
      gradient: 'from-blue-500 to-purple-500',
      skills: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript ES6+', 'Responsive Design'],
      requirements: [
        'حداقل 2 سال تجربه کاری با React',
        'تسلط به Tailwind CSS و طراحی واکنش‌گرا',
        'آشنایی با Vite و ابزارهای مدرن توسعه',
        'درک عمیق از JavaScript و ES6+',
        'تجربه کار با Git و GitHub'
      ]
    },
    {
      id: 2,
      title: 'توسعه‌دهنده Backend',
      subtitle: 'Django REST Framework',
      description: 'برای توسعه API های قدرتمند و مدیریت پایگاه داده به یک توسعه‌دهنده باتجربه نیاز داریم.',
      icon: Server,
      gradient: 'from-green-500 to-teal-500',
      skills: ['Django', 'Django REST Framework', 'Python', 'PostgreSQL/MySQL', 'API Design'],
      requirements: [
        'حداقل 2 سال تجربه کاری با Django',
        'تسلط کامل بر Django REST Framework',
        'تجربه طراحی و توسعه RESTful API',
        'آشنایی با پایگاه‌های داده رابطه‌ای',
        'درک مفاهیم امنیتی در توسعه وب'
      ]
    },
    {
      id: 3,
      title: 'مدیر شبکه‌های اجتماعی',
      subtitle: 'Social Media Manager',
      description: 'برای مدیریت حضور آنلاین و تولید محتوای جذاب در شبکه‌های اجتماعی به یک متخصص خلاق نیاز داریم.',
      icon: Share2,
      gradient: 'from-pink-500 to-orange-500',
      skills: ['Instagram', 'Telegram', 'Content Creation', 'Canva/Photoshop', 'Analytics'],
      requirements: [
        'حداقل 1 سال تجربه مدیریت شبکه‌های اجتماعی',
        'مهارت تولید محتوای بصری و متنی',
        'آشنایی با ابزارهای طراحی (Canva، Photoshop)',
        'درک عمیق از پلتفرم‌های اینستاگرام و تلگرام',
        'خلاقیت در ایده‌پردازی و تولید محتوا'
      ]
    }
  ];

  const benefits = [
    { icon: Users, title: 'تیم حرفه‌ای', description: 'همکاری با تیمی از بهترین متخصصان' },
    { icon: Laptop, title: 'کار از راه دور', description: 'امکان کار انعطاف‌پذیر از هر مکانی' },
    { icon: Star, title: 'رشد شغلی', description: 'فرصت‌های بی‌نظیر برای یادگیری و پیشرفت' },
    { icon: Globe, title: 'پروژه‌های متنوع', description: 'کار روی پروژه‌های جذاب و چالش‌برانگیز' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/50 rounded-full transition-all">
              <ArrowRight className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              همکاری با ما
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-4">
              به تیم ما بپیوندید
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ما به دنبال توسعه‌دهندگان با استعداد و پرانگیزه هستیم که بخواهند در پروژه‌های جذاب و نوآورانه مشارکت کنند. 
              اگر عاشق برنامه‌نویسی هستید و می‌خواهید در محیطی پویا و حرفه‌ای کار کنید، جای شما در تیم ما خالی است.
            </p>
          </div>
        </div>
      </section>

      {/* Job Positions */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {jobPositions.map((job) => (
              <div 
                key={job.id}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredJob(job.id)}
                onMouseLeave={() => setHoveredJob(null)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${job.gradient} rounded-full flex items-center justify-center`}>
                    <job.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600 font-medium">{job.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">مهارت‌های مورد نیاز:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${job.gradient} text-white`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">الزامات:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <button 
                  onClick={() => openGmailCompose(job.title)}
                  className={`w-full bg-gradient-to-r ${job.gradient} hover:shadow-lg text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  <Mail className="w-5 h-5" />
                  ارسال رزومه
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-4">
              چرا با ما کار کنید؟
            </h3>
            <p className="text-gray-600">
              مزایای همکاری با تیم مشاوریتو
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">فرآیند استخدام</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">1. ارسال رزومه</h4>
                <p className="text-gray-600 text-sm">رزومه خود را برای پست مورد نظر ارسال کنید</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">2. بررسی و مصاحبه</h4>
                <p className="text-gray-600 text-sm">بررسی رزومه و برگزاری مصاحبه تخصصی</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">3. شروع همکاری</h4>
                <p className="text-gray-600 text-sm">آغاز همکاری و ورود به تیم</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default WorkWithUsPage;