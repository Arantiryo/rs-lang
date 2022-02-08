import { useAppSelector } from "../../app/hooks";
import Benefits from "./Benefits/Benefits";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MiniGames from "./Mini-games/MiniGames";
import ResultsTracking from "./ResultsTracking/ResultsTracking";
import Welcome from "./Welcome/Welcome";
import Main from "../../components/Main/Main";

export default function Home() {
  const userInfo = useAppSelector((state) => state.userLoginInfo);
  console.log(userInfo);

  return (
    <>
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <Main>
        <Welcome />
        <Benefits />
        <MiniGames />
        <ResultsTracking />
      </Main>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </>
  );
}
