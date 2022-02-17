import { useAppSelector } from "../../../app/hooks";

export default function AllTimeStats() {
  const userInfo = useAppSelector((state) => state.loginReducer);

  return (
    <>
      {userInfo.userId === "" && (
        <div className="w-full h-[200px] bg-gray-700 rounded-md flex items-center justify-center">
          <p className="text-white text-[18px] leading-[21px] text-center">
            Статистика доступна только авторизованным пользователям
          </p>
        </div>
      )}
    </>
  );
}
