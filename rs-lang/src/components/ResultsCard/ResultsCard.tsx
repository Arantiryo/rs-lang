import { MdRepeat } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import LoaderButton from "../LoaderButton/LoaderButton";
import { PieChart } from "react-minimal-pie-chart";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { AnswerType } from "../AudiocallGame/Question";
import audioSvg from "../../assets/svg/audio.svg";

type DataType = {
  title: string;
  value: number;
  color: string;
};

const colors = {
  correct: "#047857",
  incorrect: "#DC2626",
};

type MenuTabsType = "results" | "extra";

export default function ResultsTrackingCard({
  size = "ml-auto max-w-[280px] max-h-[330px]",
  font = "text-[8px] leading-[10px] xs:text-sm md:text-[16px]",
  contentSize = "max-w-[160px] max-h-[160px]",
  buttonSize = "w-14 h-4 xs:w-20 xs:h-6",
  showExtra = false,
}) {
  const [tab, setTab] = useState<MenuTabsType>("results");
  const showResultsTab = () => setTab("results");
  const showExtraTab = () => setTab("extra");
  const gameResults = useAppSelector((state) => state.latestResultReducer);

  console.log(gameResults);

  const data: DataType[] = [
    { title: "One", value: 11, color: colors.correct },
    { title: "Two", value: 16, color: colors.incorrect },
  ];
  const resultLabel = Math.floor((data[0].value / data[1].value) * 100);

  return (
    <div className={`results-card w-full bg-gray-700 p-4 lg:p-5 ${size}`}>
      <ul className="list-none flex items-center justify-evenly gap-2 xs:mb-4">
        <li
          className={`${
            tab === "results" && "text-yellow-500 underline"
          } text-white font-medium ${font} underline-offset-4 cursor-pointer`}
          onClick={showResultsTab}
        >
          Результаты
        </li>
        {showExtra && (
          <li
            className={`${
              tab === "extra" && "text-yellow-500 underline"
            } text-white ${font} underline-offset-4 cursor-pointer`}
            onClick={showExtraTab}
          >
            Подробнее
          </li>
        )}
      </ul>
      {tab === "results" && (
        <Results
          data={data}
          resultLabel={resultLabel}
          contentSize={contentSize}
        />
      )}
      {tab === "extra" && (
        <Extra contentSize={contentSize} answers={gameResults.answers} />
      )}
      <div className="flex items-center justify-evenly">
        <LoaderButton
          type="button"
          className={`results__btn_retry ${buttonSize} md:w-[110px] md:h-9 
            bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1 mr-2`}
        >
          <span
            className={`flex items-center justify-around ${font} xs:text-xs md:text-[14px]`}
          >
            Повторить <MdRepeat className={`${font} md:text-[14px]`} />
          </span>
        </LoaderButton>
        <LoaderButton
          type="button"
          className={`results__btn_retry ${buttonSize} md:w-[110px] md:h-9 
            bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1`}
        >
          <span
            className={`flex items-center justify-around ${font} xs:text-xs md:text-[14px]`}
          >
            Учебник{" "}
            <IoReturnUpBackOutline className={`${font} md:text-[14px]`} />
          </span>
        </LoaderButton>
      </div>
    </div>
  );
}

type ResultsProps = {
  data: DataType[];
  resultLabel: number;
  contentSize: string;
};

function Results({ data, resultLabel, contentSize }: ResultsProps) {
  return (
    <div className="max-h-[310px]">
      <PieChart
        className={`py-2 mx-auto w-full h-full ${contentSize} xs:py-1 xs:mb-4`}
        lineWidth={35}
        paddingAngle={1}
        label={() => `${resultLabel}%`}
        labelStyle={{
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "sans-serif",
          fill: "#ffffff",
        }}
        labelPosition={0}
        data={data}
      />
    </div>
  );
}

type ExtraProps = {
  contentSize: string;
  answers: AnswerType[];
};

function Extra({ answers }: ExtraProps) {
  return (
    <div className={`flex items-center justify-center text-center py-2`}>
      <ul className={`max-w-[800px] w-full`}>
        {answers.map((answer, idx) => {
          const li = (
            <li key={idx} className="flex items-center justify-evenly">
              <img
                className="inline-block w-[22px] h-[18px] cursor-pointer mx-1"
                // onClick={onClick}
                src={audioSvg}
                alt="play audio"
              />
              <span className="text-white w-full text-[12px] hidden xs:text-[16px] xs:inline-block">
                {answer.givenAnswer.word}
              </span>
              {/* <span className="text-white w-full">
                {answer.givenAnswer.transcription}
              </span> */}
              <span className="text-white w-full">
                {answer.givenAnswer.wordTranslate}
              </span>
              <span className="text-white w-full shrink-[2]">
                {answer.isCorrect ? "✔️" : "❌"}
              </span>
            </li>
          );
          return li;
        })}
      </ul>
    </div>
  );
}
