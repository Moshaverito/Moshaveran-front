import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Star,Heart, ChevronLeft, ChevronRight, BookOpen, Users, Video, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [moshavers, setMoshavers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sessions/sessions/');
        const data = await response.json();
        setSessions(data.slice(0, 3)); // Show only first 3 sessions
      } catch (error) {
        console.error('Error fetching sessions:', error);
        // Mock data for demo
        setSessions([
          {
            id: 1,
            moshaverName: 'دکتر مریم احمدی',
            date: '۱۴۰۳/۰۵/۱۵',
            time: '۱۰:۳۰',
            type: 'جلسه ویدئویی',
            status: 'confirmed'
          },
          {
            id: 2,
            moshaverName: 'دکتر علی محمدی',
            date: '۱۴۰۳/۰۵/۱۸',
            time: '۱۴:۰۰',
            type: 'تماس تلفنی',
            status: 'pending'
          }
        ]);
      }
    };

    fetchSessions();
  }, []);

  // Fetch moshavers
  useEffect(() => {
    const fetchMoshavers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/accounts/moshavers/random_five/');
        const data = await response.json();
        setMoshavers(data.slice(0, 5)); // Show only first 5
        setLoading(false);
      } catch (error) {
        console.error('Error fetching moshavers:', error);
        // Mock data for demo
        setMoshavers([
          {
            id: 1,
            name: 'دکتر مریم احمدی',
            specialty: 'روانشناس بالینی',
            rating: 4.9,
            experience: '۸ سال',
            image: '/api/placeholder/80/80',
            available: true
          },
          {
            id: 2,
            name: 'دکتر علی محمدی',
            specialty: 'مشاور خانواده',
            rating: 4.8,
            experience: '۶ سال',
            image: '/api/placeholder/80/80',
            available: true
          },
          {
            id: 3,
            name: 'دکتر زهرا حسینی',
            specialty: 'روانشناس کودک',
            rating: 4.7,
            experience: '۵ سال',
            image: '/api/placeholder/80/80',
            available: false
          },
          {
            id: 4,
            name: 'دکتر احمد رضایی',
            specialty: 'روانپزشک',
            rating: 4.9,
            experience: '۱۰ سال',
            image: '/api/placeholder/80/80',
            available: true
          },
          {
            id: 5,
            name: 'دکتر فاطمه کریمی',
            specialty: 'مشاور ازدواج',
            rating: 4.6,
            experience: '۴ سال',
            image: '/api/placeholder/80/80',
            available: true
          }
        ]);
        setLoading(false);
      }
    };

    fetchMoshavers();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, moshavers.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, moshavers.length - 2)) % Math.max(1, moshavers.length - 2));
  };

  const navigateToQuestionnaire = () => {
    window.location.href = '/questionnaire';
  };

  const navigateToProfile = () => {
    window.location.href = '/profile';
  };

  const navigateToAllMoshavers = () => {
    window.location.href = '/all-moshavers';
  };

  const navigateToJournal = () => {
    window.location.href = '/journal';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Hero Section - Questionnaire */}
      <section className="bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              مشاور مناسب خود را پیدا کنید
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            با پاسخ دادن به چند سوال ساده، بهترین مشاور را برای نیازهای خود پیدا کنید
          </p>
          <button 
            onClick={navigateToQuestionnaire}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
          >
            <BookOpen className="w-6 h-6" />
            شروع پرسشنامه
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">جلسات آینده شما</h2>
            <button 
              onClick={navigateToProfile}
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 transition-colors"
            >
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {sessions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div key={session.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{session.moshaverName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      session.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {session.status === 'confirmed' ? 'تایید شده' : 'در انتظار'}
                    </span>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <span>{session.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">هنوز جلسه‌ای رزرو نکرده‌اید</p>
              <button 
                onClick={navigateToAllMoshavers}
                className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
              >
                رزرو اولین جلسه
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Moshavers Slider */}
      <section className="py-16 bg-white/30 backdrop-blur-sm px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">مشاوران ما</h2>
            <button 
              onClick={navigateToAllMoshavers}
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 transition-colors"
            >
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={moshavers.length <= 3}
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={moshavers.length <= 3}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(${currentSlide * 33.333}%)` }}
                >
                  {moshavers.map((moshaver) => (
                    <div key={moshaver.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3">
                      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800">{moshaver.name}</h3>
                            <p className="text-gray-600 text-sm">{moshaver.specialty}</p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            moshaver.available ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{moshaver.rating}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{moshaver.experience} تجربه</span>
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-full text-sm transition-all duration-300">
                          {moshaver.available ? 'رزرو جلسه' : 'غیر فعال'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                حالت خود را در دفترچه یادداشت ثبت کنید
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                احساسات و تجربیات روزانه خود را ثبت کنید تا بهتر خودتان را بشناسید
              </p>
              <button
                onClick={() => navigate('/journal')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
              >
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                شروع نوشتن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars - Coming Soon */}
      <section className="py-16 bg-white/30 backdrop-blur-sm px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">وبینارهای آموزشی</h2>
            <p className="text-xl text-gray-600 mb-8">
              به زودی...
            </p>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <p className="text-gray-600 leading-relaxed">
                وبینارهای آموزشی با حضور بهترین روانشناسان و مشاوران کشور به زودی در مشاوریتو راه‌اندازی خواهد شد. 
                مطالب آموزشی، تکنیک‌های مفید و پاسخ به سوالات شما در این وبینارها ارائه خواهد شد.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;