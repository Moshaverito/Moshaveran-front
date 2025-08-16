import EnterButton from "./EnterButton";
import StartWorkingWithUsButton from "./StartWorkingWithUsButton";
/* eslint react/prop-types: 0 */
function MobileButtons({ closeMobileMenu }) {
  return (
    <>
      <EnterButton
        navigateLink={`/login`}
        closeMobileMenu={closeMobileMenu}
        type={`sm`}
      >
        ورود
      </EnterButton>
      <StartWorkingWithUsButton type={`sm`} closeMobileMenu={closeMobileMenu}>
        شروع همکاری
      </StartWorkingWithUsButton>
    </>
  );
}

export default MobileButtons;
