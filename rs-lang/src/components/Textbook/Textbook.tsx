import { useCallback, useReducer, useState } from "react";
import "../../App.css";
import IWord from "../../interfaces/IWord";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookPagination from "./Textbook-pagination";
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

export enum CountActionKind {
  INCREACE = 'INCREACE',
  DECREASE = 'DECREASE',
  SPECIFIC = 'SPECIFIC',
}

interface ICountAction {
  type: CountActionKind,
  jump?: number,
}

function reducer(count: number, action: ICountAction) {
  switch (action.type) {
    case CountActionKind.INCREACE:
      return Math.min(count + 1, 29);
    case CountActionKind.DECREASE:
      return Math.max(count - 1, 0);
    case CountActionKind.SPECIFIC:
      console.log(action.jump);
      return action.jump || 0;
    default:
      throw new Error();
  }
}

export default function Textbook() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [page, dispatchPage] = useReducer(reducer, 0);

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
          <div className="flex flex-col gap-2 font-size: text-sm 
            md:flex-row
            lg:h-64 
          ">
            <TextbookWords
              page={page}
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
          <div className="flex items-center justify-center"
          >
            <TextbookPagination
              categoryIndex={categoryIndex}
              page={page}
              onClickPage={dispatchPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}