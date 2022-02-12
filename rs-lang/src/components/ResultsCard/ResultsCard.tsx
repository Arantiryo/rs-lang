import { MdRepeat } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import tempResultsCircle from "../../assets/svg/results-tacking__temp-stats-circle.svg";
import LoaderButton from "../LoaderButton/LoaderButton";

export default function ResultsTrackingCard({
  size = "ml-auto max-w-[280px] max-h-[330px]",
}) {
  return (
    <div className={`results-card w-full bg-gray-700 p-4 lg:p-7 ${size}`}>
      <ul className="list-none flex items-center justify-evenly xs:mb-4">
        <li className="text-yellow-500 font-medium text-[8px] leading-[10px] xs:text-sm underline underline-offset-4 mr-2">
          Результаты
        </li>
        <li className="text-white text-[8px] leading-[10px] xs:text-sm underline-offset-4">
          Подробнее
        </li>
      </ul>
      <img
        className="py-2 mx-auto w-full h-full max-w-[160px] max-h-[160px] xs:py-1 xs:mb-4"
        src={tempResultsCircle}
        alt="statistics"
      />
      <div className="flex items-center justify-evenly">
        <LoaderButton
          type="button"
          className="results__btn_retry w-14 h-4 xs:w-20 xs:h-6 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1 mr-2"
        >
          <span className="flex items-center justify-around text-[7px] leading-[7px] xs:text-xs">
            Повторить{" "}
            <MdRepeat className="text-[7px] leading-[7px] xs:text-xs" />
          </span>
        </LoaderButton>
        <LoaderButton
          type="button"
          className="results__btn_retry w-14 h-4 xs:w-20 xs:h-6 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1"
        >
          <span className="flex items-center justify-around text-[7px] leading-[7px] xs:text-xs">
            Учебник{" "}
            <IoReturnUpBackOutline className="text-[7px] leading-[7px] xs:text-xs" />
          </span>
        </LoaderButton>
      </div>
    </div>
  );
}
