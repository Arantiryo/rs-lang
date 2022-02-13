import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import GeneralStats from "./GeneralStats/GeneralStats";

export default function Statistics() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <div className="bg-gray-800 grow-[2]">
        <Main className="h-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-wider text-emerald-700">
              Статистика
            </h2>
            <p className="text-base text-indigo-400">Статистика за сегодня</p>
          </div>
          <GeneralStats />
        </Main>
      </div>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </div>
  );
}
