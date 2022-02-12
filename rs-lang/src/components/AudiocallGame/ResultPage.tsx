import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ResultsTrackingCard from "../ResultsCard/ResultsCard";

export default function ResultPage() {
  const userInfo = useAppSelector((state) => state.latestResultReducer);
  // const dispatch = useAppDispatch();

  console.log(userInfo);

  // const handleLogout = () => {
  //   dispatch();
  // };

  return (
    <div className="flex items-center justify-center h-full">
      <ResultsTrackingCard size="max-w-[300px] max-h-[400px]" />
    </div>
  );
}
