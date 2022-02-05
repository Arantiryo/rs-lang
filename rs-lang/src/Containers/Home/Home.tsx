import { useAppSelector } from "../../app/hooks";
import Benefits from "../../components/Benefits/Benefits";
import Header from "../../components/Header/Header";
import MiniGames from "../../components/Mini-games/MiniGames";
import Welcome from "../../components/Welcome/Welcome";

export default function Home() {
  const userInfo = useAppSelector((state) => state.userLoginInfo);
  console.log(userInfo);

  return (
    <div className="home bg-gray-800">
      <div className="px-5">
        <Header />
        <Welcome />
        <Benefits />
        <MiniGames />
      </div>
    </div>
  );
}
