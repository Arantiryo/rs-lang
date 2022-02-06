import resultsPseudoElem1 from "../../assets/svg/results-tracking__presudo-elem-1.svg";
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
        className="ml-auto relative top-[-10px] pb-2 mb-10 sm:right-[250px]"
        src={resultsPseudoElem1}
        alt="pseudo element"
      />
      <div className="relative flex items-start justify-start sm:top-[80px]">
        <GameSprint />
      </div>
      <div className="relative ml-auto top-[-120px]">
        <ResultsTrackingCard />
      </div>
    </div>
  );
}
