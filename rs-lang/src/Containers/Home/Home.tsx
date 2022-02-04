import { useAppSelector } from "../../app/hooks";
import Header from "../../components/Header/Header";
import Promo from "../../components/Welcome/Welcome";

export default function Home() {
  const userInfo = useAppSelector((state) => state.userLoginInfo);
  console.log(userInfo);

  return (
    <div className="home bg-gray-800">
      <div className="px-5">
        <Header />
        <Promo />
      </div>
    </div>
  );
}
