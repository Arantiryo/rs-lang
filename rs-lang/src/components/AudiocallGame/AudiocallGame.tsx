import { useEffect, useState } from "react";
import IWord from "../../interfaces/IWord";
import { getObjURL, getWords } from "../../utils/WebClients";
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
    .reverse()
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

type QuestionType = {
  word: IWord;
  options: IWord[];
};

const createQuestions = (words: IWord[]) => {
  const numberOfQuestions = words.length;
  const shuffled = shuffle(words);

  const questions: QuestionType[] = shuffled.map((word, idx) => {
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
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  console.log(answers);

  const saveAnswer = (newAnswer: AnswerType) =>
    setAnswers([...answers, newAnswer]);

  // TODO: handle last question and show results
  const loadNextQuestion = () => setQuestionIndex(questionIndex + 1);

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
      {isLoading ? (
        <Countdown />
      ) : (
        <Question
          questionData={questions[questionIndex]}
          // answers={answers}
          saveAnswer={saveAnswer}
          loadNextQuestion={loadNextQuestion}
        />
      )}
    </div>
  );
}

type AnswerType = {
  correctAnswer: IWord;
  givenAnswer: IWord;
  isCorrect: boolean;
};

type QuestionProps = {
  questionData: QuestionType;
  // answers: AnswerType[];
  loadNextQuestion: () => void;
  saveAnswer: (answer: AnswerType) => void;
};

const optionStyles = `w-[180px] h-[50px] bg-black-rgba 
  flex items-center justify-center cursor-pointer
  border border-white rounded-[56px]
  hover:border-yellow-500 transition-colors`;
const optionTextStyles =
  "text-white uppercase text-[14px] leading-[16px] tracking-wider";

function Question({
  questionData,
  // answers,
  loadNextQuestion,
  saveAnswer,
}: QuestionProps) {
  // TODO: implement game logic
  const [answer, setAnswer] = useState<AnswerType | null>(null);
  const [audioURL, setAudioURL] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState<IWord[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffle(questionData.options));
  }, [questionData.options]);

  useEffect(() => {
    getObjURL(questionData.word.audio).then((objUrl) => {
      setAudioURL(objUrl);
    });
  }, [questionData.word.audio]);

  const handleAnswer = (givenAnswer: IWord) => {
    if (answer) return;

    const newAnswer: AnswerType = {
      correctAnswer: questionData.word,
      givenAnswer: givenAnswer,
      isCorrect: questionData.word.id === givenAnswer.id,
    };

    // answers.push(newAnswer);
    saveAnswer(newAnswer);
    // console.log(answers);
    setAnswer(newAnswer);
  };

  const resetAnswer = () => setAnswer(null);

  const handlePlayAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <AudioButton onClick={handlePlayAudio} />
      <ul className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-8">
        {shuffledOptions.map((word, idx) => {
          return (
            <li key={idx}>
              <Option
                word={word}
                answer={answer}
                onClick={() => handleAnswer(word)}
              />
            </li>
          );
        })}
      </ul>
      <NextQuestion
        answer={answer}
        loadNextQuestion={loadNextQuestion}
        resetAnswer={resetAnswer}
      />
    </div>
  );
}

type NextQuestionProps = {
  answer: AnswerType | null;
  resetAnswer: () => void;
  loadNextQuestion: () => void;
};

function NextQuestion({
  answer,
  resetAnswer,
  loadNextQuestion,
}: NextQuestionProps) {
  const handleClick = () => {
    resetAnswer();
    loadNextQuestion();
  };

  return (
    <div
      className={`${optionStyles} ${
        answer
          ? "bg-blue-400 hover:bg-blue-300"
          : "bg-yellow-600 hover:bg-yellow-500"
      }`}
      onClick={handleClick}
    >
      <span className={`${optionTextStyles} `}>
        {`${answer ? "Дальше" : "Пропустить"}`}
      </span>
    </div>
  );
}

type OptionProps = {
  word: IWord;
  answer: AnswerType | null;
  onClick: () => void;
};

function Option({ word, answer, onClick }: OptionProps) {
  const isCorrect = answer && answer.correctAnswer.id === word.id;
  const isWrong =
    answer?.isCorrect === false && answer.givenAnswer.id === word.id;

  return (
    <div
      className={`${optionStyles} ${isCorrect && "bg-emerald-400"} ${
        isWrong && "bg-red-400"
      }`}
      onClick={onClick}
    >
      <span className={`${optionTextStyles} text-center`}>
        {word.wordTranslate}
      </span>
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
