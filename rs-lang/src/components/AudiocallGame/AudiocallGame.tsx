import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import LoaderButton from "../LoaderButton/LoaderButton";

export const categoriesList = [
  {
    name: "Beginner",
    level: "A1",
    color: "border-pink-400",
  },
  {
    name: "Easy",
    level: "A2",
    color: "border-yellow-500",
  },
  {
    name: "Normal",
    level: "B1",
    color: "border-emerald-400",
  },
  {
    name: "Medium",
    level: "B2",
    color: "border-blue-500",
  },
  {
    name: "Hard",
    level: "C1",
    color: "border-purple-500",
  },
  {
    name: "Monstrous",
    level: "C2",
    color: "border-red-500",
  },
];

type GameStartProps = {
  categoryIndex: number;
  onClickCategory: (index: number) => void;
  onGameBegin: () => void;
};

// type GameStatusType = "prep" | "running" | "result";

const dashedBorder = "border-dashed border-2 border-red-500";

export default function AudiocallGame() {
  const [gameStatus, setGameStatus] = useState("prep");
  const [categoryIndex, setCategoryIndex] = useState(0);

  const chooseCategory = (index: number) => setCategoryIndex(index);
  const startGame = () => setGameStatus("running"); //setGameStatus("running")

  return (
    <>
      {gameStatus === "prep" && (
        <StartPage
          categoryIndex={categoryIndex}
          onClickCategory={chooseCategory}
          onGameBegin={startGame}
        />
      )}
    </>
  );
}

function StartPage({
  categoryIndex,
  onClickCategory,
  onGameBegin,
}: GameStartProps) {
  return (
    <>
      <div
        className={`mx-auto bg-black-rgba w-[880px] h-[350px] mb-10 p-4 ${dashedBorder}`}
      >
        <p className="text-yellow-500">Аудирование</p>
        <div className="pt-[100px] text-base font-medium">
          <h2 className="text-white text-center text-[54px] leading-[54px] font-bold mb-5">
            Audio call
          </h2>
          <h4 className="text-white text-center text-base leading-[19px] tracking-widest font-bold">
            Тренировака Audio call улучшает твое восприятие речи на слух.
          </h4>
        </div>
      </div>
      <CategorySelection
        categoryIndex={categoryIndex}
        onClickCategory={onClickCategory}
        onGameBegin={onGameBegin}
      />
    </>
  );
}

function CategorySelection({
  categoryIndex,
  onClickCategory,
  onGameBegin,
}: GameStartProps) {
  return (
    <div
      className={`mx-auto flex flex-col items-center gap-[25px] bg-black-rgba w-[880px] h-[200px] mb-2 p-4 ${dashedBorder}`}
    >
      <p className="text-white font-bold text-[18px] leading-[21px]">
        Выберите уровень
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-[10px]">
        {categoriesList.map((obj, index) => {
          const level = (
            <li
              key={index}
              className={`rounded-full cursor-pointer flex items-center justify-center h-[50px] w-[50px] text-base 
              text-white font-semibold border-2 ${
                obj.color
              } hover:translate-y-[-5px] transition
                ${
                  index === categoryIndex &&
                  "border-emerald-600 text-emerald-600"
                }`}
              onClick={() => onClickCategory(index)}
            >
              {obj.level}
            </li>
          );
          return level;
        })}
      </ul>
      <LoaderButton
        type="button"
        className="audiocall__btn_begin relative w-[110px] h-[37px] font-semibold rounded-[4px]
          bg-red-500 hover:bg-red-400 transition-colors text-white text-[16px] leading-[17px]"
        onClick={onGameBegin}
      >
        <span className="pl-2 flex items-center justify-center">
          Начать <MdKeyboardArrowRight className="text-lg lg:text-3xl" />
        </span>
      </LoaderButton>
    </div>
  );
}
