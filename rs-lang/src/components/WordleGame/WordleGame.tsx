import { useEffect, useState } from "react";

type GuessType = string[];

const maxGuesses = 6;

export default function WordleGame() {
  const [guess, setGuess] = useState<GuessType>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessType[]>([]);

  useEffect(() => {
    const handleKeyDown = ({ key }: { key: string }) => {
      const isChar = /^[a-z]$/.test(key);
      const isBackspace = key === "Backspace";
      const isSubmit = key === "Enter";
      const isGuessFinished = guess.length === 5;

      if (isBackspace) {
        setGuess((prev) => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      } else if (isChar && guess.length < 5) {
        setGuess((prev) => [...prev, key]);
      } else if (isGuessFinished && isSubmit) {
        setSubmittedGuesses((prev) => [...prev, guess]);
        setGuess([]);
      }

      console.log(guess);
    };

    console.log(submittedGuesses);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, submittedGuesses]);

  return (
    <div className="h-full flex justify-center">
      <Board currentGuess={guess} submittedGuesses={submittedGuesses} />
    </div>
  );
}

type BoardProps = {
  currentGuess: GuessType;
  submittedGuesses: GuessType[];
};

function Board({ currentGuess, submittedGuesses }: BoardProps) {
  return (
    <div className="max-w-[350px] max-h-[420px] flex flex-col gap-1">
      {submittedGuesses.map((guess, i) => (
        <PreviousGuess key={i} guess={guess} />
      ))}
      <CurrentGuess currentGuess={currentGuess} />
      {Array.from({ length: maxGuesses - submittedGuesses.length - 1 }).map(
        (_, i) => (
          <EmptyGuess key={i} />
        )
      )}
    </div>
  );
}

function CurrentGuess({ currentGuess }: { currentGuess: GuessType }) {
  return (
    <div className="flex items-start gap-1">
      {Array.from({ length: 5 }).map((__, i) => {
        return (
          <div key={i} className={cellStyle}>
            {currentGuess[i] || ""}
          </div>
        );
      })}
    </div>
  );
}

const cellStyle =
  "w-[60px] h-[60px] flex items-center justify-center text-white text-[32px] uppercase select-none border border-gray-400";

function PreviousGuess({ guess }: { guess: GuessType }) {
  return (
    <div className="flex items-start gap-1">
      {guess.map((char, i) => {
        return (
          <div key={i} className={cellStyle}>
            {char}
          </div>
        );
      })}
    </div>
  );
}

function EmptyGuess() {
  return (
    <div className="flex items-start gap-1">
      {Array.from({ length: 5 }).map((__, i) => {
        return (
          <div key={i} className={cellStyle}>
            {""}
          </div>
        );
      })}
    </div>
  );
}
