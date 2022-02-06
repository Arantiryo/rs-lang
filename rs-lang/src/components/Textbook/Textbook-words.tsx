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

  useEffect(() => {
    setStatus('Loading');
    getWords(0, category).then((list: IWord[]) => {
      setStatus('Success');
      setList(list)
    });
  }, [category])

  return (
    <div>
      {status === 'Loading' && <div>Loading...</div>}
      {status === 'Success' && list.map((obj, index) =>
        <div key={index}>
          <div>{obj.word}</div>
          <div>{obj.wordTranslate}</div>
        </div>
      )}
    </div>
  );
}