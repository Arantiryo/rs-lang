import { useCallback, useState } from "react";
import "../../App.css";
import IWord from "../../interfaces/IWord";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookWords from "./Textbook-words";

export const colors = [
  {
    bg: 'bg-gray-500'
  },
  {
    bg: 'bg-amber-500'
  },
  {
    bg: 'bg-emerald-500'
  },
  {
    bg: 'bg-blue-500'
  },
  {
    bg: 'bg-violet-500'
  },
  {
    bg: 'bg-rose-500'
  },
]

export default function Textbook() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words: IWord[] = [];
  const [list, setList] = useState(words);

  const chooseCategory = (index: number) => setCategoryIndex(index);
  const chooseWord = (index: number) => setWordIndex(index);
  const saveList = useCallback((data: IWord[]) => setList(data), []);

  return (
    <div className="flex grow items-center textbook bg-gray-800 text-white">
      <div className="container mx-auto max-w-screen-xl p-2">
        <main className="flex flex-col gap-2">
          <TextbookCategories
            categoryIndex={categoryIndex}
            onClickCategory={chooseCategory}
          />
          <div className="flex">
            <TextbookWords
              list={list}
              saveList={saveList}
              categoryIndex={categoryIndex}
              wordIndex={wordIndex}
              onClickWord={chooseWord}
            />
            <TextbookDetails
              list={list}
              wordIndex={wordIndex}
            />
          </div>
        </main>
      </div>
    </div>
  );
}