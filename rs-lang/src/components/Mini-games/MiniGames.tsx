import { MdKeyboardArrowRight } from "react-icons/md";
import LoaderButton from "../LoaderButton/LoaderButton";
import { GameAudioCall, GameSprint, GameWordle } from "../GameCard/GameCard";

export default function MiniGames() {
  return (
    <div className="minigames-section relative w-full">
      <h3 className="text-xs leading-3 text-blue-400 tracking-widest mb-1">
        Каталог мини-игр
      </h3>
      <h2 className="text-lg leading-5 text-white font-bold tracking-wider mb-5">
        Разнообразные игры для обучения
      </h2>
      <p className="text-xs leading-5 text-white mb-2">
        Проведите время с пользой, закрепите и обновите ваши лингвистические
        навыки с помощью игр, которые не дадут заскучать и сохранят мотивацию к
        изучению английского языка.
      </p>
      <LoaderButton
        type="button"
        className="minigames__btn_begin relative w-18 h-7 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white text-sm px-1 mb-5"
        isLoading={false}
        disabled={false}
      >
        <span className="flex items-center justify-around">
          Начать <MdKeyboardArrowRight className="text-lg" />
        </span>
      </LoaderButton>
      <div className="pt-10 relative flex flex-col items-center">
        <div className="rotate-12 relative">
          <GameSprint width="170px" fontMd="10px" fontSm="8px" />
        </div>
        <div className="rotate-12 relative top-[-30px]">
          <GameAudioCall width="170px" fontMd="10px" fontSm="8px" />
        </div>
        <div className="rotate-12 relative top-[-60px]">
          <GameWordle width="170px" fontMd="10px" fontSm="8px" />
        </div>
      </div>
    </div>
  );
}
