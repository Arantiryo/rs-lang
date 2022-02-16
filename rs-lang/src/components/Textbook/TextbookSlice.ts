import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TextbookInfo } from "../../interfaces/textbook";

export const initialState: TextbookInfo = {
  group: 0,
  word: 0,
  page: 0,
};

export const loginSlice = createSlice({
  name: "textbookInfo",
  initialState,
  reducers: {
    updateTextbookInfo: (state, action: PayloadAction<TextbookInfo>) => {
      const { group, word, page } = action.payload;
      state.group = group;
      state.word = word;
      state.page = page;
    },
  },
});

export const { updateTextbookInfo } = loginSlice.actions;
export default loginSlice.reducer;
