import { AnswerType, QuestionType } from "../components/AudiocallGame/Question";
import { ACTION_TYPES } from "./actionTypes";

export interface State {
  userId: string;
  name: string;
  // email: string;
  token: string;
  refreshToken: string;
}

export interface action<T> {
  type: ACTION_TYPES;
  value: T;
}

export interface LatestResult {
  questions: QuestionType[];
  answers: AnswerType[];
  gameName: string;
}

export interface GameStat {
  longestStreak: number;
  learntWords: number;
  rightAnswers: number;
  wrongAnswers: number;
  correctAnswersPercent: number;
}
export interface OptionalStat {
  totalLearntWords: number;
  totalRightAnswers: number;
  totalWrongAnswers: number;
  totalCorrectAnswersPercent: number;
  date: Date;
  games: {
    spirit: GameStat;
    audiocall: GameStat;
    wordle: GameStat;
  };
}
