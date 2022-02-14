import Header from "../../../components/Header/Header";
import Main from "../../../components/Main/Main";
import WordleGame from "../../../components/WordleGame/WordleGame";

export default function Wordle() {
  return (
    <div className="h-screen flex flex-col bg-wordle bg-bottom bg-cover bg-no-repeat">
      <div className="w-full">
        <Header isGameHeader={true} />
      </div>
      <div className={`grow-[2]`}>
        <Main className="h-full" transparentBg={true}>
          <WordleGame />
        </Main>
      </div>
    </div>
  );
}
