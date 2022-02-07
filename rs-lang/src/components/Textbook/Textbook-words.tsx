import { useEffect, useState } from "react";
import IWord from "../../interfaces/IWord";
import { getWords } from "../../utils/WebClients";

type Params = {
  category: number
}

export default function TextbookWords({ category }: Params) {
  const words: IWord[] = [];
  const [status, setStatus] = useState('');
  const [list, setList] = useState(words);
  const [word, setWord] = useState(0);

  const onClickWord = (index: number) => {
    console.log(index);
    setWord(index)
  };

  useEffect(() => {
    setStatus('Loading');
    getWords(0, category).then((list: IWord[]) => {
      setStatus('Success');
      setList(list);
      setWord(0);
    });
  }, [category])

  return (
    <div className="flex flex-wrap w-3/4 gap-1">
      {status === 'Loading' && <div>Loading...</div>}
      {status === 'Success' && list.map((obj, index) =>
        <div
          className={`cursor-pointer border w-40 rounded p-2 ${index === word ? 'text-red-600' : ''}`}
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