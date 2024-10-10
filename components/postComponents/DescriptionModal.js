import { PropTypes } from "prop-types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const DescriptionModal = ({ objectdep, open, handleClose }) => {
  // const { userId } = useAuth();
  // const router = useRouter();
  console.log(objectdep);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="h-[700px]  w-[100px] mx-auto p-1 bg-gray-500"
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        {" "}
        <DialogHeader>
          <DialogTitle>More Info</DialogTitle>
        </DialogHeader>
        <div className="flex">
          {" "}
          <span className="title text-red-700 font-mono font-bold   ">
            {objectdep?.title}
          </span>
          &nbsp;
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionModal;
DescriptionModal.propTypes = {
  objectdep: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
