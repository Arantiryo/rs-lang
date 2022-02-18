import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getWordFromDictionary } from "../../utils/WebClients";
import Delayed from "../Delayed/Delayed";
import LoaderButton from "../LoaderButton/LoaderButton";
import { IoBackspaceOutline } from "react-icons/io5";

type GuessType = string[];

const maxGuesses = 6;
const wordLength = 5;

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
  const history = useHistory();
  const [guess, setGuess] = useState<GuessType>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessType[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [noSuchWord, setNoSuchWord] = useState(false);

  const [usedChars, setUsedChars] = useState({
    correct: new Set<string>(),
    present: new Set<string>(),
  });

  const wordCharMap = getWordCharCount(word);
  const isFinished = submittedGuesses.length === maxGuesses && !isCorrect;

  const showNoSuchWordWarning = () => {
    setNoSuchWord(true);
    setTimeout(() => setNoSuchWord(false), 3000);
  };

  const setChars = useCallback(
    (guess: GuessType, word: string) => {
      guess.forEach((char, i) => {
        const isCorrect = char === word[i];
        const isPresent = !isCorrect && word.includes(char);
        const tempChars = { ...usedChars };

        isCorrect && tempChars.correct.add(char);
        isPresent && tempChars.present.add(char);
        setUsedChars(tempChars);
      });
    },
    [usedChars]
  );

  const handleKeyDown = useCallback(
    ({ key }: { key: string }) => {
      if (isCorrect) return;

      const isChar = /^[a-z]$/.test(key);
      const isBackspace = key === "Backspace";
      const isSubmit = key === "Enter";
      const isGuessFinished = guess.length === wordLength;

      const submitGuess = () => {
        setSubmittedGuesses((prev) => [...prev, guess]);
        setGuess([]);
        setChars(guess, word);
        if (guess.join("") === word) setIsCorrect(true);
      };

      if (isBackspace) {
        setGuess((prev) => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      } else if (isChar && !isGuessFinished) {
        setGuess((prev) => [...prev, key]);
      } else if (
        isGuessFinished &&
        isSubmit &&
        submittedGuesses.length < maxGuesses
      ) {
        getWordFromDictionary(guess.join(""))
          .then((res) => {
            if (res?.title === "No Definitions Found") {
              showNoSuchWordWarning();
            } else {
              submitGuess();
            }
          })
          .catch((err) => {
            console.log(err);
            // skip the word check if there's a problem w/ the dictionary API or the network
            submitGuess();
          });
      }
    },
    [guess, submittedGuesses, word, isCorrect, setChars]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleReplayGame = () => {
    history.go(0);
  };

  return (
    <div className="relative h-full flex flex-col items-center pt-6">
      {noSuchWord && (
        <span className="absolute top-[-5px] text-white text-[16px]">
          Слова нет в словаре
        </span>
      )}
      <div className="max-w-[350px] max-h-[420px] flex flex-col gap-1 pb-5">
        {submittedGuesses.map((guess, i) => (
          <SubmittedGuess
            key={i}
            guess={guess}
            word={word}
            wordCharMap={wordCharMap}
          />
        ))}
        {!isCorrect && submittedGuesses.length < maxGuesses && (
          <CurrentGuess currentGuess={guess} />
        )}
        {Array.from({
          length: maxGuesses - submittedGuesses.length - (isCorrect ? 0 : 1),
        }).map((_, i) => (
          <EmptyGuess key={i} />
        ))}
      </div>
      {isFinished && (
        <Delayed>
          <span className="text-white text-[16px]">
            Ваши попытки закончились. Удачи в следующий раз!
          </span>
        </Delayed>
      )}
      {isCorrect && (
        <Delayed>
          <span className="text-white text-[16px]">Успех!</span>
        </Delayed>
      )}
      {(isFinished || isCorrect) && (
        <Delayed>
          <LoaderButton
            className="mt-2 w-[92px] h-[40px] text-base
              bg-emerald-600 hover:bg-emerald-500 transition-colors text-white"
            onClick={handleReplayGame}
          >
            Повторить
          </LoaderButton>
        </Delayed>
      )}
      <Keyboard onClick={handleKeyDown} usedChars={usedChars} />
    </div>
  );
}

type KeyboardProps = {
  onClick: ({ key }: { key: string }) => void;
  usedChars: { correct: Set<string>; present: Set<string> };
};

function Keyboard({ onClick, usedChars }: KeyboardProps) {
  const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div className="mt-auto">
      {keys.map((row, i) => {
        return (
          <div key={i} className="mb-[5px] flex gap-[5px] justify-center">
            {i === 2 && (
              <KeyboardButton letter={"Enter"} key={-1} onClick={onClick} />
            )}
            {row.split("").map((key, idx) => {
              const isCorrect = usedChars.correct.has(key);
              const isPresent = usedChars.present.has(key);
              const bgColor = isCorrect
                ? "bg-emerald-600"
                : isPresent
                ? "bg-yellow-500"
                : "";

              return (
                <KeyboardButton
                  bgColor={bgColor}
                  letter={key}
                  key={idx}
                  onClick={onClick}
                />
              );
            })}
            {i === 2 && (
              <KeyboardButton letter={"Backspace"} key={8} onClick={onClick} />
            )}
          </div>
        );
      })}
    </div>
  );
}

type KeyboardButtonProps = {
  letter: string;
  onClick: ({ key }: { key: string }) => void;
  bgColor?: string;
};

function KeyboardButton({
  letter,
  onClick,
  bgColor = "",
}: KeyboardButtonProps) {
  const key = letter;
  return (
    <button
      onClick={() => onClick({ key })}
      className={`h-[60px] min-w-[43px] p-[14px] text-white text-[16px] font-medium rounded-md cursor-pointer 
        bg-gray-500 hover:bg-gray-400 uppercase select-none 
        transition-colors duration-0 delay-500 ${bgColor}`}
    >
      {letter !== "Backspace" ? (
        letter
      ) : (
        <span className="text-[24px]">
          <IoBackspaceOutline />
        </span>
      )}
    </button>
  );
}

function CurrentGuess({ currentGuess }: { currentGuess: GuessType }) {
  const [scaleClass, setScaleClass] = useState("scale-110");

  useEffect(() => {
    setScaleClass("scale-110");
    const t = setTimeout(() => setScaleClass("scale-100"), 100);
    return () => clearTimeout(t);
  }, [currentGuess]);

  return (
    <div className="flex items-start gap-1">
      {Array.from({ length: wordLength }).map((__, i) => {
        return (
          <div
            key={i}
            className={`${cellStyle} ${
              i === currentGuess.length - 1 ? scaleClass : ""
            } transition-all duration-100`}
          >
            {currentGuess[i] || ""}
          </div>
        );
      })}
    </div>
  );
}

const cellStyle =
  "w-[60px] h-[60px] flex items-center justify-center text-white text-[32px] uppercase select-none border border-gray-40";

const cellCorrect = "bg-emerald-500";
const cellPresent = "bg-yellow-500";

type SubmittedGuessType = {
  guess: GuessType;
  word: string;
  wordCharMap: Record<string, number>;
};

function SubmittedGuess({ guess, word, wordCharMap }: SubmittedGuessType) {
  const [transitionValue, setTransitionValue] = useState("rotateX(0deg)");

  useEffect(() => {
    setTransitionValue("rotateX(90deg)");
    const t = setTimeout(() => setTransitionValue("rotateX(0deg)"), 0);
    return () => clearTimeout(t);
  }, []);

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
        const transitionDelay = `${i * 100}ms`;
        let isPresent = false;

        if (!isCorrect && charMap[char]) {
          isPresent = true;
          charMap[char] -= 1;
        }

        return (
          <div
            key={i}
            style={{
              transform: transitionValue,
              transitionDelay: transitionDelay,
              transitionDuration: "500ms",
            }}
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
      {Array.from({ length: wordLength }).map((__, i) => {
        return (
          <div key={i} className={cellStyle}>
            {""}
          </div>
        );
      })}
    </div>
  );
}
