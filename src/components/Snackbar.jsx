import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SocketContext } from "../contexts/socket.context";
import { useNavigate } from "react-router-dom";

export default function SimpleSnackbar({
  message,
  open,
  setOpen,
  buttons,
  user,
}) {
  const { socket } = React.useContext(SocketContext);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const evaluate = (buttonDetail) => {
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
              onClick={() => {
                if (buttonDetail.type) {
                  evaluate(buttonDetail);
                }
                if (buttonDetail.handler) {
                  buttonDetail.handler();
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
