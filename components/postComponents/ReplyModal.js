import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextInput } from "flowbite-react";

export default function ReplyModal({
  open,
  handleClose,
  onSubmit,
  text,
  setText,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: onSubmit,
        }}
      >
        <DialogContent>
          <TextInput
            autoFocus
            margin="dense"
            placeholder="Reply to this comment..."
            type="text"
            variant="standard"
            className="text-[12px] w-full"
            value={text}
            onChange={(ev) => setText(ev.target.value)}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
