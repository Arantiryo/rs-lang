import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import { getWords } from "../../utils/WebClients";
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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const dispatch = useAppDispatch();

  const saveAnswer = (newAnswer: AnswerType) =>
    setAnswers([...answers, newAnswer]);

  // TODO: handle last question and show results
  const loadNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      dispatch(updateResult({ questions, answers }));
      onGameEnd();
    }
  };

  setTimeout(() => setIsLoading(false), 4000);

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
          saveAnswer={saveAnswer}
          loadNextQuestion={loadNextQuestion}
        />
      )}
    </div>
  );
}

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
