import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface SearchState {
  isOpen: boolean;
}

const initialState: SearchState = {
  isOpen: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = dialogSlice.actions;

export const selectIsOpen = (state: RootState) => state.dialog.isOpen;

export default dialogSlice.reducer;
