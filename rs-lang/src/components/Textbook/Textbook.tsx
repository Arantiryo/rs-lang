import { useCallback, useReducer, useState } from "react";
import "../../App.css";
import { useAppSelector } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookPagination from "./Textbook-pagination";
import TextbookWords from "./Textbook-words";

export enum CountActionKind {
  INCREACE = 'INCREACE',
  DECREASE = 'DECREASE',
  SPECIFIC = 'SPECIFIC',
  RESET = 'RESET'
}

interface ICountAction {
  type: CountActionKind,
  jump?: number,
}

export default function Textbook() {
  const userInfo = useAppSelector((state) => state.loginReducer);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [totalCounts, setTotalCounts] = useState(0);
  const words: IWord[] = [];
  const [list, setList] = useState(words);

  const reducer = (count: number, action: ICountAction) => {
    switch (action.type) {
      case CountActionKind.INCREACE:
        if (categoryIndex < 6) {
          return Math.min(count + 1, 29);
        } else {
          console.log(Math.ceil(totalCounts / 20))
          return Math.min(count + 1, Math.floor(totalCounts / 20));
        }
      case CountActionKind.DECREASE:
        return Math.max(count - 1, 0);
      case CountActionKind.SPECIFIC:
        return action.jump || 0;
      case CountActionKind.RESET:
        return 0;
      default:
        throw new Error();
    }
  }

  const [page, dispatchPage] = useReducer(reducer, 0);

  const chooseCategory = (index: number) => {
    setWordIndex(0);
    setCategoryIndex(index);
  }
  const chooseWord = (index: number) => setWordIndex(index);
  const updateTotalCounts = useCallback((index: number) => setTotalCounts(index), []);
  const resetWordId = useCallback((index: number) => setWordIndex(index), []);
  const saveList = useCallback((data: IWord[]) => setList(data), []);

  const [force, forceUpdate] = useReducer((x) => x + 1, 0);

  //console.log(userInfo.token);
  //console.log(userInfo.userId);

  return (
    <div className="flex grow items-center textbook bg-gray-800 text-white">
      <div className="container mx-auto max-w-screen-xl p-2">
        <main className="flex flex-col gap-2">
          <TextbookCategories
            categoryIndex={categoryIndex}
            onClickCategory={chooseCategory}
            resetPageIndex={dispatchPage}
          />
          <div className="flex flex-col gap-2 font-size: text-sm 
            md:flex-row
            lg:h-64 
          ">
            <TextbookWords
              page={page}
              list={list}
              force={force}
              saveList={saveList}
              categoryIndex={categoryIndex}
              wordIndex={wordIndex}
              onClickWord={chooseWord}
              updateTotalCounts={updateTotalCounts}
            />
            <TextbookDetails
              list={list}
              wordIndex={wordIndex}
              forceUpdate={forceUpdate}
              resetWordId={resetWordId}
            />
          </div>
          <div className="flex items-center justify-center"
          >
            <TextbookPagination
              list={list}
              categoryIndex={categoryIndex}
              page={page}
              onClickPage={dispatchPage}
              resetWordId={resetWordId}
              totalCounts={totalCounts}
            />
          </div>
        </main>
      </div>
    </div>
  );
}