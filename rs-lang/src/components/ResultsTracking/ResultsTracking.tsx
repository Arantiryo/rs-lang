import resultsPseudoElem1 from "../../assets/svg/results-tracking__presudo-elem-1.svg";
import resultsPseudoCircle from "../../assets/svg/results-tracking__pseudo.svg";
import { GameSprint } from "../GameCard/GameCard";
import ResultsTrackingCard from "./ResultsCard/ResultsCard";

export default function ResultsTracking() {
  return (
    <div className="promo-section relative w-full">
      <div className="sm:w-2/3">
        <h2 className="text-lg sm:text-2xl leading-5 text-emerald-600 font-bold tracking-wider mb-5">
          Отслеживание результатов
        </h2>
        <p className="text-xs sm:text-sm leading-5 text-white tracking-wider">
          Вне зависимости от того, играете ли вы или тренируете слова -
          статистика по изученным словам обновляется и всегда доступна в
          настройках.
        </p>
      </div>
      <img
        className="ml-auto relative top-[-10px] pb-2 mb-10 sm:right-[250px] sm:top-[40px] sm:w-1/6 "
        src={resultsPseudoElem1}
        alt="pseudo element"
      />
      <div className="relative ml-auto w-3/4 max-w-[520px] flex items-baseline justify-end mb-10 sm:top-[-50px]">
        <div className="relative top-[40px] left-[80px] z-10 xs:top-[60px]">
          <GameSprint />
        </div>
        <div className="relative z-10">
          <ResultsTrackingCard />
        </div>
        <img
          className="absolute w-5/6 h-5/6 bottom-[-30px] left-[20px] sm:bottom-[-80px] sm:left-[90px]"
          src={resultsPseudoCircle}
          alt="pseudo element"
        />
      </div>
    </div>
  );
}
