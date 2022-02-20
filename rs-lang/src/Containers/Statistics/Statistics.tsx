import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import GeneralStats from "./GeneralStats/GeneralStats";
import GameStatsCards from "./GameStatsCards/GameStatsCards";
import AllTimeStats from "./AllTimeStats/AllTimeStats";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { getUserStat } from "../../utils/WebClients";

export default function Statistics() {
  const userInfo = useAppSelector((state) => state.loginReducer);
  const [statistics, setStatistics] = useState();

  useEffect(() => {
    const getStats = async () => {
      const stats = await getUserStat(userInfo.userId, userInfo.token);
      console.log(stats);
    };

    getStats();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <div className="bg-gray-800 grow-[2]">
        <Main className="h-full">
          <div className="mb-2">
            <h2 className="text-2xl font-bold tracking-wider text-emerald-700">Статистика</h2>
            <p className="text-base text-indigo-400">Статистика за сегодня</p>
          </div>
          <GeneralStats />
          <GameStatsCards className="pt-[40px] mb-[40px]" />
          <p className="text-base text-indigo-400">Статистика за все время</p>
          <AllTimeStats />
        </Main>
      </div>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </div>
  );
}
