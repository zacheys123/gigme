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
const FollowersModal = ({ friend }) => {
  const { followers, setFollowers } = useStore();
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const handleClose = () => {
    setFollowers(false);
  };
  const [data, setData] = useState([]);
  const getAllUsers = async () => {
    const res = await fetch(`/api/user/getAllmyusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const mydata = await res.json();
    console.log(mydata);
    setData(mydata);
    return mydata;
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  let myfollowers = friend?.followers.map((fol) => fol);
  console.log(myfollowers);
  const filteredUsers = data.filter((user) => myfollowers?.includes(user._id));
  console.log(filteredUsers);
  return (
    <Dialog
      open={followers}
      onClose={handleClose}
      className="w-[100%] absolute bg-neutral-700"
    >
      {filteredUsers?.length > 0 ? (
        <DialogContent className="w-[350px] ">
          <h6 className="title">followers list</h6>
          {filteredUsers
            .map((follower) => (
              <ScrollArea key={follower._id}>
                <div
                  className="flex gap-3 items-center p-2"
                  onClick={() => {
                    router.push(`/friends/${follower?.username}`);
                    handleClose();
                  }}
                >
                  <AvatarComponent usercomm={follower} />
                  <div>
                    {follower?.clerkId === userId ? "Me" : follower?.username}
                  </div>
                </div>
                <ScrollBar orientation="vertical" /> <Separator />
              </ScrollArea>
            ))
            .reverse()}
        </DialogContent>
      ) : (
        <h6 className="text-[12px] choice p-5 ">No followers to display</h6>
      )}
    </Dialog>
  );
};

export default FollowersModal;
