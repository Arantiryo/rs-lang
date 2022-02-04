import { useAppSelector } from "../../app/hooks";

export default function Home() {
  const userInfo = useAppSelector((state) => state.userLoginInfo);
  console.log(userInfo);

  return (
    <div className="home">
      <h1>Home page</h1>
    </div>
  );
}
