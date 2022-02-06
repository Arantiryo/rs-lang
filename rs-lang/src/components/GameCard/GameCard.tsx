import imgSprint from "../../assets/images/card__sprint.png";
import imgAudioCall from "../../assets/images/card__audio-call.png";
import imgWordle from "../../assets/images/card__wordle.png";

type GameProps = {
  gameType: string;
  name: string;
  description: string;
  picture: string;
};

export function GameCard({ gameType, name, description, picture }: GameProps) {
  return (
    <div
      className={`relative flex items-center justify-between max-h-20 aspect-[5/2] 
      bg-gray-700 rounded-md w-[170px] xs:w-[210px] gap-1 p-2 
      hover:scale-110 hover:translate-y-[-30px] transition duration-500 ease-in-out`}
    >
      <div className={`overflow-hidden grow-2`}>
        <p className={`text-yellow-500 font-medium text-[8px] md:text-[10px]`}>
          {gameType}
        </p>
        <h4
          className={`text-white font-semibold tracking-[1px] text-[10px] md:text-[12px]`}
        >
          {name}
        </h4>
        <p className={`text-white font-medium text-[8px] md:text-[10px]`}>
          {description}
        </p>
      </div>
      <img
        className="block rounded-md w-full h-full grow"
        src={picture}
        alt="card"
      />
    </div>
  );
}

export function GameSprint() {
  return (
    <GameCard
      gameType="Перевод на скорость"
      name="Sprint"
      description="Как можно быстрее определи верный перевод слова перед тобой или нет"
      picture={imgSprint}
    />
  );
}
export function GameAudioCall() {
  return (
    <GameCard
      gameType="Аудирование"
      name="Audio call"
      description="Улучшает восприятие английской речи на слух."
      picture={imgAudioCall}
    />
  );
}
export function GameWordle() {
  return (
    <GameCard
      gameType="Угадай слово"
      name="Wordle"
      description="Угадай слово из пяти букв. Улучшает словарный запас."
      picture={imgWordle}
    />
  );
}
