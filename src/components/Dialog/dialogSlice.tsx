import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { ReactElement } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
export interface SearchState {
  isOpen: boolean;
  dialogContent: ReactElement<any, any>;
  dialogTitle: ReactElement<any, any>;
  dialogActions: ReactElement<any, any>;
}

const initialState: SearchState = {
  isOpen: false,
  dialogContent: <>Dialog Content</>,
  dialogTitle: <></>,
  dialogActions: <></>,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setDialogContent: (
      state,
      action: PayloadAction<ReactElement<any, any>>
    ) => {
      state.dialogContent = action.payload;
    },
    setDialogTitle: (state, action: PayloadAction<ReactElement<any, any>>) => {
      state.dialogTitle = action.payload;
    },
    setDialogActions: (
      state,
      action: PayloadAction<ReactElement<any, any>>
    ) => {
      state.dialogActions = action.payload;
    },
    openSignUpForm: (state) => {
      state.isOpen = false;
      state.dialogContent = <SignUpForm />;
      state.isOpen = true;
    },
    openLoginForm: (state) => {
      state.isOpen = false;
      state.dialogContent = <LoginForm />;
      state.isOpen = true;
    },
  },
});

export const {
  setIsOpen,
  setDialogContent,
  setDialogTitle,
  setDialogActions,
  openSignUpForm,
  openLoginForm,
} = dialogSlice.actions;

export const selectIsOpen = (state: RootState) => state.dialog.isOpen;
export const selectDialogContent = (state: RootState) =>
  state.dialog.dialogContent;
export const selectDialogTitle = (state: RootState) => state.dialog.dialogTitle;
export const selectDialogActions = (state: RootState) =>
  state.dialog.dialogActions;

export default dialogSlice.reducer;
