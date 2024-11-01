"use client";
import useStore from "@/app/zustand/useStore";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import AvatarComponent from "../Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useRouter } from "next/navigation";
import { getGigs } from "@/features/bookSlice";
import ButtonComponent from "../ButtonComponent";
import { Box, CircularProgress } from "@mui/material";
import { Eye, View } from "lucide-react";
import { debounce } from "@/utils/debounce";
import useSocket from "@/hooks/useSocket";
import LoadingSpinner from "../LoadingSpinner";
import { useNotification } from "@/app/Context/notificationContext";
import MyNotifications from "../MyNotifications";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import ioClient from "socket.io-client"; // Import Socket.io client
import { motion } from "framer-motion";
// import { sendPushNotification } from "@/lib/firebase/firebaseAdmin";

const socket = ioClient(process.env.NEXT_PUBLIC_PORT);
const GigsModal = ({}) => {
  const { userId } = useAuth();
  const { viewgig, setViewGig, searchedUser } = useStore();
  const [gigs, setGigs] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [loadingPostId, setLoadingPostId] = useState(null);
  const { user } = useCurrentUser(userId);

  const { notification } = useNotification();
  const myid = user?.user?._id;
  const [mess, setSenderMess] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [loadingdata, setLoadingdata] = useState();
  let createdGigsFunc = [];
  console.log(user);
  useEffect(() => {
    getGigs(userId, setGigs, createdGigsFunc, setLoading, "allgigs");
  }, []);

  const handleClose = () => {
    setViewGig(false);
  };

  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNotificationAndGigs = useCallback(
    (gig) => {
      if (!socket) {
        console.log("socket: ", socket);

        console.log("No socket");
        console.log(typeof setSenderMess);
      }
      if (!gig) {
        console.log("gig: ", gig);

        console.log("No gig");
      }
      if (!searchedUser) {
        console.log("searchedUser: ", searchedUser);

        console.log("No searchedUser");
      }
      if (!myid) {
        console.log("myid: ", myid);

        console.log("No myid");
      } else {
        console.log("first debug");
        const message = "A gig is available, are you on? Click gigup to view.";
        console.log(`Sending notification to ${searchedUser?.firstname}`);
        setSenderMess(
          `Sending notification to ${searchedUser?.firstname},for the gig titled: ${gig?.title}`
        );
        console.log(gig);
        socket.emit("sendNotification", {
          gigid: gig?._id,
          myid,
          recipient: searchedUser,
          recipientId: searchedUser._id,
          message,
        });
      }
    },
    [user, searchedUser]
  );
  const debouncedSendNotification = useCallback(() => {
    debounce(handleNotificationAndGigs, 100);
  }, [handleNotificationAndGigs]);

  return (
    <>
      {" "}
      {mess && notification.data._id !== myid && (
        <MyNotifications
          message={mess}
          senderId={notification.data._id}
          setSenderMess={setSenderMess}
          mess={mess}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: "-1500px" }}
        animate={{ opacity: 1, y: "500px" }}
        transition={{ duration: 0.8, delay: 1 }}
        className={
          !viewgig
            ? " inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70"
            : "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60"
        }
      >
        {loading ? (
          <CircularProgress size="20px" sx={{ color: "white" }} />
        ) : (
          <Dialog
            open={viewgig}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: "#e4edf1    ",
                maxHeight: "550px",
                width: "100%",
                maxWidth: "600px",
              },
            }}
          >
            <DialogContent>
              <h6 className="text-center underline text-neutral-400 flex justify-between items-center">
                <span className="title text-neutral-700">
                  {
                    gigs?.filter(
                      (gig) =>
                        gig?.postedBy?.clerkId.includes(userId) &&
                        gig?.isTaken === false
                    ).length
                  }{" "}
                  gigs
                </span>
                <span className="title text-neutral-700">
                  {" "}
                  Choose a gig to gift a friend
                </span>
              </h6>
              {/* Scrollable container for mapped data */}
              <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                {gigs
                  ?.filter(
                    (gig) =>
                      gig?.postedBy?.clerkId.includes(userId) &&
                      gig?.isTaken === false &&
                      gig?.isPending === false
                  )
                  ?.map((gig) => (
                    <Box
                      key={gig._id}
                      // onClick={(ev) => {
                      //   // After the operation, you can handle the logic for reading the post

                      //   setLoadingPostId(gig?._id);
                      //   setTimeout(() => {
                      //     setLoadingPostId(null);
                      //     debouncedSendNotification(gig);
                      //     setViewGig(false);
                      //   }, 2000);
                      // }}
                      className="flex flex-col  cursor-pointer hover:bg-gray-800 my-3 bg-slate-800 px-3 py-1 rounded-xl overflow-x-hidden max-w-[400px]"
                    >
                      <div className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-800">
                        <AvatarComponent
                          usercomm={gig?.postedBy}
                          posts="w-[33px] h-[33px] rounded-full object-fit"
                        />
                        <div className="flex-1 -ml-3">
                          <div className="text-gray-400 text-[12px] capitalize">
                            {gig.title}
                          </div>
                          <div
                            className={`text-gray-300 text-[11px] cursor-pointer break-words  ${
                              expandedDescription[gig._id]
                                ? "whitespace-normal "
                                : "truncate line-clamp-2"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent parent div click
                              toggleDescription(gig._id);
                            }}
                          >
                            {gig.description}
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div className="flex gap-1 items-center mx-2">
                          <span className="gigtitle text-neutral-300">
                            {gig?.viewCount?.length}
                          </span>
                          <Eye className="size-4 text-neutral-400" />
                        </div>
                        <ButtonComponent
                          //   disabled={user ? true : false}
                          variant={"destructive"}
                          classname=" h-[18px] text-[9px] my-1 font-bold max-w-[52px] "
                          onclick={(ev) => {
                            // After the operation, you can handle the logic for reading the post
                            ev.preventDefault();
                            ev.stopPropagation();
                            if (!user || !searchedUser) {
                              console.log("User data is not available yet.");
                              return;
                            }
                            setLoadingPostId(gig?._id);
                            setTimeout(() => {
                              setLoadingPostId(null);
                              handleNotificationAndGigs(gig);
                            }, 2000);
                          }}
                          title={
                            loadingPostId === gig?._id ? (
                              <CircularProgress
                                size="10px"
                                sx={{ color: "white", fontWeight: "bold" }}
                              />
                            ) : (
                              <span className="text-[11px]">😎Pick </span>
                            )
                          }
                        />
                      </div>
                    </Box>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </>
  );
};

export default GigsModal;
