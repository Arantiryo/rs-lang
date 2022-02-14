import {
  GameStatsAudioCall,
  GameStatsSprint,
  GameStatsWordle,
} from "../../../components/GameStatsCard/GameStatsCard";

export default function GameStatsCards({ className }: { className: string }) {
  return (
    <div className={`${className} relative flex gap-3 flex-wrap`}>
      <div className="relative">
        <GameStatsSprint />
      </div>
      <div className="relative">
        <GameStatsAudioCall />
      </div>
      <div className="relative">
        <GameStatsWordle />
      </div>
    </div>
  );
}
