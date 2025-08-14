function NavigationBar() {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      <a
        href="/about-us"
        className="text-gray-700 hover:text-teal-600 transition-colors"
      >
        درباره ما
      </a>
      <a
        href="/TermsAndConditions"
        className="text-gray-700 hover:text-teal-600 transition-colors"
      >
        قوانین و مقررات
      </a>
      {/* <a href="http://localhost:5173/#testimonials" className="text-gray-700 hover:text-teal-600 transition-colors">نظرات</a> */}
      <a
        href="/plans"
        className="text-gray-700 hover:text-teal-600 transition-colors"
      >
        خرید اشتراک
      </a>
    </nav>
  );
}

export default NavigationBar;
