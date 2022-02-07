import { useAppSelector } from "../../app/hooks";
import Benefits from "../../components/Benefits/Benefits";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MiniGames from "../../components/Mini-games/MiniGames";
import ResultsTracking from "../../components/ResultsTracking/ResultsTracking";
import Welcome from "../../components/Welcome/Welcome";

export default function Home() {
  const userInfo = useAppSelector((state) => state.userLoginInfo);
  console.log(userInfo);

  return (
    <>
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <main className="home bg-gray-800">
        <div className="px-5 max-w-7xl mx-auto xxl:px-0">
          <Welcome />
          <Benefits />
          <MiniGames />
          <ResultsTracking />
        </div>
      </main>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </>
  );
}
