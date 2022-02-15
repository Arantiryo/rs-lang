import { useEffect, useState } from "react";

type GuessType = string[];

const maxGuesses = 6;

const getWordCharCount = (word: string) =>
  word.split("").reduce<Record<string, number>>((acc, val) => {
    if (acc.hasOwnProperty(val)) {
      acc[val] += 1;
    } else {
      acc[val] = 1;
    }
    return acc;
  }, {});

export default function WordleGame({ word = "hello" }) {
  const [guess, setGuess] = useState<GuessType>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessType[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const wordCharMap = getWordCharCount(word);

  useEffect(() => {
    const handleKeyDown = ({ key }: { key: string }) => {
      if (isCorrect) return;

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
      } else if (
        isGuessFinished &&
        isSubmit &&
        submittedGuesses.length < maxGuesses
      ) {
        setSubmittedGuesses((prev) => [...prev, guess]);
        setGuess([]);
        if (guess.join("") === word) setIsCorrect(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, submittedGuesses, word, isCorrect]);

  return (
    <div className="h-full flex justify-center">
      <div className="max-w-[350px] max-h-[420px] flex flex-col gap-1">
        {submittedGuesses.map((guess, i) => (
          <SubmittedGuess
            key={i}
            guess={guess}
            word={word}
            wordCharMap={wordCharMap}
          />
        ))}
        {!isCorrect && submittedGuesses.length < 6 && (
          <CurrentGuess currentGuess={guess} />
        )}
        {Array.from({
          length: maxGuesses - submittedGuesses.length - (isCorrect ? 0 : 1),
        }).map((_, i) => (
          <EmptyGuess key={i} />
        ))}
      </div>
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

const cellCorrect = "bg-emerald-500";
const cellPresent = "bg-yellow-500";

type SubmittedGuessType = {
  guess: GuessType;
  word: string;
  wordCharMap: Record<string, number>;
};

function SubmittedGuess({ guess, word, wordCharMap }: SubmittedGuessType) {
  const charMap = { ...wordCharMap };
  word.split("").forEach((char, i) => {
    if (word[i] === guess[i]) {
      charMap[char] -= 1;
    }
  });

  return (
    <div className="flex items-start gap-1">
      {guess.map((char, i) => {
        const isCorrect = char === word[i];
        let isPresent = false;

        if (!isCorrect && charMap[char]) {
          isPresent = true;
          charMap[char] -= 1;
        }

        return (
          <div
            key={i}
            className={`${cellStyle} 
              ${isCorrect ? cellCorrect : isPresent ? cellPresent : ""}`}
          >
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
