import { NavLink } from "react-router-dom";

type NavProps = {
  open: boolean;
};

const RightNav = ({ open }: NavProps) => {
  return (
    <ul
      className={`list-none flex flex-nowrap z-50 mw:flex-col mw:bg-gray-700 
      mw:fixed ${open ? "mw:translate-x-0" : "mw:translate-x-full"} 
      mw:top-0 mw:right-0 mw:h-screen mw:w-[280px] mw:pt-14 mw:transition-transform mw:duration-500`}
    >
      <li className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors">
        <NavLink to="/textbook" activeClassName="text-yellow-500">
          Учебник
        </NavLink>
      </li>
      <li className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors">
        <NavLink to="/games" activeClassName="text-yellow-500">
          Игры
        </NavLink>
      </li>
      <li className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors">
        <NavLink to="/team" activeClassName="text-yellow-500">
          О команде
        </NavLink>
      </li>
      <li className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors">
        <NavLink to="/statistics" activeClassName="text-yellow-500">
          Статистика
        </NavLink>
      </li>
      <li className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors">
        <NavLink to="/signup" activeClassName="text-yellow-500">
          Регистрация
        </NavLink>
      </li>
      <li className="text-white cursor-pointer text-center transition-colors bg-emerald-700 hover:bg-emerald-600">
        <NavLink to="/login" activeClassName="text-yellow-500">
          <div className="py-2 px-6 xl:px-8 w-full mx-auto h-full ">Войти</div>
        </NavLink>
      </li>
    </ul>
  );
};

export default RightNav;
