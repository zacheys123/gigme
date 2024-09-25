"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, TextField } from "@mui/material";
import { Textarea } from "flowbite-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function Preview({
  open,
  setOpen,
  myInputs,
  loading,
  setLoading,
  user,
  setInputs,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const toduration = `${myInputs?.to}${myInputs?.durationto} `;
  const fromduration = `${myInputs?.from}${myInputs?.durationfrom} `;

  let dataInfo = React.useMemo(() => {
    return {
      title: myInputs?.title,
      description: myInputs?.description,
      phoneNo: myInputs?.phoneNo,
      price: myInputs?.price,
      category: myInputs?.category,
      location: myInputs?.location,
      date: myInputs?.date,
      to: toduration,
      from: fromduration,
      postedBy: user?.user?._id,
    };
  }, [
    fromduration,
    myInputs?.category,
    myInputs?.date,
    myInputs?.description,
    myInputs?.location,
    myInputs?.phoneNo,
    myInputs?.price,
    myInputs?.title,
    toduration,
    user?.user?._id,
  ]);
  const onSubmit = (event) => {
    event.preventDefault();
    // handleCreateGig(dataInfo, handleClose,setLoading);
    setInputs({
      title: "",
      description: "",
      phoneNo: "",
      price: "",
      category: "Piano",
      location: "",
      date: "",
      to: "",
      from: "",
      durationfrom: "am",
      durationto: "pm",
    });
    console.log(dataInfo);
  };

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
        <DialogTitle className="flex gap-3 justify-between">
          <ArrowLeft onClick={handleClose} size="17px" />
          <h6 className="text-[13px]">Preview before Submitting</h6>
        </DialogTitle>
        <DialogContent>
          <div className="w-full  gap-4">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              type="text"
              className="mb-2 w-full"
              variant="standard"
              value={myInputs?.title}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              type="text"
              className="mb-2 w-full"
              variant="standard"
              value={myInputs?.phoneNo}
            />
            <Textarea
              name="description"
              value={myInputs?.description}
              style={{ resize: "none", height: "fit-content" }}
              className="min-h-[110px] p-2 mb-2"
              placeholder=" Enter description e.g what songs or the vybe expected in the event/show"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              type="text"
              className="mb-2 w-full"
              variant="standard"
              value={myInputs?.price}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              type="text"
              className="mb-2 w-full"
              variant="standard"
              value={myInputs?.location}
            />

            <select
              name="category"
              value={myInputs?.category}
              className="mb-2 w-full  h-[40px] rounded-md p-3 text-[15px]  font-mono"
            >
              <option value="piano">Piano</option>
              <option value="guitar">Guitar</option>
              <option value="bass">Bass Guitar</option>
              <option value="saxophone">Saxophone</option>
              <option value="violin">Violin</option>
              <option value="ukulele">Ukulele</option>{" "}
              <option value="harp">Harp</option>
              <option value="xylophone">Xylophone</option>{" "}
              <option value="cello">Cello</option>
              <option value="percussion">Percussion</option>{" "}
            </select>
            <div className="flex items-center flex-col gap-2 mt-5">
              <div className="flex items-center gap-3">
                {" "}
                <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">
                  from:
                </h6>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  type="text"
                  className="mb-2 w-full"
                  variant="standard"
                  value={myInputs?.from}
                />
                <select
                  name="durationfrom"
                  value={myInputs?.durationfrom}
                  className="mb-2 w-[50px] bg-neutral-300 h-[40px] rounded-full text-[12px] flex justify-center items-center p-2 font-mono"
                >
                  <option value="pm">PM</option>
                  <option value="am">AM</option>
                </select>{" "}
              </div>
              <div className="flex items-center gap-3">
                <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">to:</h6>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  type="text"
                  className="mb-2 w-full"
                  variant="standard"
                  value={myInputs?.to}
                />
                <select
                  value={myInputs?.durationto}
                  className="mb-2 w-[50px] bg-neutral-300 h-[40px] rounded-full text-[12px] flex justify-center items-center p-2 font-mono"
                >
                  <option value="pm">PM</option>
                  <option value="am">AM</option>
                </select>{" "}
              </div>
              {/* date here */}
              <input type="date" />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="primary" type="submit">
            Create Gig
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
