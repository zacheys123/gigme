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

const GigsModal = ({}) => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const { viewgig, setViewGig, searchedUser } = useStore();
  const [gigs, setGigs] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [loadingdata, setLoadingdata] = useState();
  let createdGigsFunc;
  console.log(searchedUser?.firstname);
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

  const handleNotificationAndGigs = useCallback((gig) => {
    if (!socket || !gig?._id) return;
    setViewGig(false);
    const message = "A gig is available, are you on? Click gigup to view.";
    console.log(`Sending notification to ${searchedUser?.firstname}`);
    setSenderMess(
      `Sending notification to ${searchedUser?.firstname},for the gig titled ${gig?.title}`
    );
    socket.emit("sendNotification", {
      gigid: gig?._id,
      myid,
      recipient: user,
      recipientId: user._id,
      message,
    });
  }, []);
  const debouncedSendNotification = useCallback(() => {
    debounce(handleNotificationAndGigs, 100);
  }, [handleNotificationAndGigs]);
  console.log(gigs);
  return (
    <div
      className={
        !viewgig
          ? " inset-0 flex items-center justify-center bg-black bg-opacity-60"
          : "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60"
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
              backgroundColor: "#333",
              maxHeight: "550px",
              width: "100%",
              maxWidth: "600px",
            },
          }}
        >
          <DialogContent>
            <h6 className="text-center underline text-neutral-400 flex justify-between items-center">
              <span className="title text-neutral-400">
                {
                  gigs?.filter(
                    (gig) =>
                      gig?.postedBy?.clerkId.includes(userId) &&
                      gig?.isTaken === false
                  ).length
                }{" "}
                gigs
              </span>
              <span className="title text-neutral-400">
                {" "}
                Choose A gig to post
              </span>
            </h6>
            {/* Scrollable container for mapped data */}
            <div className="max-h-[400px] overflow-y-auto">
              {gigs
                ?.filter(
                  (gig) =>
                    gig?.postedBy?.clerkId.includes(userId) &&
                    gig?.isTaken === false
                )
                ?.map((gig) => (
                  <Box
                    key={gig._id}
                    onClick={() => router.push(`/gig/${gig._id}`)}
                    className="flex flex-col  cursor-pointer hover:bg-gray-800 my-3 bg-neutral-600 px-3 py-1 rounded-xl"
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
                          className={`text-gray-300 text-[11px] cursor-pointer break-words ${
                            expandedDescription[gig._id]
                              ? "whitespace-normal"
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
                        <span className="title text-neutral-300">
                          {gig?.viewCount?.length}
                        </span>
                        <Eye className="size-5 text-neutral-400" />
                      </div>
                      <ButtonComponent
                        //   disabled={user ? true : false}
                        variant={"destructive"}
                        classname=" h-[20px] text-[10px] my-1 font-bold max-w-[55px] "
                        onclick={() => {
                          // After the operation, you can handle the logic for reading the post
                          setLoadingdata(true);
                          setTimeout(() => {
                            setLoadingdata(false);
                            debouncedSendNotification(gig);
                          }, 2000);
                        }}
                        title={
                          loadingdata ? (
                            <LoadingSpinner />
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
    </div>
  );
};

export default GigsModal;
