import imgSprint from "../../assets/images/card__sprint.png";
import imgAudioCall from "../../assets/images/card__audio-call.png";
import imgWordle from "../../assets/images/card__wordle.png";
import {
  BsCheckCircleFill,
  BsCheckLg,
  BsFillBarChartFill,
} from "react-icons/bs";

type GameProps = {
  name: string;
  learntWords: number;
  correctAnswersPrc: number;
  longestStreak: number;
  picture: string;
};

export function GameStatsCard({
  name,
  learntWords,
  correctAnswersPrc,
  longestStreak,
  picture,
}: GameProps) {
  return (
    <div
      className={`relative flex items-center justify-start max-w-[280px] max-h-[130px] 
      bg-gray-700 rounded-md p-[10px] overflow-hidden
      `}
    >
      <div className={`overflow-hidden min-w-[170px] sm:h-full`}>
        <h4
          className={`text-white font-semibold tracking-[1px] text-[18px] leading-[21px] mb-2`}
        >
          {name}
        </h4>
        <p className={`text-white font-medium text-[12px] leading-[14px] mb-2`}>
          <span className="flex gap-1">
            <BsCheckCircleFill /> {`Изучено ${learntWords} слов`}
          </span>
        </p>
        <p className={`text-white font-medium text-[12px] leading-[14px] mb-2`}>
          <span className="flex gap-1">
            <BsCheckLg /> {`Правильных ответов: ${correctAnswersPrc}%`}
          </span>
        </p>
        <p className={`text-white font-medium text-[12px] leading-[14px] mb-2`}>
          <span className="flex gap-1">
            <span className="text-[14px]">
              <BsFillBarChartFill />
            </span>{" "}
            {`Самая длинная серия правильных ответов: ${longestStreak}`}
          </span>
        </p>
      </div>
      <img
        className="relative inline-block max-w-1/3 w-[120px] h-[120px] rounded-full top-[30px] left-[20px]"
        src={picture}
        alt="card"
      />
    </div>
  );
}

export function GameStatsSprint() {
  return (
    <GameStatsCard
      name="Sprint"
      learntWords={10}
      correctAnswersPrc={66}
      longestStreak={3}
      picture={imgSprint}
    />
  );
}
export function GameStatsAudioCall() {
  return (
    <GameStatsCard
      name="Audio call"
      learntWords={10}
      correctAnswersPrc={66}
      longestStreak={3}
      picture={imgAudioCall}
    />
  );
}
export function GameStatsWordle() {
  return (
    <GameStatsCard
      name="Wordle"
      learntWords={10}
      correctAnswersPrc={66}
      longestStreak={3}
      picture={imgWordle}
    />
  );
}
