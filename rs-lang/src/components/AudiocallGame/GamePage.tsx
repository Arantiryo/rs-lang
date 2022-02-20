import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import { getWords } from "../../utils/WebClients";
import { DangerAlert } from "../Alerts/Alerts";
import { generateRandomIndexes, shuffle } from "./AudiocallGame";
import Countdown from "./Countdown";
import { updateResult } from "./latestResultSlice";
import Question, { AnswerType, QuestionType } from "./Question";

type GamePageProps = {
  categoryIndex: number;
  onGameEnd: () => void;
};

export default function GamePage({ categoryIndex, onGameEnd }: GamePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const saveAnswer = (newAnswer: AnswerType) => setAnswers([...answers, newAnswer]);

  const loadNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      dispatch(updateResult({ questions, answers, gameName: "audiocall" }));
      onGameEnd();
    }
  };

  setTimeout(() => questions.length > 0 && setIsLoading(false), 3500);

  useEffect(() => {
    const getData = async (categoryIndex: number) => {
      const page = parseInt(params?.page) || Math.floor(Math.random() * 30);
      const category = parseInt(params?.category) || categoryIndex;
      const words = await getWords(page, category);

      try {
        setQuestions(createQuestions(words));
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    };

    getData(categoryIndex);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {isError ? (
        <DangerAlert
          title="Упс!"
          text="Что-то пошло не так. Пожалуйста, попробуйте перезайти в игру."
        />
      ) : isLoading ? (
        <Countdown />
      ) : (
        <Question
          questionData={questions[questionIndex]}
          saveAnswer={saveAnswer}
          loadNextQuestion={loadNextQuestion}
        />
      )}
    </div>
  );
}

const createQuestions = (words: IWord[]) => {
  if (words.length === 0) {
    throw new Error("No words to create questions from!");
  }

  const numberOfQuestions = words.length;
  const shuffled = shuffle(words);

  const questions: QuestionType[] = shuffled.map((word, idx) => {
    const options = [
      word,
      ...generateRandomIndexes(numberOfQuestions, idx).map((randomIndex) => shuffled[randomIndex]),
    ];
    return { word, options };
  });
  return questions;
};
