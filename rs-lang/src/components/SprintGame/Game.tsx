import { useState } from 'react';
import { MdAccessTimeFilled, MdArrowLeft, MdArrowRight, MdCheck, MdClear, MdFavoriteBorder } from "react-icons/md";
import { useTimer } from 'use-timer';
import correctSound from '../../assets/sound/correct.mp3';
import wrongSound from '../../assets/sound/wrong.mp3';
import ISprintData from '../../interfaces/ISprintData';

export default function Question(props: {
  onGameEnd: () => void,
  data: ISprintData[],
}) {
  const { time, pause } = useTimer({
    initialTime: 30,
    endTime: 0,
    timerType: 'DECREMENTAL',
    autostart: true,
    //onTimeOver: () => props.onGameEnd(),
  })

  const playAudio = (type: string) => {
    switch (type) {
      case 'correct':
        new Audio(correctSound).play();
        break;
      case 'wrong':
        new Audio(wrongSound).play();
        break;
      default: break;
    }
  }

  const [tries, setTries] = useState(4);
  const [questionNum, setQuestionNum] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);

  console.log(props.data)

  return <>
    <div className='flex flex-col items-center gap-3'>
      <div><span>{questionNum}</span>/30</div>
      <div><MdFavoriteBorder /></div>
      <div className='inline-flex gap-2 bg-gray-900 bg-opacity-75 flex-col justify-center items-center p-4 border-dashed border'>
        <div><MdAccessTimeFilled className='fill-white text-7xl' /></div>
        <div className='text-4xl text-white'>{time}</div>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <div className='border-2 p-2 px-4 rounded-full bg-gray-900 bg-opacity-75 text-white'>Умножение <MdClear className='inline-flex' /> <span>1</span> + <span>10</span></div>
        <div className='border-2 p-2 px-4 rounded-full bg-green-500 text-white'>Очки: <span>0</span></div>
      </div>
      <div className='flex justify-center items-center relative bg-gray-900 bg-opacity-75 border border-dashed w-32 h-24'>
        <div className='absolute right-2 top-2'>
          <div className='inline-flex items-center justify-center bg-yellow-400 rounded-full w-6 h-6'>0</div>
        </div>
        <MdCheck className='fill-white text-7xl p-2' />
      </div>
      <div className='flex justify-center gap-4 items-center border py-4 px-10 bg-gray-900 bg-opacity-75'>
        <span className='text-yellow-400 text-4xl'>{props.data[questionNum].word}</span>
        <span className='text-white'>это</span>
        <span className='text-yellow-400 text-4xl'>{props.data[questionNum].wordTranslate}</span>
        <span className='text-white'>?</span>
      </div>
      <div className='flex text-white'>
        <button onClick={() => playAudio('correct')} className='text-center bg-green-600 border rounded-l-full w-32 py-2'><MdArrowLeft className='inline-flex text-xl' />верно</button>
        <button onClick={() => playAudio('wrong')} className='text-center bg-red-700 border rounded-r-full w-32 py-2'>неверно <MdArrowRight className='inline-flex text-xl' /></button>
      </div>
    </div>
  </>
}