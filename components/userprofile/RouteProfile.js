"use client";
import useStore from "@/app/zustand/useStore";
import { useAuth } from "@clerk/nextjs";
import { Pencil, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropTypes } from "prop-types";
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Camera } from "@mui/icons-material";
import { BsCameraFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { fileupload } from "@/features/fileupload";
import DescriptionModal from "../postComponents/DescriptionModal";
import { motion } from "framer-motion";
const RouteProfile = ({ user }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isfile, setIsfile] = useState(false);
  const [imageUrl, setUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const {
    setShowFriendData,

    setShowPostedGigsData,

    setShowBookedGigsData,

    setShowAllGigsData,
  } = useStore();
  const { userId } = useAuth();
  const router = useRouter();
  // get the file/image when it changes

  const handleFileChange = useCallback((event) => {
    let dep = "image";
    // Check if the file is a video
    const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];
    fileupload(
      event,
      setUrl,
      toast,
      allowedTypes,
      fileUrl,
      setFileUrl,
      setIsUploading,
      dep
    );
  }, []);
  const handleUpload = async (ev) => {
    ev.preventDefault();
    if (!fileUrl) {
      toast.error("Please select an image  to upload.");
      return;
    }
    try {
      // update user picture in the database
      await fetch(`/api/user/updateImage/${user?.user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      });
      toast.success("image uploaded successfully!");
      setIsfile(false);
    } catch (error) {
      toast.error("Image upload unsuccessful: ");
      console.error("Error uploading image to database:", error.message);
      setIsfile(false);
    }
  };
  const [isTitle, setIsTitle] = useState(false);
  const [open, setOpen] = useState();
  const [currentPost, setCurrentPost] = useState({});
  const handleModal = (post) => {
    setOpen(true);
    setIsTitle(true);
    setCurrentPost(post);
  };

  const handleClose = () => {
    setIsTitle(false);
    console.log("close", isTitle);
  };
  return (
    <>
      {" "}
      {isTitle && (
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="absolute inset-0 h-full w-full bg-neutral-600 bg-cover bg-center opacity-50"></div>
          <div className="absolute z-10">
            <div className="absolute  bg-neutral-400 h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer">
              <span
                className="text-white font-bold text-[18px] "
                onClick={handleClose}
              >
                &times;
              </span>{" "}
            </div>
            <Image
              priority
              src={
                !fileUrl && !user?.user?.picture
                  ? ""
                  : fileUrl
                  ? fileUrl
                  : user?.user?.picture
              }
              className="object-cover w-[680px] h-[680px] rounded-xl"
              alt={user?.user?.firstname.split("")[0]}
              width={200}
              height={200}
              onClick={() => handleModal(user)}
            />
          </div>
        </motion.div>
      )}{" "}
      <div
        className="flex flex-col items-center gap-4 "
        onClick={() => {
          setShowFriendData(false);
          setShowPostedGigsData(false);
          setShowBookedGigsData(false);
          setShowAllGigsData(false);
        }}
      >
        <div className=" relative w-[200px] h-[200px]">
          {!fileUrl && isfile === false && (
            <>
              {" "}
              <label
                variant="closed"
                className="absolute bottom-[10px] right-[37px] text-white  p-1  text-[10px] lg:cursor-pointer bg-gray-900 rounded-full"
                htmlFor="imageId"
              >
                <BsCameraFill size="30px" sx={{ fontSize: "24px" }} />
              </label>{" "}
            </>
          )}

          <Image
            priority
            src={
              !fileUrl && !user?.user?.picture
                ? ""
                : fileUrl
                ? fileUrl
                : user?.user?.picture
            }
            className="object-cover w-[200px] h-[200px] rounded-full"
            alt={user?.user?.firstname.split("")[0]}
            width={200}
            height={200}
            onClick={() => handleModal(user)}
          />

          <form onSubmit={handleUpload}>
            <Input
              type="file"
              id="imageId"
              className="bg-transparent flex-1 border-none outline-none hidden "
              name="media"
              accept="image/jpeg,image/png,image/webp,image/gif,"
              onChange={handleFileChange}
            />
            {fileUrl && !isfile === true && (
              <Button
                type="submit"
                variant="destructive"
                className="absolute bottom-[10px] right-[37px] text-[11px] h-[20px]"
                disabled={isUploading}
              >
                Upload Image
                <Upload size="11px" className=" font-bold" />
              </Button>
            )}
          </form>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl text-white">
            {user?.user?.firstname} {user?.user?.lastname}
          </h3>
          <Pencil
            color="white"
            size="14px"
            onClick={() => router.push(`/v1/profile/${userId}/user`)}
          />
        </div>
        <p className="text-sm text-gray-400">{user?.user?.email}</p>
      </div>
    </>
  );
};

export default RouteProfile;

RouteProfile.propTypes = {
  user: PropTypes.object,
};
