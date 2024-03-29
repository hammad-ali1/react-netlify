import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
//Contexts
import { UserContext, SocketContext } from "../context";

//Types
export type SnackButton = {
  type: string;
  text: string;
  roomId: "room-invite-accept" | "room-invite-reject";
  variant: "outlined" | "contained" | "text" | undefined;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
};
type PropTypes = {
  open: boolean;
  message: string;
  buttons?: SnackButton[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SimpleSnackbar({
  message,
  open,
  buttons,
  setOpen,
}: PropTypes) {
  const [socket] = useContext(SocketContext);
  const [user] = useContext(UserContext);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const evaluate = (buttonDetail: SnackButton) => {
    if (!socket || !user) return;
    const { type } = buttonDetail;
    if (type === "room-invite-accept") {
      navigate("/guess-thief", { replace: true });
      setTimeout(() => {
        socket.emit("join-room", { roomId: buttonDetail.roomId });
      }, 1000);
    }
    if (type === "room-invite-reject") {
      console.log("reject logic here");
      socket.emit("room-invite-reject", {
        roomId: buttonDetail.roomId,
        msg: `${user.username} rejected the invite request`,
      });
    }
  };
  const action = (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        {buttons &&
          buttons.map((buttonDetail, key) => (
            <Button
              key={key}
              color="primary"
              variant={buttonDetail.variant ? buttonDetail.variant : "outlined"}
              onClick={(event) => {
                if (buttonDetail.type) {
                  evaluate(buttonDetail);
                }
                if (buttonDetail.handler) {
                  buttonDetail.handler(event);
                }
                console.log(buttonDetail);

                handleClose();
              }}
            >{`${buttonDetail.text}`}</Button>
          ))}
      </Stack>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={!buttons || buttons.length === 0 ? 3000 : 99999}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
