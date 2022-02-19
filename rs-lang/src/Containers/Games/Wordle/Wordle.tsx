import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Main from "../../../components/Main/Main";
import WordleGame from "../../../components/WordleGame/WordleGame";
import IWord from "../../../interfaces/IWord";
import { getWords } from "../../../utils/WebClients";

const numberOfCategories = 6;
const numberOfPages = 30;

const getWord = async () => {
  const categoryIndex = Math.floor(Math.random() * numberOfCategories);
  const pageIndex = Math.floor(Math.random() * numberOfPages);
  const fiveLetterWords: IWord[] = [];
  let retries = 5;

  while (fiveLetterWords.length === 0 && retries > 0) {
    const words = await getWords(pageIndex, categoryIndex);
    fiveLetterWords.push(...words.filter((w: IWord) => w.word.length === 5));
    retries -= 1;
  }

  if (retries <= 0) {
    throw Error("Could not get the word from the server");
  }

  return fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
};

export default function Wordle() {
  const [word, setWord] = useState("");

  useEffect(() => {
    getWord()
      .then((res) => setWord(res.word))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-wordle bg-bottom bg-cover bg-no-repeat">
      <div className="w-full">
        <Header isGameHeader={true} />
      </div>
      <div className={`grow-[2]`}>
        <Main className="h-full" transparentBg={true}>
          {!!word && <WordleGame word={word} />}
        </Main>
      </div>
    </div>
  );
}
