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
import useStore from "@/app/zustand/useStore";
import { Button } from "./ui/button";
import { Logout } from "@mui/icons-material";
import { Box, CircularProgress, Divider } from "@mui/material";
import { Separator } from "./ui/separator";
import { handleLogout } from "@/utils";
import { useRouter } from "next/navigation";
const UserModal = ({}) => {
  let open;
  const { setLogout, logout, setisLoggedOut, isLoggedOut } = useStore();

  const handleClose = () => {
    setLogout(false);
  };
  const router = useRouter();

  return (
    <div className="w-[100vw] overflow-hidden relative">
      <Dialog
        open={logout}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        className="w-[390px] absolute bg-neutral-700"
      >
        <DialogTitle>Advanced Settings</DialogTitle>

        <DialogContent className="flex flex-col  gap-9">
          {/* theme */}
          <Box className="flex flex-col gap-2">
            <Label htmlFor="theme">Theme:</Label>
            <select
              id="theme"
              className="bg-gray-300 p-2 text-[11px] rounded-sm text-gray-700 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer"
            >
              {" "}
              <option>Choose theme</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </Box>

          <DialogContentText
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
          </DialogContentText>

          <Separator />
          <Button
            classNmae="h-[15px]"
            variant="destructive"
            onClick={handleClose}
          >
            Delete Account
          </Button>
          <input
            required
            id="name"
            name="username"
            placeholder="Confirm your Username..."
            type="text"
            className="bg-gray-300 p-2 text-[11px] rounded-sm text-gray-700 placeholder-yellow-800 border-zinc-400 focus-within:ring-0 outline-none md:cursor-pointer"
          />
        </DialogContent>
        <DialogActions onClick={handleClose}>
          <Button
            classNmae="h-[15px] text-[9px] title"
            variant="default"
            type="button"
          >
            back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserModal;
