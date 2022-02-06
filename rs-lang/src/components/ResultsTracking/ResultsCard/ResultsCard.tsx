import { MdRepeat } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import tempResultsCircle from "../../../assets/svg/results-tacking__temp-stats-circle.svg";
import LoaderButton from "../../LoaderButton/LoaderButton";

export default function ResultsTrackingCard() {
  return (
    <div className="results-card ml-auto w-1/2 bg-gray-700 max-w-[280px] max-h-[330px] p-4">
      <ul className="list-none flex items-center justify-evenly sm:mb-4">
        <li className="text-yellow-500 font-medium text-[8px] leading-[10px] sm:text-sm underline underline-offset-4 mr-2">
          Результаты
        </li>
        <li className="text-white text-[8px] leading-[10px] sm:text-sm underline underline-offset-4">
          Подробнее
        </li>
      </ul>
      <img
        className="py-2 mx-auto w-full h-full max-w-[160px] max-h-[160px] sm:py-1 sm:mb-4"
        src={tempResultsCircle}
        alt="statistics"
      />
      <div className="flex items-center justify-evenly">
        <LoaderButton
          type="button"
          className="results__btn_retry w-14 h-4 sm:w-20 sm:h-6 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1 mr-2"
        >
          <span className="flex items-center justify-around text-[7px] leading-[7px] sm:text-xs">
            Повторить{" "}
            <MdRepeat className="text-[7px] leading-[7px] sm:text-xs" />
          </span>
        </LoaderButton>
        <LoaderButton
          type="button"
          className="results__btn_retry w-14 h-4 sm:w-20 sm:h-6 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1"
        >
          <span className="flex items-center justify-around text-[7px] leading-[7px] sm:text-xs">
            Учебник{" "}
            <IoReturnUpBackOutline className="text-[7px] leading-[7px] sm:text-xs" />
          </span>
        </LoaderButton>
      </div>
    </div>
  );
}
