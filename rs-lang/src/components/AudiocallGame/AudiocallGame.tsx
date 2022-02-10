import { useEffect, useState } from "react";
import StartPage from "./StartPage";

// type GameStatusType = "prep" | "running" | "result";

export default function AudiocallGame() {
  const [gameStatus, setGameStatus] = useState("prep");
  const [categoryIndex, setCategoryIndex] = useState(0);

  const chooseCategory = (index: number) => setCategoryIndex(index);
  const startGame = () => setGameStatus("running");

  return (
    <>
      {gameStatus === "prep" && (
        <StartPage
          categoryIndex={categoryIndex}
          onClickCategory={chooseCategory}
          onGameBegin={startGame}
        />
      )}
      {gameStatus === "running" && (
        <GamePage categoryIndex={categoryIndex} /> //isLoading={true}
      )}
    </>
  );
}

type GamePageProps = {
  categoryIndex: number;
  // isLoading: boolean;
};

function GamePage({ categoryIndex }: GamePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => setIsLoading(false), 3000);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {isLoading ? <Countdown /> : <div>{categoryIndex}</div>}
    </div>
  );
}

function Countdown({ time = 3 }) {
  const [counter, setCounter] = useState(time);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-red-500 bg-black-rgba rounded-full">
      <span className="text-white text-[64px] leading-[75px]">{counter}</span>
    </div>
  );
}
