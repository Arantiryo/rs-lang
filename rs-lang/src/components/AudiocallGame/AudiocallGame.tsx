import { useEffect, useState } from "react";
import IWord from "../../interfaces/IWord";
import { getWords } from "../../utils/WebClients";
import StartPage from "./StartPage";
import audioSvg from "../../assets/svg/audio.svg";

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
      {gameStatus === "running" && <GamePage categoryIndex={categoryIndex} />}
    </>
  );
}

type GamePageProps = {
  categoryIndex: number;
};

function shuffle<T>(arr: Array<T>) {
  return [...arr]
    .sort(() => 0.5 - Math.random())
    .sort(() => 0.5 - Math.random());
}

const generateRandomIndexes = (
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

type Question = {
  word: IWord;
  options: IWord[];
};

const createQuestions = (words: IWord[]) => {
  const numberOfQuestions = words.length;
  const shuffled = shuffle(words);

  const questions: Question[] = shuffled.map((word, idx) => {
    const options = [
      word,
      ...generateRandomIndexes(numberOfQuestions, idx).map(
        (randomIndex) => shuffled[randomIndex]
      ),
    ];
    return { word, options };
  });
  return questions;
};

function GamePage({ categoryIndex }: GamePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  setTimeout(() => setIsLoading(false), 4000);
  console.log("GamePage rendered");

  useEffect(() => {
    // TODO: consider refactoring
    // TODO: handle errors
    const getData = async (group: number) => {
      const page = Math.floor(Math.random() * 30);
      const words = await getWords(page, group);

      setQuestions(createQuestions(words));
    };

    getData(categoryIndex);
  }, [categoryIndex]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {isLoading ? <Countdown /> : <Question />}
    </div>
  );
}

function Question() {
  const handlePlayAudio = () => {
    console.log("Playing audio!");
  };

  return (
    <div className="">
      <AudioButton onClick={handlePlayAudio} />
    </div>
  );
}

type AudioButtonProps = {
  onClick: () => void;
};

function AudioButton({ onClick }: AudioButtonProps) {
  return (
    <div
      className="w-[150px] h-[150px] flex items-center justify-center border-2 border-red-500 border-dashed bg-black-rgba 
        rounded-full cursor-pointer"
      onClick={onClick}
    >
      <img className="w-[70px] h-[58px]" src={audioSvg} alt="play audio" />
    </div>
  );
}

function Countdown() {
  const time = 3;
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
