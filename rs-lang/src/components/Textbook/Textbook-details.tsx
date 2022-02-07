import { useEffect, useState } from 'react';
import IWord from '../../interfaces/IWord';
import { getImage } from '../../utils/WebClients';

type Params = {
  wordIndex: number,
  list: IWord[],
}

export default function TextbookDetails({ wordIndex, list }: Params) {
  const [status, setStatus] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    setStatus('Loading');

    if (list.length) {
      const fileName = list[wordIndex].image;
      getImage(fileName).then((imgObj) => {
        setStatus('Success');
        setImg(imgObj);
      })
    };

  }, [wordIndex, list])

  return (
    <div>
      {status === 'Loading' && <div>Loading...</div>}
      {status === 'Success' &&
        <div>
          <div>
            <img src={img} alt="word" />
          </div>
        </div>}
    </div>
  );
}