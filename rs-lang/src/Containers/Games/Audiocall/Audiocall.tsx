import Header from "../../../components/Header/Header";
import Main from "../../../components/Main/Main";
import GameCards from "../GameCards/GameCards";
// import bgImage from "../../../assets/images/bg_main_audiocall.png";

export default function Audiocall() {
  return (
    <div className="h-screen flex flex-col bg-audiocall">
      <div className="w-full">
        <Header />
      </div>
      <div className={`grow-[2]`}>
        <Main className="h-full" transparentBg={true}>
          <GameCards className="pt-20" />
        </Main>
      </div>
    </div>
  );
}
