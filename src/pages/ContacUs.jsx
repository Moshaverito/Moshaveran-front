import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, AlertCircle, Shield, Headphones, Users, Globe } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const openGoftino = () => {
    // Initialize Goftino chat
    if (window.Goftino) {
      window.Goftino.open();
    } else {
      // Fallback if Goftino is not loaded
      alert('چت آنلاین در حال بارگذاری است. لطفاً چند لحظه صبر کنید.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Goftino Script */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            window.Goftino = window.Goftino || {};
            window.Goftino.config = {
              key: 'your-goftino-key',
              hasSmile: true,
              hasCounter: true
            };
          `
        }}
      />

      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/50 rounded-full transition-all">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              تماس با ما
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-4">
              ما همیشه در خدمت شما هستیم
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              تیم پشتیبانی مشاوریتو آماده پاسخگویی به سوالات و درخواست‌های شما است. از طریق راه‌های مختلف زیر می‌توانید با ما در ارتباط باشید.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Online Chat */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">چت آنلاین امن</h3>
              <p className="text-gray-600 text-sm mb-4">گفتینو - امنیت بالا</p>
              <button 
                onClick={openGoftino}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-2 px-4 rounded-xl text-sm font-medium transition-all"
              >
                شروع گفتگو
              </button>
            </div>

            {/* Email */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">ایمیل</h3>
              <p className="text-gray-600 text-sm mb-4">moshaverito@gmail.com</p>
              <a 
                href="mailto:moshaverito@gmail.com"
                className="w-full inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl text-sm font-medium transition-all"
              >
                ارسال ایمیل
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">تماس تلفنی</h3>
              <p className="text-gray-600 text-sm mb-4">09367866763</p>
              <a 
                href="tel:09100183929"
                className="w-full inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-4 rounded-xl text-sm font-medium transition-all"
              >
                تماس بگیرید
              </a>
            </div>

            {/* Support Hours */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">ساعات پاسخگویی</h3>
              <p className="text-gray-600 text-sm mb-2">شنبه تا پنج‌شنبه</p>
              <p className="text-gray-600 text-sm">8:00 - 20:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-center text-white shadow-xl">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">نیاز به کمک فوری دارید؟</h3>
            <p className="mb-6 opacity-90">
              تیم پشتیبانی ما آماده پاسخگویی سریع به سوالات اضطراری شما است
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openGoftino}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white py-3 px-6 rounded-xl font-medium transition-all"
              >
                چت آنلاین
              </button>
              <a 
                href="tel:09100183929"
                className="bg-white text-teal-600 hover:bg-gray-100 py-3 px-6 rounded-xl font-medium transition-all"
              >
                تماس فوری
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;