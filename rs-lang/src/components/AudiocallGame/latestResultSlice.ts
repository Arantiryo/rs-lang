import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatestResult } from "../../interfaces/app";

export const initialState: LatestResult = {
  questions: [],
  answers: [],
};

export const latestResultSlice = createSlice({
  name: "latestResult",
  initialState,
  reducers: {
    updateResult: (state, action: PayloadAction<LatestResult>) => {
      const { questions, answers } = action.payload;
      state.questions = questions;
      state.answers = answers;
    },
  },
});

export const { updateResult } = latestResultSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

export default latestResultSlice.reducer;
