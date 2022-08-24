import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
//Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectIsOpen,
  setIsOpen,
  selectDialogContent,
  selectDialogTitle,
  selectDialogActions,
} from "./dialogSlice";

import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Form() {
  const isOpen = useAppSelector((state) => selectIsOpen(state));
  const dialogContent = useAppSelector((state) => selectDialogContent(state));
  const dialogTitle = useAppSelector((state) => selectDialogTitle(state));
  const dialogActions = useAppSelector((state) => selectDialogActions(state));
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") dispatch(setIsOpen(false));
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  );
}
