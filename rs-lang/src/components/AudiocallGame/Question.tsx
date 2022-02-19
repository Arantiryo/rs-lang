import { useCallback, useEffect, useState } from "react";
import IWord from "../../interfaces/IWord";
import { getObjURL } from "../../utils/WebClients";
import AnswerCard from "./AnswerCard";
import AudioButton from "./AudioButton";
import Option from "./Option";
import { shuffle } from "./AudiocallGame";
import { optionStyles, optionTextStyles } from "./Option";

export type QuestionType = {
  word: IWord;
  options: IWord[];
};

export type AnswerType = {
  correctAnswer: IWord;
  givenAnswer: IWord;
  isCorrect: boolean;
};

type QuestionProps = {
  questionData: QuestionType;
  loadNextQuestion: () => void;
  saveAnswer: (answer: AnswerType) => void;
};

export default function Question({
  questionData,
  loadNextQuestion,
  saveAnswer,
}: QuestionProps) {
  const [answer, setAnswer] = useState<AnswerType | null>(null);
  const [audioURL, setAudioURL] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState<IWord[]>([]);

  const handlePlayAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  // switch options around so the right answer isn't obvious
  useEffect(() => {
    setShuffledOptions(shuffle(questionData.options));
  }, [questionData.options]);

  // audio and image URLs
  useEffect(() => {
    getObjURL(questionData.word.audio).then((url) => {
      setAudioURL(url);
      new Audio(url).play();
    });
    getObjURL(questionData.word.image).then((imgUrl) => {
      setImgURL(imgUrl);
    });
  }, [questionData.word]);

  const handleAnswer = (givenAnswer: IWord) => {
    if (answer) return;

    const newAnswer: AnswerType = {
      correctAnswer: questionData.word,
      givenAnswer: givenAnswer,
      isCorrect: questionData.word.id === givenAnswer.id,
    };

    saveAnswer(newAnswer);
    setAnswer(newAnswer);
  };

  const resetAnswer = () => setAnswer(null);

  return (
    <div className="flex flex-col items-center justify-center">
      {answer ? (
        <AnswerCard
          word={questionData.word}
          img={imgURL}
          onClick={handlePlayAudio}
        />
      ) : (
        <AudioButton onClick={handlePlayAudio} />
      )}
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
      <span className={`${optionTextStyles}  select-none`}>
        {`${answer ? "Дальше" : "Пропустить"}`}
      </span>
    </div>
  );
}
