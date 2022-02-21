import { useCallback, useEffect, useState } from 'react';
import { MdAccessTimeFilled, MdArrowLeft, MdArrowRight, MdCheck, MdClear, MdFavoriteBorder, MdVolumeOff, MdVolumeUp } from "react-icons/md";
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
    onTimeOver: () => props.onGameEnd(),
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, true);
    };
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [sound, setSound] = useState(true);
  const [tries, setTries] = useState(4);
  const [combo, setCombo] = useState(0);
  const [boost, setBoost] = useState(1);
  const [score, setScore] = useState(0);

  const toggleSound = () => (sound === true) ? setSound(false) : setSound(true);

  const playAudio = (status: boolean) => (status === true)
    ? new Audio(correctSound).play()
    : new Audio(wrongSound).play();

  const loadNextQuestion = useCallback((status: boolean) => {
    const restTries = (status === true) ? tries : tries - 1;
    if (questionIndex < props.data.length - 1 && restTries > 0) {
      setQuestionIndex(questionIndex + 1)
    } else {
      pause();
      props.onGameEnd();
    }
  }, [pause, props, questionIndex, tries]);

  const updatePanel = useCallback((status: boolean) => {
    switch (status) {
      case true:
        setCombo(combo + 1);
        setBoost(boost * 2);
        setScore(10 * boost + score);
        break;
      case false:
        setTries(tries - 1)
        setCombo(0);
        setBoost(1);
        break;
      default: break;
    }
  }, [boost, combo, score, setTries, tries]);

  const checkAnswer = useCallback((optIndex: number) => {
    const wordObj = props.data[questionIndex];
    const status = (wordObj.wordTranslate === wordObj.options[optIndex]) ? true : false;
    if (sound) playAudio(status);
    updatePanel(status);
    loadNextQuestion(status);
  }, [loadNextQuestion, props.data, questionIndex, sound, updatePanel]);

  const handleKeyPress = useCallback(event => {
    const { key } = event;
    if (key === 'ArrowLeft') checkAnswer(0);
    if (key === 'ArrowRight') checkAnswer(1);
  }, [checkAnswer]);

  return <>
    <div className='flex items-center justify-between'>
      <div className='flex gap-2 bg-gray-900 bg-opacity-75 p-4 border-dashed border'>
        {[...Array(tries)].map((_, i) => <div className='text-2xl' key={i}><MdFavoriteBorder className='fill-red-700' /></div>)}
      </div>
      <div className='bg-gray-900 bg-opacity-75 p-4 border-dashed border cursor-pointer' onClick={toggleSound}>
        {sound === true && <MdVolumeUp className='text-2xl fill-white' >on</MdVolumeUp>}
        {sound === false && <MdVolumeOff className='text-2xl fill-white'>off</MdVolumeOff>}
      </div>
    </div>
    <div className='flex flex-col items-center gap-3'>
      <div className='bg-gray-900 bg-opacity-75 border-dashed border p-4 text-white text-xl'><span>{questionIndex + 1}</span>/{props.data.length}</div>
      <div className='inline-flex gap-2 bg-gray-900 bg-opacity-75 flex-col justify-center items-center p-4 border-dashed border'>
        <div><MdAccessTimeFilled className='fill-white text-7xl' /></div>
        <div className='text-4xl text-white'>{time}</div>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <div className='border-2 p-2 px-4 rounded-full bg-gray-900 bg-opacity-75 text-white'>Умножение <MdClear className='inline-flex' />
          <span>{boost}</span> + <span>10</span>
        </div>
        <div className='border-2 p-2 px-4 rounded-full bg-green-500 text-white'>Очки: <span>{score}</span></div>
      </div>
      <div className='flex justify-center items-center relative bg-gray-900 bg-opacity-75 border border-dashed w-32 h-24'>
        <div className='absolute right-2 top-2'>
          <div className='inline-flex items-center justify-center bg-yellow-400 rounded-full w-6 h-6'>{combo}</div>
        </div>
        <MdCheck className='fill-white text-7xl p-2' />
      </div>
      <div className='flex justify-center gap-4 items-center border py-4 px-10 bg-gray-900 bg-opacity-75'>
        <span className='text-yellow-400 text-4xl'>{props.data[questionIndex].word}</span>
        <span className='text-white'>это</span>
        <span className='text-yellow-400 text-4xl'>{props.data[questionIndex].options[0]}</span>
        <span className='text-white'>?</span>
      </div>
      <div className='flex text-white'>
        <button onClick={() => checkAnswer(0)} className='text-center bg-green-600 border rounded-l-full w-32 py-2 hover:bg-green-500'>
          <MdArrowLeft className='inline-flex text-xl' />верно
        </button>
        <button onClick={() => checkAnswer(1)} className='text-center bg-red-700 border rounded-r-full w-32 py-2 hover:bg-red-600'>
          неверно<MdArrowRight className='inline-flex text-xl' />
        </button>
      </div>
    </div>
  </>
}