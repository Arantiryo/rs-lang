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
}

export default function TextbookWords({ categoryIndex, wordIndex, onClickWord, saveList, list }: Params) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus('Loading');
    getWords(0, categoryIndex).then((list: IWord[]) => {
      setStatus('Success');
      saveList(list);
    });
  }, [categoryIndex, saveList])

  return (
    <div className="flex flex-wrap w-3/4 gap-1">
      {status === 'Loading' && <div>Loading...</div>}
      {status === 'Success' && list.map((obj, index) =>
        <div
          className={`cursor-pointer border w-40 rounded p-2 ${index === wordIndex ? `${colors[categoryIndex].bg} text-white` : ''}`}
          key={index}
          onClick={() => onClickWord(index)}
        >
          <div>{obj.word}</div>
          <div>{obj.wordTranslate}</div>
        </div>
      )}
    </div>
  );
}