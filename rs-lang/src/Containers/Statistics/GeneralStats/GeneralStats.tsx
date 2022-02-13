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
    </div>
  );
}
