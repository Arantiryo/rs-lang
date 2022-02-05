import { MdRepeat } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import tempResultsCircle from "../../../assets/svg/results-tacking__temp-stats-circle.svg";
import LoaderButton from "../../LoaderButton/LoaderButton";

export default function ResultsTrackingCard() {
  return (
    <div className="results-card ml-auto w-1/2 bg-gray-700 max-w-[280px] max-h-[330px] p-4">
      <ul className="list-none flex items-center justify-between">
        <li className="text-yellow-500 font-medium text-[8px] leading-[10px] underline underline-offset-4">
          Результаты
        </li>
        <li className="text-white text-[8px] leading-[10px] underline underline-offset-4">
          Подробнее
        </li>
      </ul>
      <img className="py-3 mx-auto" src={tempResultsCircle} alt="statistics" />
      <div className="flex items-center justify-center">
        <LoaderButton
          type="button"
          className="results__btn_retry w-10 h-3 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1 mr-2"
        >
          <span className="flex items-center justify-around text-[7px] leading-[7px]">
            Повторить <MdRepeat className="text-[7px] leading-[7px]" />
          </span>
        </LoaderButton>
        <LoaderButton
          type="button"
          className="results__btn_retry w-10 h-3 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1"
        >
          <span className="flex items-center justify-around text-[7px] leading-[7px]">
            Учебник{" "}
            <IoReturnUpBackOutline className="text-[7px] leading-[7px]" />
          </span>
        </LoaderButton>
      </div>
    </div>
  );
}
