import { useEffect, useState } from 'react';
import IWord from '../../interfaces/IWord';
import { getImage } from '../../utils/WebClients';

type Params = {
  wordIndex: number,
  list: IWord[],
}

export default function TextbookDetails({ wordIndex, list }: Params) {
  const [status, setStatus] = useState('Loading');
  const [img, setImg] = useState('');

  useEffect(() => {
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
      {status === 'Loading' &&
        <div className="border border-gray-700 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="w-60 flex-1 space-y-6 py-1">
              <div className="h-48 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(7)].map(() => <div className="h-2 bg-slate-700 rounded"></div>)}
              </div>
            </div>
          </div>
        </div>
      }
      {status === 'Success' &&
        <div className='max-w-xs border rounded border-gray-700 bg-gray-700 p-3
          md:w-72
        '>
          <div>
            <div className='relative h-44 before:shadow-3xl before:shadow-zinc-900/90 before:absolute before:inset-0'>
              <img className='max-w-full w-full h-full max-h-full object-cover' src={img} alt="word" />
              <div className='flex gap-2 absolute bottom-5 right-2'>
                <span>{list[wordIndex].transcription}</span>
                <span>{list[wordIndex].word}</span>
              </div>
              <div className='relative text-right bottom-6 right-2 truncate pl-4'>{list[wordIndex].wordTranslate}</div>
            </div>
            <div>

            </div>
          </div>
          <div>
            <div className='my-2'>Значение</div>
            <div className='my-1 text-slate-300' dangerouslySetInnerHTML={{ __html: list[wordIndex].textMeaning }}></div>
            <div className='my-1 text-sky-300'>{list[wordIndex].textMeaningTranslate}</div>
          </div>
          <div>
            <div className='my-2'>Пример</div>
            <div className='my-1 text-slate-300' dangerouslySetInnerHTML={{ __html: list[wordIndex].textExample }}></div>
            <div className='my-1 text-sky-300'>{list[wordIndex].textExampleTranslate}</div>
          </div>
        </div>}
    </div>
  );
}