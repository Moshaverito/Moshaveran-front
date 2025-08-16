import NavigationLink from "./NavigationLink";
import MobileButtons from "./MobileButtons";
import MobileButtonsLoggedin from "./MobileButtonsLoggedin";

/* eslint react/prop-types: 0 */

function MobileNavigation({ closeMobileMenu, isLoggedIn, handleLogout }) {
  return (
    <nav className="flex flex-col gap-4">
      {/* Navigation Links */}
      <NavigationLink href="/about-us" onClick={closeMobileMenu}>
        درباره ما
      </NavigationLink>
      <NavigationLink href="/TermsAndConditions" onClick={closeMobileMenu}>
        قوانین و مقررات
      </NavigationLink>
      <NavigationLink href="/plans" onClick={closeMobileMenu}>
        خرید اشتراک
      </NavigationLink>

      {/* Mobile-specific actions */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
        {!isLoggedIn ? (
          <MobileButtons closeMobileMenu={closeMobileMenu} />
        ) : (
          <MobileButtonsLoggedin
            closeMobileMenu={closeMobileMenu}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </nav>
  );
}

export default MobileNavigation;
