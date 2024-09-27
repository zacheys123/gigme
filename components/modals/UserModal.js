"use client";
import * as React from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Logout } from "@mui/icons-material";
import { Box, CircularProgress, Divider } from "@mui/material";

import { handleLogout } from "@/utils";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import useStore from "@/app/zustand/useStore";
const UserModal = ({}) => {
  const { setLogout, logout, setisLoggedOut, isLoggedOut } = useStore();

  const router = useRouter();
  const [deleteacc, setDelete] = React.useState();
  const [confirmusername, setConfirmUsername] = React.useState();
  const handleClose = () => {
    setLogout(false);
  };
  const handleDelete = () => {
    setDelete(true);
    if (deleteacc) {
    }
  };

  return (
    <Dialog
      open={logout}
      onClose={handleClose}
      className=" absolute bg-neutral-700"
    >
      <DialogTitle>Account Settings</DialogTitle>

      <DialogContent className="flex flex-col  gap-9">
        {/* theme */}
        <form>
          <Box className="flex flex-col gap-2">
            <input
              required
              id="name"
              name="username"
              placeholder="Change your Username..."
              type="text"
              className="bg-gray-300 p-2 text-[11px] rounded-sm text-gray-700 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer"
            />

            <select
              id="theme"
              className="bg-gray-300 p-2 text-[11px] rounded-sm text-gray-700   mt-3 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer"
            >
              {" "}
              <option>Choose theme</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </Box>
          <div className="m-4 " onClick={handleClose}>
            {" "}
            <Button
              onClick={handleClose}
              className="h-[25px] text-[9px] gigtitle mx-2"
              variant="default"
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="h-[25px] text-[9px] gigtitle mx-2"
              variant="primary"
              type="submit"
            >
              Save changes
            </Button>
          </div>
        </form>
        <div
          className="flex items-center gap-9  lg:text-[15px] -mb-[10px]   bg-gray-300 p-1 text-[11px] rounded-sm text-gray-700 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer 
          "
          onClick={() => handleLogout(router, isLoggedOut, setisLoggedOut)}
        >
          <Logout sx={{ fontSize: "15px" }} />{" "}
          <h6
            className="bg-gray-300 p-2 text-[11px] rounded-sm text-gray-700 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer
          "
          >
            {!isLoggedOut ? (
              "   Sign Out"
            ) : (
              <CircularProgress size="11px" sx={{ color: "red" }} />
            )}
          </h6>
        </div>

        <Separator />

        <form className="">
          {!deleteacc && (
            <Button
              className=" w-full "
              variant="destructive"
              onClick={handleDelete}
              type="button"
            >
              Delete Account
            </Button>
          )}
          {deleteacc && (
            <>
              {" "}
              <h6 className="title tracking-wider">
                You have to enter a valid username so as to delete your account.
              </h6>
              <input
                value={confirmusername}
                onChange={(ev) => setConfirmUsername(ev.target.value)}
                autoFocus
                required
                id="name"
                name="username"
                placeholder="Confirm your Username to delete account..."
                type="text"
                className="bg-gray-300 p-2 text-[11px] mt-8 w-full  rounded-sm text-gray-700 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer"
              />
              <Button
                className=" w-[70%] mt-5 gigtitle"
                variant="primary"
                onClick={handleDelete}
                fullWidth
                type="button"
              >
                Confirm Account Deletion
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
