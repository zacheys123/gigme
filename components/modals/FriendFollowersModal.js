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
  const { followers, setFollowers, refetch } = useStore();
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const [loading, setLoading] = useState();
  0;
  const handleClose = () => {
    setFollowers(false);
  };
  const [data, setData] = useState([]);
  const getAllUsers = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [refetch]);

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
      {!loading ? (
        <>
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
                        {follower?.clerkId === userId
                          ? "Me"
                          : follower?.username}
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
        </>
      ) : (
        <div className="maindiv bg-gradient-to-b  from-orange-800  rounded-full p-1 via-green-400  to-red-600">
          <LoadingSpinner />
        </div>
      )}
    </Dialog>
  );
};

export default FollowersModal;

import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="flex items-center h-[18px] justify-center  !bg-red-600  w-[22px] rounded-r-lg 
    rounded-ss-full
    rounded-se-xl
    animate-spinner
    main
    "
    >
      <div className="loader">
        <div className="!animate-spin rounded-full h-[17px] w-[22px] border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
};
