import pseudo1 from "../../../assets/svg/statistics__pseudo1.svg";

export default function GeneralStats() {
  return (
    <div
      className={`relative flex justify-center gap-4 flex-wrap
        lg:justify-start`}
    >
      <img
        className="absolute hidden md:block md:top-[40px] md:right-[50px]"
        src={pseudo1}
        alt="pseudo element"
      />
      <div className="flex justify-end gap-[75px] w-[70%] pt-5">
        <div className="flex flex-col items-center">
          <span className="text-white font-extrabold text-[72px] leading-[84px]">
            10
          </span>
          <span className="text-white text-[24px] leading-[28px]">
            слов изучено
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-extrabold text-[72px] leading-[84px]">
            66%
          </span>
          <span className="text-white text-[24px] leading-[28px]">
            правильных ответов
          </span>
        </div>
      </div>
    </div>
  );
}
