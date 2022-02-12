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
