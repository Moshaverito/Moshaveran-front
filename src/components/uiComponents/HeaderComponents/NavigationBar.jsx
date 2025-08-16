import NavigationLink from "./NavigationLink";

function NavigationBar() {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      <NavigationLink href={`/about-us`}>درباره ما</NavigationLink>
      <NavigationLink href={`/plans`}> قوانین و مقررات</NavigationLink>
      <NavigationLink href={`/TermsAndConditions`}>خرید اشتراک</NavigationLink>
      {/* <a href="http://localhost:5173/#testimonials" className="text-gray-700 hover:text-teal-600 transition-colors">نظرات</a> */}
    </nav>
  );
}

export default NavigationBar;
