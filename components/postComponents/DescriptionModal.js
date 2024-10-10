import { PropTypes } from "prop-types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

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
      {objectdep === "post" && (
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
      )}
      {objectdep === "user" && (
        <DialogContent className="object-cover w-[500px] h-[500px] rounded-full">
          {" "}
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div className="flex">
            {" "}
            {objectdep?.user?.picture && (
              <Image
                priority
                src={objectdep?.user?.picture}
                className="object-cover w-[500px] h-[500px] rounded-full"
                alt={objectdep.user?.firstname.split("")[0]}
                width={200}
                height={200}
                onClick={() => handleModal(user)}
              />
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DescriptionModal;
DescriptionModal.propTypes = {
  objectdep: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
