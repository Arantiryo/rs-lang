import {
  GameAudioCall,
  GameSprint,
  GameWordle,
} from "../../../components/GameCard/GameCard";
import pseudo1 from "../../../assets/svg/team__pseudo-elem-1.svg";

export default function GameCards({ className }: { className: string }) {
  return (
    <div
      className={`${className} relative h-full flex items-center gap-3 flex-wrap`}
    >
      <img
        className="absolute hidden md:block md:top-[-70px] md:right-[20px]"
        src={pseudo1}
        alt="pseudo element"
      />

      <div className="relative">
        <GameSprint />
      </div>
      <div className="relative">
        <GameAudioCall />
      </div>
      <div className="relative">
        <GameWordle />
      </div>
    </div>
  );
}
