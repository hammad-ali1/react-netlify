import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Types
type FormFieldType = {
  label: string;
  placeholder: string;
  id: string;
  value: string;
};

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  // data,
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: () => void;
  title: string;
  buttonText: string;
  formFields: FormFieldType[];
};

export default function Form({
  open,
  handleClose,
  onChange,
  handleFormSubmit,
  title,
  buttonText,
  formFields,
}: PropTypes) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form>
            {formFields.map((field, key) => {
              return (
                <TextField
                  key={key}
                  id={field.id}
                  value={field.value}
                  onChange={(event) => {
                    onChange(event);
                  }}
                  placeholder={field.placeholder}
                  label={field.label}
                  fullWidth
                  margin="dense"
                />
              );
            })}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleFormSubmit();
            }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
