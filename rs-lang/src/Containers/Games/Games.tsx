import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import GameCards from "./GameCards/GameCards";

export default function Games() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <div className="bg-gray-800 grow-[2]">
        <Main className="h-full">
          <GameCards className="pt-20" />
        </Main>
      </div>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </div>
  );
}
