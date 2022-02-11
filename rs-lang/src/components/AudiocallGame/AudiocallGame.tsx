import { useState } from "react";
import StartPage from "./StartPage";
import GamePage from "./GamePage";

type GameStatusType = "prep" | "running" | "result";

export default function AudiocallGame() {
  const [gameStatus, setGameStatus] = useState<GameStatusType>("prep");
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
      {gameStatus === "running" && <GamePage categoryIndex={categoryIndex} />}
    </>
  );
}

export const shuffle = <T,>(arr: Array<T>) => {
  return [...arr]
    .sort(() => 0.5 - Math.random())
    .reverse()
    .sort(() => 0.5 - Math.random());
};

export const generateRandomIndexes = (
  maxIndex: number,
  numberToExclude: number,
  n = 4
) => {
  const randomIndexes: number[] = [];
  let numOfIndexes = n;

  while (numOfIndexes > 0) {
    const idx = Math.floor(Math.random() * maxIndex);
    if (!randomIndexes.includes(idx) && idx !== numberToExclude) {
      randomIndexes.push(idx);
      numOfIndexes -= 1;
    }
  }

  return randomIndexes;
};
