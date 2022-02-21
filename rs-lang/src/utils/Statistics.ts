import { GameStat, OptionalStat, State } from "../interfaces/app";
import { updateUserStat } from "./WebClients";

export const defaultGameStat: GameStat = {
  longestStreak: 0,
  learnedWords: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
  correctAnswersPercent: 0,
};

export const defaultOptionalStats: OptionalStat = {
  totalRightAnswers: 0,
  totalWrongAnswers: 0,
  totalCorrectAnswersPercent: 0,
  date: new Date(),
  games: {
    spirit: defaultGameStat,
    audiocall: defaultGameStat,
    wordle: defaultGameStat,
  },
};

export const getEmptyGameStat = () => {
  const emptyGameStat: GameStat = {
    longestStreak: 0,
    learnedWords: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    correctAnswersPercent: 0,
  };
  return emptyGameStat;
};

export const datesAreOnSameDay = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

export const setDefaultStats = async (userId: State["userId"], token: State["token"]) => {
  try {
    const defaultStats = { learnedWords: 0, optional: defaultOptionalStats };
    const res = await updateUserStat(userId, token, defaultStats);
    return res;
  } catch (err) {
    console.log(err);
  }
};
