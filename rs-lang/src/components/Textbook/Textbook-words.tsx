import { useEffect, useState } from "react";
import IWord from "../../interfaces/IWord";
import { getWords } from "../../utils/WebClients";
import { colors } from './Textbook';

type Params = {
  categoryIndex: number,
  wordIndex: number,
  onClickWord: (index: number) => void,
  saveList: (data: IWord[]) => void,
  list: IWord[],
  page: number,
}

export default function TextbookWords({ categoryIndex, wordIndex, onClickWord, saveList, list, page }: Params) {
  const [status, setStatus] = useState('Loading');

  useEffect(() => {
    getWords(page, categoryIndex).then((list: IWord[]) => {
      setStatus('Success');
      saveList(list);
    });
  }, [categoryIndex, saveList, page])

  return (
    <div className="
      flex grow flex-wrap items-center h-52 gap-1 overflow-y-auto scroll-behavior
      md:h-full
      lg:w-4/6 lg:h-min
    ">
      {status === 'Loading' && <div className="flex grow">
        <div className="grow shadow rounded-md w-full mx-auto">
          <div className="
          animate-pulse
          flex grow flex-wrap items-center h-52 gap-1 overflow-y-auto scroll-behavior
          md:h-full
          lg:lg:h-min"
          >
            {
              [...Array(20)].map((_, i) => {
                return (<div key={i} className="
                  bg-gray-700 border border-gray-700 w-24 max-w-xs rounded p-6
                  xs:w-32
                  md:grow
                  lg:basis-2/12 lg:min-w-0"
                >
                </div>)
              })
            }
          </div>
        </div>
      </div>}
      {status === 'Success' && list.map((obj, index) =>
        <div
          className={
            `${index === wordIndex ? `${colors[categoryIndex].bg} text-white` : ''}
              cursor-pointer bg-gray-700 border border-gray-700 w-24 max-w-xs rounded p-2
              xs:w-32
              md:grow
              lg:basis-2/12 lg:min-w-0
            `
          }
          key={index}
          onClick={() => onClickWord(index)}
        >
          <div>{obj.word}</div>
          <div className="truncate">{obj.wordTranslate}</div>
        </div>
      )}
    </div>
  );
}