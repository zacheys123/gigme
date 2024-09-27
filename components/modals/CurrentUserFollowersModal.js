import useStore from "@/app/zustand/useStore";

import { getAllUsers } from "@/app/server-actions/getAllUsers";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import AvatarComponent from "../Avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
const CurrentFollowerModal = () => {
  const { currentfollowers, setCurrentFollowers } = useStore();
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const handleClose = () => {
    setCurrentFollowers(false);
  };
  const [data, setData] = useState([]);
  const getAllUsers = async () => {
    const res = await fetch(`/api/user/getAllusers/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { currentuser } = await res.json();
    console.log(currentuser);
    setData(currentuser);
    return currentuser;
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(data);
  let myfollowers = user?.user?.followers.map((fol) => fol);
  console.log(myfollowers);
  const filteredUsers = data.filter((user) => myfollowers?.includes(user._id));

  return (
    <Dialog
      open={currentfollowers}
      onClose={handleClose}
      className="w-[100%] absolute bg-neutral-700"
    >
      {filteredUsers?.length > 0 ? (
        <DialogContent className="w-[350px] ">
          <h6 className="title">followers list</h6>
          {filteredUsers.map((follower) => (
            <ScrollArea key={follower._id}>
              <div
                className="flex gap-3 items-center p-2"
                onClick={() => {
                  router.push(`/friends/${follower.username}`);
                  setTimeout(() => {
                    handleClose();
                  }, 2000);
                }}
              >
                <AvatarComponent usercomm={follower} />
                <div>{follower.username}</div>
              </div>
              <ScrollBar orientation="vertical" /> <Separator />
            </ScrollArea>
          ))}
        </DialogContent>
      ) : (
        <h6 className="text-[12px] choice p-5 ">No followers to display</h6>
      )}
    </Dialog>
  );
};

export default CurrentFollowerModal;
