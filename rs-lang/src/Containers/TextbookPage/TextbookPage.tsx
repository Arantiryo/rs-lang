import { useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Textbook from "../../components/Textbook/Textbook";

export default function TextbookPage() {
  const userInfo = useAppSelector((state) => state.loginReducer);
  console.log(userInfo);

  return (
    <>
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <Main className="grow">
        <Textbook />
      </Main>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </>
  );
}
