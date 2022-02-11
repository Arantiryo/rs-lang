import IWord from "../../interfaces/IWord";
import { AnswerType } from "./Question";

type OptionProps = {
  word: IWord;
  answer: AnswerType | null;
  onClick: () => void;
};

export const optionStyles = `w-[180px] h-[50px] bg-black-rgba 
  flex items-center justify-center cursor-pointer
  border border-white rounded-[56px]
  hover:border-yellow-500 transition-colors`;
export const optionTextStyles =
  "text-white uppercase text-[14px] leading-[16px] tracking-wider";

export default function Option({ word, answer, onClick }: OptionProps) {
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
