/* eslint react/prop-types: 0 */

function NavigationLink({ children, href, onClick }) {
  return (
    <a
      href={href}
      className="text-gray-700 hover:text-teal-600 transition-colors sm:text-base py-2 text-sm"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default NavigationLink;
