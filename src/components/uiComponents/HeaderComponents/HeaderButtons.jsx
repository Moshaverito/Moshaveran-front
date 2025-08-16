import EnterButton from "./EnterButton";
import StartWorkingWithUsButton from "./StartWorkingWithUsButton";
/* eslint react/prop-types: 0 */
function HeaderButtons({ closeMobileMenu }) {
  return (
    <>
      <EnterButton navigateLink={`/login`} type={`bg`}>
        ورود
      </EnterButton>
      <StartWorkingWithUsButton
        navigateLink={"/wait"}
        type={`bg`}
        closeMobileMenu={closeMobileMenu}
      >
        شروع همکاری
      </StartWorkingWithUsButton>
    </>
  );
}

export default HeaderButtons;
