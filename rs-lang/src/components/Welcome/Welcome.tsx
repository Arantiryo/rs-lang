import { MdKeyboardArrowRight } from "react-icons/md";
import LoaderButton from "../LoaderButton/LoaderButton";
import welcomeImage from "../../assets/svg/welcome__img.svg";
import welcomePseudoElem2 from "../../assets/svg/welcome__pseudo-elem-2.svg";

export default function Welcome() {
  return (
    <div className="promo-section relative w-full">
      <div className="sm:w-2/3">
        <h2 className="text-xs sm:text-sm leading-3 text-blue-400 tracking-widest mb-1">
          Изучение английского языка
        </h2>
        <h1 className="text-lg  sm:text-2xl leading-5 text-emerald-600 font-bold tracking-wider mb-5">
          Учите новые слова каждый день
        </h1>
        <p className="text-xs sm:text-sm leading-5 text-white tracking-wider">
          Увлекательные игры для тренировки слов и метод интервального
          повторения для запоминания слов
        </p>
      </div>
      <div className="relative flex items-start justify-between">
        <LoaderButton
          type="button"
          className="welcome__btn_begin relative top-5 w-18 h-7 xs:w-24 xs:h-9 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white text-sm px-1"
          isLoading={false}
          disabled={false}
        >
          <span className="flex items-center justify-around">
            Начать <MdKeyboardArrowRight className="text-lg" />
          </span>
        </LoaderButton>
        <img
          className="relative xs:w-60 sm:w-72 sm:bottom-[100px]"
          src={welcomeImage}
          alt="welcome"
        />
      </div>
      <img
        className="relative  bottom-10 left-[-10px] sm:absolute sm:w-[200px] sm:bottom-[50px] sm:left-[100px]"
        src={welcomePseudoElem2}
        alt="pseudo element"
      />
    </div>
  );
}
