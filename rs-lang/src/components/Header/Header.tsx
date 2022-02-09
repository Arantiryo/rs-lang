import { Link } from "react-router-dom";
import headerLogo from "../../assets/svg/header__logo.svg";
import closeIcon from "../../assets/svg/close.svg";
import Nav from "./Navbar/Burger";

export default function Header({ isGameHeader = false }) {
  return (
    <header className="header px-5 max-w-7xl mx-auto xxl:px-0 relative w-full h-20 lg:h-[120px] flex items-center justify-between">
      <Link to="/">
        <img
          className="block relative top-[-2px] w-24 sm:w-[140px] lg:w-[200px]"
          src={headerLogo}
          alt="header logo"
        />
      </Link>
      {isGameHeader ? (
        <Link to="/games" className="text-gray-200">
          <img src={closeIcon} alt="close" />
        </Link>
      ) : (
        <Nav></Nav>
      )}
    </header>
  );
}
