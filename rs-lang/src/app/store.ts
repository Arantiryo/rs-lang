import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../components/LoginForm/loginSlice";

export const store = configureStore({
  reducer: {
    userLoginInfo: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
