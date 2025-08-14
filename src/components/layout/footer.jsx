import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Video,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center ml-3">
                <MessageCircle className="w-6 h-6 text-blue-900" />
              </div>
              <span className="text-xl font-bold">مشاوریتو</span>
            </div>
            <p className="text-gray-400 space-y-4 leading-relaxed">
              پلتفرم تراپی آنلاین برای دسترسی آسان به روانشناسان و مشاوران مجاز
              در سراسر ایران.
            </p>
            <div className="flex  space-x-5 space-x-reverse pt-5">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدمات</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  مشاوره تحصیلی
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  مشاوره زوجین
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  مشاوره شغلی
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  مشاوره فردی
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  مشاوره اسلامی
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">شرکت</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  درباره ما
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-white transition-colors">تیم ما</a>
              </li> */}
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  همکاری با ما
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  اخبار
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-white transition-colors">شرکا</a>
              </li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">پشتیبانی</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  راهنما
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  سوالات متداول
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  تماس با ما
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-white transition-colors">گزارش مشکل</a>
              </li> */}
              {/* <li>
                <a href="#" className="hover:text-white transition-colors">وضعیت سرویس</a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm text-blue-200">تلفن پشتیبانی</div>
                <div className="font-medium">09367866763</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm text-blue-200">ایمیل</div>
                <div className="font-medium">info@moshaveritoo.ir</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm text-blue-200">آدرس</div>
                <div className="font-medium">تهران، خیابان ولیعصر</div>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Methods */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">روش‌های ارتباط</h3>
            <p className="text-blue-100">چندین روش برای ارتباط با مشاوران</p>
          </div>
          <div className="flex justify-center space-x-8 space-x-reverse">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">پیام‌رسانی</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">تماس صوتی</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">تماس تصویری</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-blue-200">
            © ۲۰۲۵ مشاوریتو تمام حقوق محفوظ است.
          </div>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-blue-200 hover:text-white transition-colors"
            >
              حریم خصوصی
            </a>
            <a
              href="#"
              className="text-sm text-blue-200 hover:text-white transition-colors"
            >
              شرایط استفاده
            </a>
            <a
              href="#"
              className="text-sm text-blue-200 hover:text-white transition-colors"
            >
              کوکی‌ها
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
