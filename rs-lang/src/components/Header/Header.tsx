import headerLogo from "../../assets/svg/header__logo.svg";

export default function Header() {
  return (
    <div className="header w-full h-20 flex items-center justify-between">
      <img className="block w-24 h-18" src={headerLogo} alt="header logo" />
      <BurgerMenu />
    </div>
  );
}

function BurgerMenu() {
  return (
    <div className="p-2 space-y-1 border-2 rounded shadow">
      <span className="block w-6 h-0.5 bg-white"></span>
      <span className="block w-6 h-0.5 bg-white"></span>
      <span className="block w-6 h-0.5 bg-white"></span>
    </div>
  );
}
