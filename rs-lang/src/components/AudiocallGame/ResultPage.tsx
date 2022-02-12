import ResultsTrackingCard from "../ResultsCard/ResultsCard";

export default function ResultPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <ResultsTrackingCard
        size="max-w-[500px] "
        font="text-sm md:text-[16px]"
        buttonSize="w-20 h-6"
        contentSize="max-w-[160px] max-h-[160px] md:max-w-[260px] md:max-h-[260px]"
        showExtra={true}
      />
    </div>
  );
}
